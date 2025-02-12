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
exports.updateProduct = exports.deleteProducts = exports.getProducts = exports.createProduct = void 0;
const databse_1 = require("../config/databse");
const sequelize_1 = require("sequelize");
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description, thumbnail, price, categoryID } = req.body;
    try {
        if (name === "" || name === undefined || !name) {
            return res.status(404).json({ error: "Name can't be empty" });
        }
        if (description === "" || description === undefined || !description) {
            return res.status(404).json({ error: "Description can't be empty" });
        }
        if (thumbnail === "" || thumbnail === undefined || !thumbnail) {
            return res.status(404).json({ error: "Thumbnail No. can't be empty." });
        }
        if (price === "" || price === undefined || !price) {
            return res.status(404).json({ error: "Price role can't be empty." });
        }
        if (categoryID === "" || categoryID === undefined || !categoryID) {
            return res.status(404).json({ error: "Please choose a category role can't be empty." });
        }
        const isProductExist = yield databse_1.sequelize.query('SELECT * FROM Products WHERE name=? AND description=?  AND price=? AND categoryID=?', {
            replacements: [name, description, price, categoryID],
            type: sequelize_1.QueryTypes.SELECT
        });
        if (isProductExist.length > 0) {
            return res.status(403).json({ error: "This product already exist." });
        }
        const [result, metaData] = yield databse_1.sequelize.query('INSERT INTO Products (name,description,thumbnail,price,categoryID) VALUES (?,?,?,?,?)', {
            replacements: [name, description, thumbnail, price, categoryID],
            type: sequelize_1.QueryTypes.INSERT
        });
        if (metaData > 0) {
            return res.status(202).json({ message: "Successfully added the product." });
        }
        else {
            return res.status(409).json({ error: "Error in adding a new product." });
        }
    }
    catch (error) {
        console.log(error, "error");
        return res.status(500).json({ error: "Please try again after sometimes!" });
    }
});
exports.createProduct = createProduct;
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, price, categories } = req.params;
    try {
    }
    catch (error) {
        console.log(error, "error");
        return res.status(500).json({ error: "Please try again after sometimes!" });
    }
});
exports.getProducts = getProducts;
const deleteProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { productID } = req.body;
    try {
        const isProductExist = yield databse_1.sequelize.query('SELECT * FROM Products WHERE productID=?', {
            replacements: [productID],
            type: sequelize_1.QueryTypes.SELECT
        });
        if (isProductExist.length === 0) {
            return res.status(403).json({ error: "This product doesn't exist" });
        }
        const deleteProduct = yield databse_1.sequelize.query('DELETE FROM Products WHERE productID=?', {
            replacements: [productID],
            type: sequelize_1.QueryTypes.DELETE
        });
        return res.status(200).json({ message: "Successfully deletd the product" });
    }
    catch (error) {
        console.log(error, "error");
        return res.status(500).json({ error: "Please try again after sometimes!" });
    }
});
exports.deleteProducts = deleteProducts;
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { productID, name, description, thumbnail, price, categoryID } = req.body;
    try {
        const isProductExist = yield databse_1.sequelize.query('SELECT * FROM Products WHERE productID=?', {
            replacements: [productID],
            type: sequelize_1.QueryTypes.SELECT
        });
        if (isProductExist.length === 0) {
            return res.status(403).json({ error: "This product doesn't exist" });
        }
        const updatedProduct = yield databse_1.sequelize.query('UPDATE Products SET name=? ,description=? ,thumbnail=? ,price=? ,categoryID=? WHERE productID=?', {
            replacements: [name, description, thumbnail, price, categoryID, productID],
            type: sequelize_1.QueryTypes.UPDATE
        });
        if (updatedProduct[1] > 0) {
            return res.status(200).json({ message: "Successfully updated the product." });
        }
        else {
            return res.status(409).json({ error: "Error in updating product." });
        }
    }
    catch (error) {
        console.log(error, "error");
        return res.status(500).json({ error: "Please try again after sometimes!" });
    }
});
exports.updateProduct = updateProduct;
