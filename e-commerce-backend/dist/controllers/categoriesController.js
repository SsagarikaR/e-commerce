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
const categories_1 = require("../services/db/categories");
const createCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { categoryName, categoryThumbnail } = req.body;
    try {
        const isCategoryExist = yield (0, categories_1.selectCatgeoryByName)(categoryName);
        if (isCategoryExist.length !== 0) {
            return res.status(404).json({ error: "This category already exist" });
        }
        const [result, metaData] = yield (0, categories_1.createNewCategory)(categoryName, categoryThumbnail);
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
            if (typeof name === "string") {
                const categoryWithThisName = yield (0, categories_1.selectCatgeoryByName)(name);
                if (categoryWithThisName.length === 0) {
                    return res.status(404).json({ message: `No catgeory with name ${name} found.` });
                }
                else {
                    return res.status(200).json(categoryWithThisName);
                }
            }
        }
        const allCatgeories = yield (0, categories_1.selectAllCatgeory)();
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
        const updateThumbnail = yield (0, categories_1.updateTheCatgeory)(categoryName, categoryThumbnail, categoryID);
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
        const isCategoryExist = yield (0, categories_1.selectCatgeoryByID)(categoryID);
        if (isCategoryExist.length === 0) {
            return res.status(404).json({ message: "This category not found" });
        }
        yield (0, categories_1.deleteCatgeory)(categoryID);
        // console.log(deletecategories,"deleteCategory");
        return res.status(200).json({ message: "Successfully deleted the category." });
    }
    catch (error) {
        console.log(error, "error");
        return res.status(500).json({ error: "Please try again after sometimes!" });
    }
});
exports.deletecategories = deletecategories;
