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
exports.deleteCatgeory = exports.selectCatgeoryByID = exports.createNewCategory = exports.updateTheCatgeory = exports.selectAllCatgeory = exports.selectCatgeoryByName = void 0;
const databse_1 = require("../config/databse");
const sequelize_1 = require("sequelize");
const selectCatgeoryByName = (categoryName) => __awaiter(void 0, void 0, void 0, function* () {
    return yield databse_1.sequelize.query(`SELECT * FROM Categories WHERE categoryName=?`, {
        replacements: [categoryName],
        type: sequelize_1.QueryTypes.SELECT
    });
});
exports.selectCatgeoryByName = selectCatgeoryByName;
const selectAllCatgeory = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield databse_1.sequelize.query('SELECT * FROM Categories', {
        type: sequelize_1.QueryTypes.SELECT
    });
});
exports.selectAllCatgeory = selectAllCatgeory;
const updateTheCatgeory = (categoryName, categoryThumbnail, categoryID) => __awaiter(void 0, void 0, void 0, function* () {
    return yield databse_1.sequelize.query(`UPDATE Categories SET categoryName=?, categoryThumbnail=? where categoryID=?`, {
        replacements: [categoryName, categoryThumbnail, categoryID],
        type: sequelize_1.QueryTypes.UPDATE
    });
});
exports.updateTheCatgeory = updateTheCatgeory;
const createNewCategory = (categoryName, categoryThumbnail) => __awaiter(void 0, void 0, void 0, function* () {
    return yield databse_1.sequelize.query('INSERT INTO Categories (categoryName,categoryThumbnail) VALUES (?,?)', {
        replacements: [categoryName, categoryThumbnail]
    });
});
exports.createNewCategory = createNewCategory;
const selectCatgeoryByID = (categoryID) => __awaiter(void 0, void 0, void 0, function* () {
    return yield databse_1.sequelize.query('SELECT * FROM Categories WHERE categoryID=?', {
        replacements: [categoryID],
        type: sequelize_1.QueryTypes.SELECT
    });
});
exports.selectCatgeoryByID = selectCatgeoryByID;
const deleteCatgeory = (categoryID) => __awaiter(void 0, void 0, void 0, function* () {
    return yield databse_1.sequelize.query('DELETE FROM Categories WHERE categoryID=?', {
        replacements: [categoryID],
        type: sequelize_1.QueryTypes.DELETE
    });
});
exports.deleteCatgeory = deleteCatgeory;
