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
exports.deleteCategoryService = exports.updateCategoryService = exports.getCategoriesService = exports.createCategoryService = void 0;
const categories_1 = require("../../respository/categories");
const cacheHelper_1 = require("../../helpers/cacheHelper");
// Service to create a new category
const createCategoryService = (categoryName, categoryThumbnail) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Check if the category already exists
        const isCategoryExist = yield (0, categories_1.selectCatgeoryByName)(categoryName);
        if (isCategoryExist.length !== 0) {
            return { success: false, message: "This category already exists" };
        }
        // Create the new category
        const [result, metaData] = yield (0, categories_1.createNewCategory)(categoryName, categoryThumbnail);
        if (metaData !== 0) {
            // Invalidate cache for all categories to ensure the list is updated
            (0, cacheHelper_1.invalidateCache)('categories:all');
            return { success: true, message: "Successfully added a new category." };
        }
        else {
            return { success: false, message: "Error in adding a new category." };
        }
    }
    catch (error) {
        console.error("Error in createCategoryService:", error);
        throw new Error("An error occurred while creating the category");
    }
});
exports.createCategoryService = createCategoryService;
// Service to get categories (by name or all categories)
const getCategoriesService = (name) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Define a cache key based on the provided category name (if any)
        const cacheKey = name ? `category:${name}` : 'categories:all';
        // Check if categories are cached
        const cachedCategories = (0, cacheHelper_1.getCache)(cacheKey);
        if (cachedCategories) {
            console.log('Returning cached categories');
            return { success: true, categories: cachedCategories }; // Return cached data
        }
        // If name is provided, fetch a specific category by name
        if (name && typeof name === 'string') {
            const category = yield (0, categories_1.selectCatgeoryByName)(name);
            if (category.length === 0) {
                return { success: false, message: `No category with name ${name} found.` };
            }
            // Store the fetched category in the cache
            (0, cacheHelper_1.setCache)(cacheKey, category);
            return { success: true, categories: category };
        }
        // Fetch all categories if no name is provided
        const categories = yield (0, categories_1.selectAllCatgeory)();
        if (categories.length === 0) {
            return { success: false, message: "No categories found." };
        }
        // Store the fetched categories in the cache
        (0, cacheHelper_1.setCache)(cacheKey, categories);
        return { success: true, categories };
    }
    catch (error) {
        console.error("Error in getCategoriesService:", error);
        throw new Error("An error occurred while fetching the categories");
    }
});
exports.getCategoriesService = getCategoriesService;
// Service to update an existing category
const updateCategoryService = (categoryID, categoryName, categoryThumbnail) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const isCategoryExist = yield (0, categories_1.selectCatgeoryByID)(categoryID);
        if (isCategoryExist.length === 0) {
            return { success: false, message: "Category not found" };
        }
        // Update the category
        yield (0, categories_1.updateTheCatgeory)(categoryName, categoryThumbnail, categoryID);
        // Invalidate cache for all categories since an update occurred
        (0, cacheHelper_1.invalidateCache)('categories:all');
        (0, cacheHelper_1.invalidateCache)(`category:${categoryName}`); // Invalidate cache for specific category name if needed
        return { success: true, message: "Successfully updated the category." };
    }
    catch (error) {
        console.error("Error in updateCategoryService:", error);
        throw new Error("An error occurred while updating the category");
    }
});
exports.updateCategoryService = updateCategoryService;
// Service to delete an existing category
const deleteCategoryService = (categoryID) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const isCategoryExist = yield (0, categories_1.selectCatgeoryByID)(categoryID);
        if (isCategoryExist.length === 0) {
            return { success: false, message: "This category not found" };
        }
        // Delete the category
        yield (0, categories_1.deleteCatgeory)(categoryID);
        // Invalidate cache for all categories after deletion
        (0, cacheHelper_1.invalidateCache)('categories:all');
        return { success: true, message: "Successfully deleted the category." };
    }
    catch (error) {
        console.error("Error in deleteCategoryService:", error);
        throw new Error("An error occurred while deleting the category");
    }
});
exports.deleteCategoryService = deleteCategoryService;
