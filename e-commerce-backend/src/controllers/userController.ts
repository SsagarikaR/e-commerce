import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import { deleteUserByID, selectAllUsers, selectUserByID, updateUsersPassword } from "../services/db/users";

// Delete a user by their ID
export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.body.user.identifire; 
  try {
    if (!id) {
      return next({ statusCode: 400, message: "User ID not found" });
    }

    const isUserExist = await selectUserByID(id);
    if (isUserExist.length === 0) {
      return next({ statusCode: 404, message: "User not found" });
    }

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
  const id = req.body.user.identifire; 

  try {
    const isUserExist = await selectUserByID(id);
    if (isUserExist.length === 0) {
      return next({ statusCode: 404, message: "User not found" });
    }

    if (isUserExist[0].password) {
      const isPasswordValid = await bcrypt.compare(oldPassword, isUserExist[0].password);
      if (!isPasswordValid) {
        return next({ statusCode: 403, message: "Invalid old password" });
      }
    }

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
  const id = req.body.user.identifire; 
  try {
    const users = await selectUserByID(id);
    if (users.length === 0) {
      return next({ statusCode: 404, message: "Invalid user ID" });
    }

    delete users[0].password;
    return res.status(200).json(users[0]);
  } catch (error) {
    console.log(error);
    return next({ statusCode: 500, message: "An error occurred while fetching the user" });
  }
};
