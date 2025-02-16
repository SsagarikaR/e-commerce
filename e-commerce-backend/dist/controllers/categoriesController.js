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
exports.deletecategories = exports.updateCategories = exports.getCategories = exports.createCategories = void 0;
const databse_1 = require("../config/databse");
const sequelize_1 = require("sequelize");
const createCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { categoryName, categoryThumbnail } = req.body;
    try {
        const isCategoryExist = yield databse_1.sequelize.query(`SELECT * FROM Categories WHERE categoryName=?`, {
            replacements: [categoryName],
            type: sequelize_1.QueryTypes.SELECT
        });
        if (isCategoryExist.length !== 0) {
            return res.status(404).json({ error: "This category already exist" });
        }
        const [result, metaData] = yield databse_1.sequelize.query('INSERT INTO Categories (categoryName,categoryThumbnail) VALUES (?,?)', {
            replacements: [categoryName, categoryThumbnail]
        });
        if (metaData !== 0) {
            return res.status(202).json({ message: "Succesfully added a new category." });
        }
        else {
            return res.status(409).json({ message: "Error in adding a new category." });
        }
    }
    catch (error) {
        console.log(error, "error");
        return res.status(500).json({ error: "Please try again after sometimes" });
    }
});
exports.createCategories = createCategories;
const getCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.query;
    console.log(req.query, "query");
    console.log(name);
    try {
        if (name) {
            const categoryWithThisName = yield databse_1.sequelize.query('SELECT * from Categories WHERE categoryName=?', {
                replacements: [name],
                type: sequelize_1.QueryTypes.SELECT
            });
            if (categoryWithThisName.length === 0) {
                return res.status(404).json({ message: `No catgeory with name ${name} found.` });
            }
            else {
                return res.status(200).json(categoryWithThisName);
            }
        }
        const allCatgeories = yield databse_1.sequelize.query('SELECT * FROM Categories', {
            type: sequelize_1.QueryTypes.SELECT
        });
        if (allCatgeories.length === 0) {
            return res.status(404).json({ message: "No categories found." });
        }
        else {
            return res.status(200).json(allCatgeories);
        }
    }
    catch (error) {
        console.log(error, "error");
        return res.status(500).json({ error: "Please try again after sometimes!" });
    }
});
exports.getCategories = getCategories;
const updateCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { categoryID, categoryName, categoryThumbnail } = req.body;
    try {
        const updateThumbnail = yield databse_1.sequelize.query(`UPDATE Categories SET categoryName=?, categoryThumbnail=? where categoryID=?`, {
            replacements: [categoryName, categoryThumbnail, categoryID],
            type: sequelize_1.QueryTypes.UPDATE
        });
        console.log(updateThumbnail);
        return res.status(200).json({ message: "Successfully updated the category." });
    }
    catch (error) {
        console.log(error, "error");
        return res.status(500).json({ error: "Please try again after sometimes." });
    }
});
exports.updateCategories = updateCategories;
const deletecategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { categoryID } = req.body;
    try {
        const isCategoryExist = yield databse_1.sequelize.query('SELECT * FROM Categories WHERE categoryID=?', {
            replacements: [categoryID],
            type: sequelize_1.QueryTypes.SELECT
        });
        if (isCategoryExist.length === 0) {
            return res.status(404).json({ message: "This category not found" });
        }
        yield databse_1.sequelize.query('DELETE FROM Categories WHERE categoryID=?', {
            replacements: [categoryID],
            type: sequelize_1.QueryTypes.DELETE
        });
        // console.log(deletecategories,"deleteCategory");
        return res.status(200).json({ message: "Successfully deleted the category." });
    }
    catch (error) {
        console.log(error, "error");
        return res.status(500).json({ error: "Please try again after sometimes!" });
    }
});
exports.deletecategories = deletecategories;
