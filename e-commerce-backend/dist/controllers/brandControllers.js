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
// Controller to create a new brand
const createBrands = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { brandName, brandThumbnail } = req.body;
    try {
        if (!brandName || !brandThumbnail) {
            return res.status(409).json({ message: "Please enter all the required fields" });
        }
        // Call service to create a new brand
        const result = yield (0, brands_1.createBrandService)(brandName, brandThumbnail);
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
exports.createBrands = createBrands;
// Controller to get brands (by name or all brands)
const getBrands = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.query;
    try {
        const result = yield (0, brands_1.getBrandsService)(name ? String(name) : undefined);
        if (result.success) {
            return res.status(200).json(result.brands);
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
exports.getBrands = getBrands;
// Controller to update an existing brand
const updateBrands = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { brandID, brandName, brandThumbnail } = req.body;
    try {
        const result = yield (0, brands_1.updateBrandService)(brandID, brandName, brandThumbnail);
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
exports.updateBrands = updateBrands;
// Controller to delete an existing brand
const deleteBrands = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { brandID } = req.body;
    try {
        const result = yield (0, brands_1.deleteBrandService)(brandID);
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
exports.deleteBrands = deleteBrands;
