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
exports.deleteBrandByID = exports.updateTheBrand = exports.createNewBrand = exports.findAllBrand = exports.selectBrandByID = exports.findBrandByName = void 0;
const databse_1 = require("../../config/databse");
const sequelize_1 = require("sequelize");
const findBrandByName = (brandName) => __awaiter(void 0, void 0, void 0, function* () {
    return yield databse_1.sequelize.query("SELECT * FROM Brands WHERE brandName =?", {
        replacements: [brandName],
        type: sequelize_1.QueryTypes.SELECT
    });
});
exports.findBrandByName = findBrandByName;
const selectBrandByID = (brandID) => __awaiter(void 0, void 0, void 0, function* () {
    return yield databse_1.sequelize.query("SELECT * FROM Brands WHERE brandID=?", {
        replacements: [brandID],
        type: sequelize_1.QueryTypes.SELECT
    });
});
exports.selectBrandByID = selectBrandByID;
const findAllBrand = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield databse_1.sequelize.query("SELECT * FROM Brands ", {
        type: sequelize_1.QueryTypes.SELECT
    });
});
exports.findAllBrand = findAllBrand;
const createNewBrand = (brandName, brandThumbnail) => __awaiter(void 0, void 0, void 0, function* () {
    return yield databse_1.sequelize.query("Insert into Brands  (brandName,brandThumbnail) VALUES (?,?)", {
        replacements: [brandName, brandThumbnail],
        type: sequelize_1.QueryTypes.INSERT
    });
});
exports.createNewBrand = createNewBrand;
const updateTheBrand = (brandID, brandName, brandThumbnail) => __awaiter(void 0, void 0, void 0, function* () {
    return yield databse_1.sequelize.query(`UPDATE Brands SET brandThumbnail=? ,brandName=? WHERE  brandID=?`, {
        replacements: [brandThumbnail, brandName, brandID],
        type: sequelize_1.QueryTypes.UPDATE
    });
});
exports.updateTheBrand = updateTheBrand;
const deleteBrandByID = (brandID) => __awaiter(void 0, void 0, void 0, function* () {
    return yield databse_1.sequelize.query(`DELETE FROM Brands WHERE brandID=?`, {
        replacements: [brandID],
        type: sequelize_1.QueryTypes.DELETE
    });
});
exports.deleteBrandByID = deleteBrandByID;
