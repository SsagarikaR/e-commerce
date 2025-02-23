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
exports.deleteBrandService = exports.updateBrandService = exports.getBrandsService = exports.createBrandService = void 0;
const brands_1 = require("../../respository/brands");
const cacheHelper_1 = require("../../helpers/cacheHelper");
// Service to create a new brand
const createBrandService = (brandName, brandThumbnail) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const isBrandExist = yield (0, brands_1.findBrandByName)(brandName);
        if (isBrandExist.length !== 0) {
            return { success: false, message: "This brand already exists" };
        }
        const [result, metaData] = yield (0, brands_1.createNewBrand)(brandName, brandThumbnail);
        if (metaData !== 0) {
            (0, cacheHelper_1.invalidateCache)("brands:all");
            return { success: true, message: "Successfully added a new brand." };
        }
        else {
            return { success: false, message: "Error in adding a new brand." };
        }
    }
    catch (error) {
        console.error("Error in createBrandService:", error);
        throw new Error("An error occurred while creating the brand");
    }
});
exports.createBrandService = createBrandService;
// Service to get brands (by name or all brands)
const getBrandsService = (name) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cacheKey = name ? `brand:${name}` : "brands:all";
        const cachedBrands = (0, cacheHelper_1.getCache)(cacheKey);
        if (cachedBrands) {
            console.log("Returning cached brands");
            return { success: true, brands: cachedBrands };
        }
        if (name && typeof name === "string") {
            const brand = yield (0, brands_1.findBrandByName)(name);
            if (brand.length === 0) {
                return { success: false, message: `No brand with name ${name} found.` };
            }
            (0, cacheHelper_1.setCache)(cacheKey, brand);
            return { success: true, brands: brand };
        }
        const brands = yield (0, brands_1.findAllBrand)();
        if (brands.length === 0) {
            return { success: false, message: "No brands found." };
        }
        (0, cacheHelper_1.setCache)(cacheKey, brands);
        return { success: true, brands };
    }
    catch (error) {
        console.error("Error in getBrandsService:", error);
        throw new Error("An error occurred while fetching the brands");
    }
});
exports.getBrandsService = getBrandsService;
// Service to update an existing brand
const updateBrandService = (brandID, brandName, brandThumbnail) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const isBrandExist = yield (0, brands_1.selectBrandByID)(brandID);
        if (isBrandExist.length === 0) {
            return { success: false, message: "Brand not found" };
        }
        yield (0, brands_1.updateTheBrand)(brandID, brandName, brandThumbnail);
        (0, cacheHelper_1.invalidateCache)("brands:all");
        (0, cacheHelper_1.invalidateCache)(`brand:${brandName}`);
        return { success: true, message: "Successfully updated the brand." };
    }
    catch (error) {
        console.error("Error in updateBrandService:", error);
        throw new Error("An error occurred while updating the brand");
    }
});
exports.updateBrandService = updateBrandService;
// Service to delete an existing brand
const deleteBrandService = (brandID) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const isBrandExist = yield (0, brands_1.selectBrandByID)(brandID);
        if (isBrandExist.length === 0) {
            return { success: false, message: "This brand not found" };
        }
        yield (0, brands_1.deleteBrandByID)(brandID);
        (0, cacheHelper_1.invalidateCache)("brands:all");
        return { success: true, message: "Successfully deleted the brand." };
    }
    catch (error) {
        console.error("Error in deleteBrandService:", error);
        throw new Error("An error occurred while deleting the brand");
    }
});
exports.deleteBrandService = deleteBrandService;
