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
exports.deleteBrands = exports.updateBrands = exports.getBrands = exports.createBrands = void 0;
const brands_1 = require("../services/db/brands");
/**
 * Controller for creating a new brand
 */
const createBrands = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { brandName, brandThumbnail } = req.body;
    try {
        // Check if all required fields are provided
        if (!brandName || !brandThumbnail) {
            return next({ statusCode: 409, message: "Please enter required fields." });
        }
        // Check if the brand already exists
        const isBrandExist = yield (0, brands_1.findBrandByName)(brandName);
        if (isBrandExist.length !== 0) {
            return next({ statusCode: 404, message: "This brand already exists." });
        }
        // Create the new brand
        const [result, metaData] = yield (0, brands_1.createNewBrand)(brandName, brandThumbnail);
        if (metaData !== 0) {
            return res.status(202).json({ message: "Successfully added a new brand." });
        }
        else {
            return next({ statusCode: 409, message: "Error in adding a new brand." });
        }
    }
    catch (error) {
        // Log the error and pass it to the global error handler
        console.log(error, "Error while creating brand");
        return next({ statusCode: 500, message: "An error occurred while creating brand." });
    }
});
exports.createBrands = createBrands;
/**
 *  Controller to fetch brands, either by name or all brands
 * */
const getBrands = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.query;
    try {
        // If name is provided, search for a brand with that name
        if (name) {
            if (typeof name === "string") {
                const brandWithThisName = yield (0, brands_1.findBrandByName)(name);
                if (brandWithThisName.length === 0) {
                    return next({ statusCode: 404, message: `No brand with name ${name} found.` });
                }
                else {
                    return res.status(200).json(brandWithThisName);
                }
            }
        }
        // If no name is provided, return all brands
        const allBrands = yield (0, brands_1.findAllBrand)();
        if (allBrands.length === 0) {
            return next({ statusCode: 404, message: "No brands found." });
        }
        else {
            return res.status(200).json(allBrands);
        }
    }
    catch (error) {
        // Log the error and pass it to the global error handler
        console.log(error, "Error while fetching brands");
        return next({ statusCode: 500, message: "An error occurred while fetching brands." });
    }
});
exports.getBrands = getBrands;
/**
 *  Controller for updating a brand's details
 * */
const updateBrands = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { brandID, brandName, brandThumbnail } = req.body;
    try {
        // Ensure all required fields are provided
        if (!brandName || !brandThumbnail || !brandID) {
            return next({ statusCode: 409, message: "Please enter required fields." });
        }
        // Update the brand information
        const updateThumbnail = yield (0, brands_1.updateTheBrand)(brandID, brandName, brandThumbnail);
        console.log(updateThumbnail);
        // Return success response
        return res.status(200).json({ message: "Successfully updated the brand." });
    }
    catch (error) {
        // Log the error and pass it to the global error handler
        console.log(error, "Error while updating brand");
        return next({ statusCode: 500, message: "An error occurred while updating the brand." });
    }
});
exports.updateBrands = updateBrands;
/**
 * Controller for deleting a brand by its ID
 * */
const deleteBrands = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { brandID } = req.body;
    try {
        // Check if the brand exists
        const isBrandExist = yield (0, brands_1.selectBrandByID)(brandID);
        if (isBrandExist.length === 0) {
            return next({ statusCode: 404, message: "This brand not found." });
        }
        // Delete the brand by its ID
        yield (0, brands_1.deleteBrandByID)(brandID);
        return res.status(200).json({ message: "Successfully deleted the brand." });
    }
    catch (error) {
        // Log the error and pass it to the global error handler
        console.log(error, "Error while deleting brand");
        return next({ statusCode: 500, message: "An error occurred while deleting the brand." });
    }
});
exports.deleteBrands = deleteBrands;
