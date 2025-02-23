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
exports.getUserByIDService = exports.getAllUsersService = exports.updatePasswordService = exports.deleteUserService = exports.getUserService = exports.createUserService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const users_1 = require("../../respository/users");
// Service to create a new user
const createUserService = (name, email, contactNo, password) => __awaiter(void 0, void 0, void 0, function* () {
    const existingUserByName = yield (0, users_1.selectUserByName)(name);
    if (existingUserByName.length > 0) {
        return { success: false, message: "Username already taken" };
    }
    const existingUserByEmail = yield (0, users_1.selectUserByEmail)(email);
    if (existingUserByEmail.length > 0) {
        return { success: false, message: "Email already registered" };
    }
    const hashedPassword = yield bcrypt_1.default.hash(password, 10);
    const [result, metaData] = yield (0, users_1.createNewUser)(name, email, contactNo, hashedPassword);
    if (metaData === 0) {
        return { success: false, message: "Error creating user" };
    }
    return { success: true, result };
});
exports.createUserService = createUserService;
// Service to get a user by email and password
const getUserService = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield (0, users_1.selectUserByEmail)(email);
    if (users.length === 0) {
        return { success: false, message: "User not found" };
    }
    if (users[0].password) {
        const isPasswordValid = yield bcrypt_1.default.compare(password, users[0].password);
        if (!isPasswordValid) {
            return { success: false, message: "Invalid password" };
        }
        const user = users[0];
        delete user.password;
        return { success: true, user };
    }
});
exports.getUserService = getUserService;
// Service to delete a user by their ID
const deleteUserService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield (0, users_1.selectUserByID)(id);
    if (user.length === 0) {
        return { success: false, message: "User not found" };
    }
    yield (0, users_1.deleteUserByID)(id);
    return { success: true, message: "User deleted successfully" };
});
exports.deleteUserService = deleteUserService;
// Service to update the user's password
const updatePasswordService = (userID, oldPassword, newPassword) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield (0, users_1.selectUserByID)(userID);
    if (user.length === 0) {
        return { success: false, message: "User not found" };
    }
    if (user[0].password) {
        const isPasswordValid = yield bcrypt_1.default.compare(oldPassword, user[0].password);
        if (!isPasswordValid) {
            return { success: false, message: "Invalid old password" };
        }
    }
    const hashedPassword = yield bcrypt_1.default.hash(newPassword, 10);
    yield (0, users_1.updateUsersPassword)(hashedPassword);
    return { success: true, message: "Password updated successfully" };
});
exports.updatePasswordService = updatePasswordService;
const getAllUsersService = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield (0, users_1.selectAllUsers)();
        if (users.length === 0) {
            return { success: false, message: "No users found" };
        }
        return { success: true, users };
    }
    catch (error) {
        throw new Error("An error occurred while fetching users");
    }
});
exports.getAllUsersService = getAllUsersService;
// Service function to retrieve a user by their ID
const getUserByIDService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield (0, users_1.selectUserByID)(id);
        if (users.length === 0) {
            return { success: false, message: "User not found" };
        }
        // Delete the password field before returning
        delete users[0].password;
        return { success: true, user: users[0] };
    }
    catch (error) {
        throw new Error("An error occurred while fetching the user by ID");
    }
});
exports.getUserByIDService = getUserByIDService;
