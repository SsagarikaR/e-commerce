import { Request, Response, NextFunction } from "express";
import { selectAdmin, createNewAdmin,deleteAdminByID,updateAdminByID } from "../services/db/admins";


// The function for creating a new admin 
export const createAdmin = async (req: Request, res: Response, next: NextFunction) => {
    const { userID } = req.body;

    try {
        if (!userID) {
            return next({ statusCode: 409, message: "Please enter users ID to add the user as admin" });
        }

        const isExist = await selectAdmin(userID);
        if (isExist.length > 0) {
            return next({statusCode:403, message: "This Admin is already registered." });
        }

        const [result, metaData] = await createNewAdmin(userID);
        if (metaData !== 0) {

            return res.status(201).json({ message: "Admin created successfully" });
        } 
        else {
            return next({statusCode:409, message: "Please try again after some time!" });
        }
    } catch (error) {
        console.error("Error creating admin:", error);
        return next({ statusCode: 500, message: "An error occurred while creating admin" });
    }
};





 
// The function for admin login
export const adminLogin = async (req: Request, res: Response, next: NextFunction) => {
    const adminID = req.body.user.identifire; 

    try {
        const findAdmin = await selectAdmin(adminID);
        if (findAdmin.length === 0) {
            return next({statusCode:409, message: "You are not registered as an admin" });
        } 
        else {
            return res.status(200).json(findAdmin);
        }
    } catch (error) {
        console.error("Error logging in admin:", error);
        return next({ statusCode: 500, message: "An error occurred while finding admin" });
    }
};




//The function for admin delete by users id
export const deleteAdmin = async (req: Request, res: Response, next: NextFunction) => {
    const { userID } = req.body;

    try {
        const admin = await selectAdmin(userID);
        if (admin.length === 0) {
            return next({ statusCode: 404, message: "Admin not found" });
        }

        const result = await deleteAdminByID(userID);
        return res.status(200).json({ message: "Admin deleted successfully" });
    } catch (error) {
        console.error("Error deleting admin:", error);
        return next({ statusCode: 500, message: "An error occurred while deleting admin" });
    }
};


//function for update admin 
export const updateAdmin = async (req: Request, res: Response, next: NextFunction) => {
    const { userID, newUserID } = req.body;

    try {
        const admin = await selectAdmin(userID);
        if (admin.length === 0) {
            return next({ statusCode: 404, message: "Admin not found" });
        }

        const result = await updateAdminByID(userID, newUserID);
        if (result[0] === 0) {
            return next({ statusCode: 409, message: "Failed to update admin" });
        }

        return res.status(200).json({ message: "Admin updated successfully" });
    } catch (error) {
        console.error("Error updating admin:", error);
        return next({ statusCode: 500, message: "An error occurred while updating admin" });
    }
};

