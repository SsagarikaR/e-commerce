import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import { deleteUserByID, selectAllUsers, selectUserByID, updateUsersPassword } from "../services/db/users";

// Delete a user by their ID
export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.body.user.identifire;  // Extract the user ID from the request body
  try {
    // Check if the ID is provided
    if (!id) {
      return next({ statusCode: 400, message: "User ID not found" });
    }

    // Check if the user exists in the database
    const isUserExist = await selectUserByID(id);
    if (isUserExist.length === 0) {
      return next({ statusCode: 404, message: "User not found" });
    }

    // Proceed with deleting the user
    const deleteUser = await deleteUserByID(id);
    console.log("Deleted user:", deleteUser);
    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.log(error);
    return next({ statusCode: 500, message: "An error occurred while deleting the user" });
  }
};




// Update the user's password
export const updateUserPassword = async (req: Request, res: Response, next: NextFunction) => {
  const { newPassword, oldPassword } = req.body;
  const id = req.body.user.identifire;  // Extract user ID from the request body

  try {
    // Check if the user exists
    const isUserExist = await selectUserByID(id);
    if (isUserExist.length === 0) {
      return next({ statusCode: 404, message: "User not found" });
    }

    // Verify the old password
    if (isUserExist[0].password) {
      const isPasswordValid = await bcrypt.compare(oldPassword, isUserExist[0].password);
      if (!isPasswordValid) {
        return next({ statusCode: 403, message: "Invalid old password" });
      }
    }

    // Hash the new password and update it
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const updateUser = await updateUsersPassword(hashedPassword);
    console.log(updateUser);
    return res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.log(error);
    return next({ statusCode: 500, message: "An error occurred while updating the password" });
  }
};




// Retrieve all users
export const getAllUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Fetch all users from the database
    const users = await selectAllUsers();
    if (users.length === 0) {
      return next({ statusCode: 404, message: "No users found" });
    }
    return res.status(200).json(users);
  } catch (error) {
    console.log(error);
    return next({ statusCode: 500, message: "An error occurred while fetching users" });
  }
};




// Get a user by their ID
export const getUserByID = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.body.user.identifire;  // Extract user ID from the request body
  try {
    // Check if the user exists
    const users = await selectUserByID(id);
    if (users.length === 0) {
      return next({ statusCode: 404, message: "Invalid user ID" });
    }

    // Remove the password from the response before returning
    delete users[0].password;
    return res.status(200).json(users[0]);
  } catch (error) {
    console.log(error);
    return next({ statusCode: 500, message: "An error occurred while fetching the user" });
  }
};
