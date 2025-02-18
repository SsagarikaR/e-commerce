"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminLogin = exports.createAdmin = void 0;
const admins_1 = require("../services/db/admins");
/**
 * The function for creating a new admin
 * */
const createAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { userID } = req.body;
    try {
        // Check if the userID is provided
        if (!userID) {
            return next({ statusCode: 409, message: "Please enter users ID to add the user as admin" });
        }
        // Check if the admin with this userID already exists
        const isExist = yield (0, admins_1.selectAdmin)(userID);
        if (isExist.length > 0) {
            return next({ statusCode: 403, message: "This Admin is already registered." });
        }
        // Create a new admin
        const [result, metaData] = yield (0, admins_1.createNewAdmin)(userID);
        if (metaData !== 0) {
            // If the admin is created successfully, send a success response
            return res.status(201).json({ message: "Admin created successfully" });
        }
        else {
            // If there is an issue creating the admin, send an error response
            return next({ statusCode: 409, message: "Please try again after some time!" });
        }
    }
    catch (error) {
        console.error("Error creating admin:", error);
        return next({ statusCode: 500, message: "An error occurred while creating admin" });
    }
});
exports.createAdmin = createAdmin;
/**
 * The function for admin login
 * */
const adminLogin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const adminID = req.body.user.identifire; // Extracting admin ID from the request body
    try {
        // Check if the admin exists with the provided ID
        const findAdmin = yield (0, admins_1.selectAdmin)(adminID);
        if (findAdmin.length === 0) {
            // If the admin is not found, send an error response
            return next({ statusCode: 409, message: "You are not registered as an admin" });
        }
        else {
            // If the admin is found, send their details back with a success status
            return res.status(200).json(findAdmin);
        }
    }
    catch (error) {
        console.error("Error logging in admin:", error);
        return next({ statusCode: 500, message: "An error occurred while finding admin" });
    }
});
exports.adminLogin = adminLogin;
