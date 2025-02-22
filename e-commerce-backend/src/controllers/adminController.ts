import { Request, Response, NextFunction } from "express";
import { createAdminService, selectAdminService, deleteAdminService, updateAdminService } from "../services/db/admins";

// Create new admin
export const createAdmin = async (req: Request, res: Response, next: NextFunction) => {
  const { userID } = req.body;

  try {
    if (!userID) {
      return next({ statusCode: 409, message: "Please enter user's ID to add the user as admin" });
    }

    const { success, message } = await createAdminService(userID);
    if (!success) {
      return next({ statusCode: 403, message });
    }

    return res.status(201).json({ message });
  } catch (error) {
    console.error("Error creating admin:", error);
    return next({ statusCode: 500, message: "An error occurred while creating admin" });
  }
};

// Admin login (find admin by ID)
export const adminLogin = async (req: Request, res: Response, next: NextFunction) => {
  const adminID = req.body.user.identifire;

  try {
    const admin = await selectAdminService(adminID);
    if (admin.length === 0) {
      return next({ statusCode: 409, message: "You are not registered as an admin" });
    }

    return res.status(200).json(admin);
  } catch (error) {
    console.error("Error logging in admin:", error);
    return next({ statusCode: 500, message: "An error occurred while finding admin" });
  }
};

// Delete admin by userID
export const deleteAdmin = async (req: Request, res: Response, next: NextFunction) => {
  const { userID } = req.body;

  try {
    const { success, message } = await deleteAdminService(userID);
    if (!success) {
      return next({ statusCode: 404, message });
    }

    return res.status(200).json({ message });
  } catch (error) {
    console.error("Error deleting admin:", error);
    return next({ statusCode: 500, message: "An error occurred while deleting admin" });
  }
};

// Update admin by userID
export const updateAdmin = async (req: Request, res: Response, next: NextFunction) => {
  const { userID, newUserID } = req.body;

  try {
    const { success, message } = await updateAdminService(userID, newUserID);
    if (!success) {
      return next({ statusCode: 409, message });
    }

    return res.status(200).json({ message });
  } catch (error) {
    console.error("Error updating admin:", error);
    return next({ statusCode: 500, message: "An error occurred while updating admin" });
  }
};
