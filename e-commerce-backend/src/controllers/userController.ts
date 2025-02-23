import { Request, Response, NextFunction } from "express";
import { deleteUserService,updatePasswordService ,getAllUsersService,getUserByIDService} from "../services/db/users";

// Controller to delete a user by ID
export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  const userID = req.body.user.identifire;

  try {
      const result = await deleteUserService(userID);

      if (!result.success) {
          return next({ statusCode: 404, message: result.message });
      }

      return res.status(200).json({ message: result.message });
  } catch (error) {
      console.error(error);
      return next({ statusCode: 500, message: "Error deleting user" });
  }
};




// Controller to update a user's password
export const updateUserPassword = async (req: Request, res: Response, next: NextFunction) => {
  const { oldPassword, newPassword } = req.body;
  const userID = req.body.user.identifire;

  try {
      const result = await updatePasswordService(userID, oldPassword, newPassword);

      if (!result.success) {
          return next({ statusCode: 403, message: result.message });
      }

      return res.status(200).json({ message: result.message });
  } catch (error) {
      console.error(error);
      return next({ statusCode: 500, message: "Error updating password" });
  }
};




// Controller to retrieve all users
export const getAllUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await getAllUsersService();

    if (!result.success) {
      return next({ statusCode: 404, message: result.message });
    }

    return res.status(200).json(result.users);
  } catch (error) {
    console.log(error);
    return next({ statusCode: 500, message: "An error occurred while fetching users" });
  }
};




// Controller to retrieve a user by their ID
export const getUserByID = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.body.user.identifire;

  try {
    const result = await getUserByIDService(id);

    if (!result.success) {
      return next({ statusCode: 404, message: result.message });
    }

    return res.status(200).json(result.user);
  } catch (error) {
    console.log(error);
    return next({ statusCode: 500, message: "An error occurred while fetching the user" });
  }
};