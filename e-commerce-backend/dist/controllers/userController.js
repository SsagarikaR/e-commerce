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
exports.getUserByID = exports.getAllUser = exports.updateUserPassword = exports.deleteUser = void 0;
const users_1 = require("../services/db/users");
// Controller to delete a user by ID
const deleteUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userID = req.body.user.identifire;
    try {
        const result = yield (0, users_1.deleteUserService)(userID);
        if (!result.success) {
            return next({ statusCode: 404, message: result.message });
        }
        return res.status(200).json({ message: result.message });
    }
    catch (error) {
        console.error(error);
        return next({ statusCode: 500, message: "Error deleting user" });
    }
});
exports.deleteUser = deleteUser;
// Controller to update a user's password
const updateUserPassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { oldPassword, newPassword } = req.body;
    const userID = req.body.user.identifire;
    try {
        const result = yield (0, users_1.updatePasswordService)(userID, oldPassword, newPassword);
        if (!result.success) {
            return next({ statusCode: 403, message: result.message });
        }
        return res.status(200).json({ message: result.message });
    }
    catch (error) {
        console.error(error);
        return next({ statusCode: 500, message: "Error updating password" });
    }
});
exports.updateUserPassword = updateUserPassword;
// Controller to retrieve all users
const getAllUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, users_1.getAllUsersService)();
        if (!result.success) {
            return next({ statusCode: 404, message: result.message });
        }
        return res.status(200).json(result.users);
    }
    catch (error) {
        console.log(error);
        return next({ statusCode: 500, message: "An error occurred while fetching users" });
    }
});
exports.getAllUser = getAllUser;
// Controller to retrieve a user by their ID
const getUserByID = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.body.user.identifire;
    try {
        const result = yield (0, users_1.getUserByIDService)(id);
        if (!result.success) {
            return next({ statusCode: 404, message: result.message });
        }
        return res.status(200).json(result.user);
    }
    catch (error) {
        console.log(error);
        return next({ statusCode: 500, message: "An error occurred while fetching the user" });
    }
});
exports.getUserByID = getUserByID;
