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
const databse_1 = require("../db/databse");
const sequelize_1 = require("sequelize");
const bcrypt_1 = __importDefault(require("bcrypt"));
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.body.user.identifire;
    try {
        if (!id) {
            return res.status(404).json({ error: "User id not found" });
        }
        const IsUserExist = yield databse_1.sequelize.query('SELECT * FROM Users WHERE userID=?', {
            replacements: [id],
            type: sequelize_1.QueryTypes.SELECT
        });
        if (IsUserExist.length === 0) {
            return res.status(404).json({ error: "User not found" });
        }
        const deleteUser = yield databse_1.sequelize.query('DELETE FROM Users WHERE userID=?', {
            replacements: [id],
            type: sequelize_1.QueryTypes.DELETE
        });
        console.log("deleted user:", deleteUser);
        return res.status(200).json({ message: "user dleted successfully" });
    }
    catch (error) {
        console.log(error, "errro");
        return res.status(500).json({ errro: "Please try again after sometimes!" });
    }
});
exports.deleteUser = deleteUser;
const updateUserPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { newPassword, oldPassword } = req.body;
    const id = req.body.user.identifire;
    try {
        const isUserExist = yield databse_1.sequelize.query('SELECT * FROM Users WHERE userID=?', {
            replacements: [id],
            type: sequelize_1.QueryTypes.SELECT
        });
        if (isUserExist.length === 0) {
            return res.status(404).json({ error: "User not found" });
        }
        if (isUserExist[0].password) {
            const isPasswordValid = yield bcrypt_1.default.compare(oldPassword, isUserExist[0].password);
            if (!isPasswordValid) {
                return res.status(403).json({ error: "Invalid password." });
            }
        }
        const hashedPassword = yield bcrypt_1.default.hash(newPassword, 10);
        const updateUser = yield databse_1.sequelize.query('UPDATE Users SET password=?', {
            replacements: [hashedPassword],
            type: sequelize_1.QueryTypes.UPDATE
        });
        console.log(updateUser, "updateuser");
        return res.status(200).json({ message: "User updated successfully" });
    }
    catch (error) {
        console.log(error, "error");
        return res.status(500).json({ error: "Please try again after sometimes!" });
    }
});
exports.updateUserPassword = updateUserPassword;
const getAllUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield databse_1.sequelize.query(`SELECT * FROM Users`, {
            type: sequelize_1.QueryTypes.SELECT
        });
        if (users.length === 0) {
            return res.status(404).json({ error: "No user found" });
        }
        return res.status(200).json(users);
    }
    catch (error) {
        console.log(error, "error");
        return res.status(500).json({ error: "Please try again after sometimes!" });
    }
});
exports.getAllUser = getAllUser;
const getUserByID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    const id = req.body.user.identifire;
    try {
        const users = yield databse_1.sequelize.query(`SELECT * FROM Users where userID=?`, {
            replacements: [id],
            type: sequelize_1.QueryTypes.SELECT,
        });
        if (users.length === 0) {
            return res.status(404).json({ error: "Invalid user id" });
        }
        delete users[0].password;
        return res.status(200).json(users[0]);
    }
    catch (error) {
        console.log(error, "error");
        return res.status(500).json({ error: "Please try again after sometimes!" });
    }
});
exports.getUserByID = getUserByID;
