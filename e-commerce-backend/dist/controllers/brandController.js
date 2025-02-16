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
exports.deleteBrand = exports.updateBrand = exports.getBrandById = exports.getAllBrands = exports.createBrand = void 0;
const databse_1 = require("../config/databse");
const sequelize_1 = require("sequelize");
const createBrand = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { brandName } = req.body;
    try {
        const [existingBrand] = yield databse_1.sequelize.query(`SELECT * FROM brands WHERE brandName = ?`, {
            replacements: [brandName],
            type: sequelize_1.QueryTypes.SELECT
        });
        if (existingBrand) {
            return res.status(400).json({ error: "Brand already exists" });
        }
        const [result, metadata] = yield databse_1.sequelize.query(`INSERT INTO brands (brandName) VALUES (?)`, {
            replacements: [brandName],
            type: sequelize_1.QueryTypes.INSERT
        });
        if (metadata) {
            return res.status(201).json({ message: "Brand created successfully" });
        }
        return res.status(400).json({ error: "Failed to create brand" });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: "An error occurred while creating the brand" });
    }
});
exports.createBrand = createBrand;
const getAllBrands = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [brands] = yield databse_1.sequelize.query(`SELECT * FROM brands`);
        if (brands.length === 0) {
            return res.status(404).json({ message: "No brands found" });
        }
        return res.status(200).json(brands);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: "An error occurred while fetching brands" });
    }
});
exports.getAllBrands = getAllBrands;
const getBrandById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { brandID } = req.params;
    try {
        const [brand] = yield databse_1.sequelize.query(`SELECT * FROM brands WHERE brandtID = ?`, {
            replacements: [brandID],
            type: sequelize_1.QueryTypes.SELECT
        });
        if (!brand) {
            return res.status(404).json({ message: "Brand not found" });
        }
        return res.status(200).json(brand);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: "An error occurred while fetching the brand" });
    }
});
exports.getBrandById = getBrandById;
const updateBrand = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { brandID } = req.params;
    const { brandName } = req.body;
    try {
        const existingBrand = yield databse_1.sequelize.query(`SELECT * FROM brands WHERE brandtID = ?`, {
            replacements: [brandID],
            type: sequelize_1.QueryTypes.SELECT
        });
        if (existingBrand.length === 0) {
            return res.status(404).json({ message: "Brand not found" });
        }
        const [updateResult, updateMetadata] = yield databse_1.sequelize.query(`UPDATE brands SET brandName = ? WHERE brandtID = ?`, {
            replacements: [brandName, brandID],
            type: sequelize_1.QueryTypes.UPDATE
        });
        if (updateMetadata) {
            return res.status(200).json({ message: "Brand updated successfully" });
        }
        return res.status(400).json({ error: "Failed to update brand" });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: "An error occurred while updating the brand" });
    }
});
exports.updateBrand = updateBrand;
const deleteBrand = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { brandID } = req.params;
    try {
        const [existingBrand] = yield databse_1.sequelize.query(`SELECT * FROM brands WHERE brandtID = ?`, {
            replacements: [brandID],
            type: sequelize_1.QueryTypes.SELECT
        });
        if (!existingBrand) {
            return res.status(404).json({ message: "Brand not found" });
        }
        const deleted = yield databse_1.sequelize.query(`DELETE FROM brands WHERE brandtID = ?`, {
            replacements: [brandID],
            type: sequelize_1.QueryTypes.DELETE
        });
        return res.status(200).json({ message: "Brand deleted successfully" });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: "An error occurred while deleting the brand" });
    }
});
exports.deleteBrand = deleteBrand;
