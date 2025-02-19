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
exports.updateAdminByID = exports.deleteAdminByID = exports.selectAdmin = exports.createNewAdmin = void 0;
const databse_1 = require("../../config/databse");
const sequelize_1 = require("sequelize");
const createNewAdmin = (userID) => __awaiter(void 0, void 0, void 0, function* () {
    return yield databse_1.sequelize.query("INSERT INTO Admins  (userID) VALUES (?)", {
        replacements: [userID],
        type: sequelize_1.QueryTypes.INSERT
    });
});
exports.createNewAdmin = createNewAdmin;
const selectAdmin = (userID) => __awaiter(void 0, void 0, void 0, function* () {
    return yield databse_1.sequelize.query("SELECT * FROM Admins Where userID=?", {
        replacements: [userID],
        type: sequelize_1.QueryTypes.SELECT
    });
});
exports.selectAdmin = selectAdmin;
const deleteAdminByID = (userID) => __awaiter(void 0, void 0, void 0, function* () {
    return yield databse_1.sequelize.query("DELETE FROM Admins WHERE userID = ?", {
        replacements: [userID],
        type: sequelize_1.QueryTypes.DELETE
    });
});
exports.deleteAdminByID = deleteAdminByID;
const updateAdminByID = (userID, newUserID) => __awaiter(void 0, void 0, void 0, function* () {
    return yield databse_1.sequelize.query("UPDATE Admins SET userID = ? WHERE userID = ?", {
        replacements: [newUserID, userID],
        type: sequelize_1.QueryTypes.UPDATE
    });
});
exports.updateAdminByID = updateAdminByID;
