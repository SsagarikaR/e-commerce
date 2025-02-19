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
exports.getUser = exports.createUser = void 0;
const authentication_1 = require("../middlewear/authentication");
const bcrypt_1 = __importDefault(require("bcrypt"));
const users_1 = require("../services/db/users");
//Creates a new user.
const createUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, contactNo, password } = req.body;
    try {
        if (!name || !email || !contactNo || !password) {
            return next({ statusCode: 409, message: "Please enter required credentials" });
        }
        const ifUserExistWithName = yield (0, users_1.selectUserByName)(name);
        if (ifUserExistWithName.length !== 0) {
            return next({ statusCode: 403, message: "This username is already taken" });
        }
        const ifUserExistWithEmail = yield (0, users_1.selectUserByEmail)(email);
        if (ifUserExistWithEmail.length !== 0) {
            return next({ statusCode: 403, message: "This email is already registered" });
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const [result, metaData] = yield (0, users_1.createNewUser)(name, email, contactNo, hashedPassword);
        if (metaData !== 0) {
            // Generate a JWT token for the user
            const token = yield (0, authentication_1.generateToken)(result);
            return res.status(201).json({ token });
        }
        else {
            return next({ statusCode: 409, message: "Error creating a new user." });
        }
    }
    catch (error) {
        console.log("Error creating user:", error);
        return next({ statusCode: 500, message: "An error occurred while signing up" });
    }
});
exports.createUser = createUser;
//  Retrieves user information based on email and password.
const getUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        if (!email) {
            return next({ statusCode: 404, message: "Email can't be empty" });
        }
        const user = yield (0, users_1.selectUserByEmail)(email);
        if (user.length !== 0) {
            if (user[0].password) {
                const isPasswordValid = yield bcrypt_1.default.compare(password, user[0].password);
                if (!isPasswordValid) {
                    return next({ statusCode: 403, message: "Invalid password." });
                }
            }
            // Generate a JWT token for the user
            const token = yield (0, authentication_1.generateToken)(user[0].userID);
            const userToReturn = user[0];
            userToReturn.token = token;
            delete userToReturn.password; // Remove password from response
            return res.status(200).json(userToReturn);
        }
        else {
            return next({ statusCode: 404, message: "User not found" });
        }
    }
    catch (error) {
        console.log("Error getting user:", error);
        return next({ statusCode: 500, message: "An error occurred while signing in" });
    }
});
exports.getUser = getUser;
