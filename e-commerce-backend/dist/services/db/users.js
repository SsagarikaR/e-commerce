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
exports.updateUsersPassword = exports.deleteUserByID = exports.selectUserByNameOREmail = exports.createNewUser = exports.selectUserByEmail = exports.selectUserByName = exports.selectUserByID = exports.selectAllUsers = void 0;
const databse_1 = require("../../config/databse");
const sequelize_1 = require("sequelize");
const selectAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield databse_1.sequelize.query(`SELECT Users.*,
            CASE 
                WHEN Admins.userID IS NOT NULL THEN 'Admin' 
                ELSE 'User' 
            END AS role
        FROM Users
        LEFT JOIN Admins ON Users.userID = Admins.userID`, {
        type: sequelize_1.QueryTypes.SELECT
    });
});
exports.selectAllUsers = selectAllUsers;
const selectUserByID = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield databse_1.sequelize.query(`SELECT Users.*, 
            CASE 
                WHEN Admins.userID IS NOT NULL THEN 'Admin' 
                ELSE 'User' 
            END AS role
        FROM Users
        LEFT JOIN Admins ON Users.userID = Admins.userID
        WHERE Users.userID = ?`, {
        replacements: [id],
        type: sequelize_1.QueryTypes.SELECT
    });
});
exports.selectUserByID = selectUserByID;
const selectUserByName = (name) => __awaiter(void 0, void 0, void 0, function* () {
    return yield databse_1.sequelize.query(`SELECT * FROM Users WHERE name=? `, {
        replacements: [name],
        type: sequelize_1.QueryTypes.SELECT
    });
});
exports.selectUserByName = selectUserByName;
const selectUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    return yield databse_1.sequelize.query(`SELECT * FROM Users WHERE email=?`, {
        replacements: [email],
        type: sequelize_1.QueryTypes.SELECT
    });
});
exports.selectUserByEmail = selectUserByEmail;
const createNewUser = (name, email, contactNo, hashedPassword) => __awaiter(void 0, void 0, void 0, function* () {
    return yield databse_1.sequelize.query(`INSERT INTO Users (name,email,contactNo,role,password) VALUES
                (?,?,?,?,?)`, {
        replacements: [name, email, contactNo, hashedPassword],
        type: sequelize_1.QueryTypes.INSERT
    });
});
exports.createNewUser = createNewUser;
const selectUserByNameOREmail = (name, email) => __awaiter(void 0, void 0, void 0, function* () {
    return yield databse_1.sequelize.query(`SELECT * FROM Users WHERE name=? AND  email=?  `, {
        replacements: [name, email],
        type: sequelize_1.QueryTypes.SELECT
    });
});
exports.selectUserByNameOREmail = selectUserByNameOREmail;
const deleteUserByID = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield databse_1.sequelize.query('DELETE FROM Users WHERE userID=?', {
        replacements: [id],
        type: sequelize_1.QueryTypes.DELETE
    });
});
exports.deleteUserByID = deleteUserByID;
const updateUsersPassword = (hashedPassword) => __awaiter(void 0, void 0, void 0, function* () {
    return yield databse_1.sequelize.query('UPDATE Users SET password=?', {
        replacements: [hashedPassword],
        type: sequelize_1.QueryTypes.UPDATE
    });
});
exports.updateUsersPassword = updateUsersPassword;
