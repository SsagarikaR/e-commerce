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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserByID = exports.getAllUser = exports.updateUserPassword = exports.deleteUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const users_1 = require("../services/db/users");
// Delete a user by their ID
const deleteUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.body.user.identifire;
    try {
        if (!id) {
            return next({ statusCode: 400, message: "User ID not found" });
        }
        const isUserExist = yield (0, users_1.selectUserByID)(id);
        if (isUserExist.length === 0) {
            return next({ statusCode: 404, message: "User not found" });
        }
        const deleteUser = yield (0, users_1.deleteUserByID)(id);
        console.log("Deleted user:", deleteUser);
        return res.status(200).json({ message: "User deleted successfully" });
    }
    catch (error) {
        console.log(error);
        return next({ statusCode: 500, message: "An error occurred while deleting the user" });
    }
});
exports.deleteUser = deleteUser;
// Update the user's password
const updateUserPassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { newPassword, oldPassword } = req.body;
    const id = req.body.user.identifire;
    try {
        const isUserExist = yield (0, users_1.selectUserByID)(id);
        if (isUserExist.length === 0) {
            return next({ statusCode: 404, message: "User not found" });
        }
        if (isUserExist[0].password) {
            const isPasswordValid = yield bcrypt_1.default.compare(oldPassword, isUserExist[0].password);
            if (!isPasswordValid) {
                return next({ statusCode: 403, message: "Invalid old password" });
            }
        }
        const hashedPassword = yield bcrypt_1.default.hash(newPassword, 10);
        const updateUser = yield (0, users_1.updateUsersPassword)(hashedPassword);
        console.log(updateUser);
        return res.status(200).json({ message: "Password updated successfully" });
    }
    catch (error) {
        console.log(error);
        return next({ statusCode: 500, message: "An error occurred while updating the password" });
    }
});
exports.updateUserPassword = updateUserPassword;
// Retrieve all users
const getAllUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield (0, users_1.selectAllUsers)();
        if (users.length === 0) {
            return next({ statusCode: 404, message: "No users found" });
        }
        return res.status(200).json(users);
    }
    catch (error) {
        console.log(error);
        return next({ statusCode: 500, message: "An error occurred while fetching users" });
    }
});
exports.getAllUser = getAllUser;
// Get a user by their ID
const getUserByID = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.body.user.identifire;
    try {
        const users = yield (0, users_1.selectUserByID)(id);
        if (users.length === 0) {
            return next({ statusCode: 404, message: "Invalid user ID" });
        }
        delete users[0].password;
        return res.status(200).json(users[0]);
    }
    catch (error) {
        console.log(error);
        return next({ statusCode: 500, message: "An error occurred while fetching the user" });
    }
});
exports.getUserByID = getUserByID;
