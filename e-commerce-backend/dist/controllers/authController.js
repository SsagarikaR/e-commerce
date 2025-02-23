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
exports.getUser = exports.createUser = void 0;
const authentication_1 = require("../middlewear/authentication");
const users_1 = require("../services/db/users");
//Creates a new user.
const createUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, contactNo, password } = req.body;
    try {
        const result = yield (0, users_1.createUserService)(name, email, contactNo, password);
        if (!result.success) {
            return next({ statusCode: 403, message: result.message });
        }
        const token = yield (0, authentication_1.generateToken)(Number(result.result));
        return res.status(201).json({ token });
    }
    catch (error) {
        console.error(error);
        return next({ statusCode: 500, message: "Error creating user" });
    }
});
exports.createUser = createUser;
// Controller to get a user by email and password
const getUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const result = yield (0, users_1.getUserService)(email, password);
        if (!(result === null || result === void 0 ? void 0 : result.success)) {
            return next({ statusCode: 404, message: result === null || result === void 0 ? void 0 : result.message });
        }
        if (result.user) {
            const user = result.user;
            const token = yield (0, authentication_1.generateToken)(user.userID);
            user.token = token;
            return res.status(200).json(user);
        }
    }
    catch (error) {
        console.error(error);
        return next({ statusCode: 500, message: "Error retrieving user" });
    }
});
exports.getUser = getUser;
