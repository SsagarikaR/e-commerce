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
exports.updateAdmin = exports.deleteAdmin = exports.adminLogin = exports.createAdmin = void 0;
const admins_1 = require("../services/db/admins");
// Create new admin
const createAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { userID } = req.body;
    try {
        if (!userID) {
            return next({ statusCode: 409, message: "Please enter user's ID to add the user as admin" });
        }
        const { success, message } = yield (0, admins_1.createAdminService)(userID);
        if (!success) {
            return next({ statusCode: 403, message });
        }
        return res.status(201).json({ message });
    }
    catch (error) {
        console.error("Error creating admin:", error);
        return next({ statusCode: 500, message: "An error occurred while creating admin" });
    }
});
exports.createAdmin = createAdmin;
// Admin login (find admin by ID)
const adminLogin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const adminID = req.body.user.identifire;
    try {
        const admin = yield (0, admins_1.selectAdminService)(adminID);
        if (admin.length === 0) {
            return next({ statusCode: 409, message: "You are not registered as an admin" });
        }
        return res.status(200).json(admin);
    }
    catch (error) {
        console.error("Error logging in admin:", error);
        return next({ statusCode: 500, message: "An error occurred while finding admin" });
    }
});
exports.adminLogin = adminLogin;
// Delete admin by userID
const deleteAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { userID } = req.body;
    try {
        const { success, message } = yield (0, admins_1.deleteAdminService)(userID);
        if (!success) {
            return next({ statusCode: 404, message });
        }
        return res.status(200).json({ message });
    }
    catch (error) {
        console.error("Error deleting admin:", error);
        return next({ statusCode: 500, message: "An error occurred while deleting admin" });
    }
});
exports.deleteAdmin = deleteAdmin;
// Update admin by userID
const updateAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { userID, newUserID } = req.body;
    try {
        const { success, message } = yield (0, admins_1.updateAdminService)(userID, newUserID);
        if (!success) {
            return next({ statusCode: 409, message });
        }
        return res.status(200).json({ message });
    }
    catch (error) {
        console.error("Error updating admin:", error);
        return next({ statusCode: 500, message: "An error occurred while updating admin" });
    }
});
exports.updateAdmin = updateAdmin;
