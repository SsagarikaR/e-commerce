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
exports.deleteCategories = exports.updateCategories = exports.getCategories = exports.createCategories = void 0;
const categories_1 = require("../respository/categories");
// Controller to create a new category
const createCategories = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { categoryName, categoryThumbnail } = req.body;
    try {
        // Check if the category already exists
        const isCategoryExist = yield (0, categories_1.selectCatgeoryByName)(categoryName);
        if (isCategoryExist.length !== 0) {
            return next({ statusCode: 409, message: "This category already exists" });
        }
        // Create a new category
        const [result, metaData] = yield (0, categories_1.createNewCategory)(categoryName, categoryThumbnail);
        if (metaData !== 0) {
            return res.status(201).json({ message: "Successfully added a new category." });
        }
        else {
            return next({ statusCode: 400, message: "Error in adding a new category." });
        }
    }
    catch (error) {
        console.error(error);
        return next({ statusCode: 500, message: "Please try again after some time" });
    }
});
exports.createCategories = createCategories;
//  Controller to get categories (by name or all categories)
const getCategories = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.query;
    try {
        // If a name is provided, search for category by name
        if (name) {
            if (typeof name === "string") {
                const categoryWithThisName = yield (0, categories_1.selectCatgeoryByName)(name);
                if (categoryWithThisName.length === 0) {
                    return next({ statusCode: 404, message: `No category with name ${name} found.` });
                }
                else {
                    return res.status(200).json(categoryWithThisName);
                }
            }
        }
        // If no name, fetch all categories
        const allCategories = yield (0, categories_1.selectAllCatgeory)();
        if (allCategories.length === 0) {
            return next({ statusCode: 404, message: "No categories found." });
        }
        else {
            return res.status(200).json(allCategories);
        }
    }
    catch (error) {
        console.error(error);
        return next({ statusCode: 500, message: "Please try again after some time!" });
    }
});
exports.getCategories = getCategories;
//  Controller to update an existing category
const updateCategories = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { categoryID, categoryName, categoryThumbnail } = req.body;
    try {
        const isCategoryExist = yield (0, categories_1.selectCatgeoryByID)(categoryID);
        if (isCategoryExist.length === 0) {
            return next({ statusCode: 404, message: "Category not found" });
        }
        const updateThumbnail = yield (0, categories_1.updateTheCatgeory)(categoryName, categoryThumbnail, categoryID);
        return res.status(200).json({ message: "Successfully updated the category." });
    }
    catch (error) {
        console.error(error);
        return next({ statusCode: 500, message: "Please try again after some time." });
    }
});
exports.updateCategories = updateCategories;
//  Controller to delete an existing category
const deleteCategories = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { categoryID } = req.body;
    try {
        const isCategoryExist = yield (0, categories_1.selectCatgeoryByID)(categoryID);
        if (isCategoryExist.length === 0) {
            return next({ statusCode: 404, message: "This category not found" });
        }
        yield (0, categories_1.deleteCatgeory)(categoryID);
        return res.status(200).json({ message: "Successfully deleted the category." });
    }
    catch (error) {
        console.error(error);
        return next({ statusCode: 500, message: "Please try again after some time!" });
    }
});
exports.deleteCategories = deleteCategories;
