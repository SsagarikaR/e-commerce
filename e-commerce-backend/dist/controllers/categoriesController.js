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
const categories_1 = require("../services/db/categories");
// Controller to create a new category
const createCategories = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { categoryName, categoryThumbnail } = req.body;
    try {
        // Call service to create a new category
        const result = yield (0, categories_1.createCategoryService)(categoryName, categoryThumbnail);
        if (result.success) {
            return res.status(201).json({ message: result.message });
        }
        else {
            return next({ statusCode: 409, message: result.message });
        }
    }
    catch (error) {
        console.error(error);
        return next({ statusCode: 500, message: "Please try again after some time" });
    }
});
exports.createCategories = createCategories;
// Controller to get categories (by name or all categories)
const getCategories = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.query;
    try {
        // Call service to fetch categories
        const result = yield (0, categories_1.getCategoriesService)(name ? String(name) : undefined);
        if (result.success) {
            return res.status(200).json(result.categories);
        }
        else {
            return next({ statusCode: 404, message: result.message });
        }
    }
    catch (error) {
        console.error(error);
        return next({ statusCode: 500, message: "Please try again after some time!" });
    }
});
exports.getCategories = getCategories;
// Controller to update an existing category
const updateCategories = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { categoryID, categoryName, categoryThumbnail } = req.body;
    try {
        // Call service to update the category
        const result = yield (0, categories_1.updateCategoryService)(categoryID, categoryName, categoryThumbnail);
        if (result.success) {
            return res.status(200).json({ message: result.message });
        }
        else {
            return next({ statusCode: 404, message: result.message });
        }
    }
    catch (error) {
        console.error(error);
        return next({ statusCode: 500, message: "Please try again after some time." });
    }
});
exports.updateCategories = updateCategories;
// Controller to delete an existing category
const deleteCategories = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { categoryID } = req.body;
    try {
        // Call service to delete the category
        const result = yield (0, categories_1.deleteCategoryService)(categoryID);
        if (result.success) {
            return res.status(200).json({ message: result.message });
        }
        else {
            return next({ statusCode: 404, message: result.message });
        }
    }
    catch (error) {
        console.error(error);
        return next({ statusCode: 500, message: "Please try again after some time!" });
    }
});
exports.deleteCategories = deleteCategories;
