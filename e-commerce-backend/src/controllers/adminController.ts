import { Request, Response, NextFunction } from "express";
import { selectAdmin, createNewAdmin } from "../services/db/admins";

/**
 * The function for creating a new admin
 * */
export const createAdmin = async (req: Request, res: Response, next: NextFunction) => {
    const { userID } = req.body;

    try {
        // Check if the userID is provided
        if (!userID) {
            return next({ statusCode: 409, message: "Please enter users ID to add the user as admin" });
        }

        // Check if the admin with this userID already exists
        const isExist = await selectAdmin(userID);
        if (isExist.length > 0) {
            return next({statusCode:403, message: "This Admin is already registered." });
        }

        // Create a new admin
        const [result, metaData] = await createNewAdmin(userID);
        if (metaData !== 0) {
            // If the admin is created successfully, send a success response
            return res.status(201).json({ message: "Admin created successfully" });
        } else {
            // If there is an issue creating the admin, send an error response
            return next({statusCode:409, message: "Please try again after some time!" });
        }
    } catch (error) {
        console.error("Error creating admin:", error);
        return next({ statusCode: 500, message: "An error occurred while creating admin" });
    }
};





/** 
 * The function for admin login
 * */
export const adminLogin = async (req: Request, res: Response, next: NextFunction) => {
    const adminID = req.body.user.identifire; // Extracting admin ID from the request body

    try {
        // Check if the admin exists with the provided ID
        const findAdmin = await selectAdmin(adminID);
        if (findAdmin.length === 0) {
            // If the admin is not found, send an error response
            return next({statusCode:409, message: "You are not registered as an admin" });
        } else {
            // If the admin is found, send their details back with a success status
            return res.status(200).json(findAdmin);
        }
    } catch (error) {
        console.error("Error logging in admin:", error);
        return next({ statusCode: 500, message: "An error occurred while finding admin" });
    }
};
