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
const databse_1 = require("../db/databse");
const sequelize_1 = require("sequelize");
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { productName, productDescription, productThumbnail, productPrice, categoryID, brandID } = req.body;
    try {
        if (!productName || !productDescription || !productThumbnail || !productPrice || !categoryID || !brandID) {
            return res.status(403).json({ message: "Please enter the required files." });
        }
        const category = yield databse_1.sequelize.query('SELECT * FROM Categories WHERE categoryID = ?', {
            replacements: [categoryID],
            type: sequelize_1.QueryTypes.SELECT,
        });
        if (category.length === 0) {
            return res.status(404).json({ error: "Category not found!" });
        }
        const brand = yield databse_1.sequelize.query('SELECT * FROM brands WHERE brandID = ?', {
            replacements: [brandID],
            type: sequelize_1.QueryTypes.SELECT,
        });
        if (brand.length === 0) {
            return res.status(404).json({ error: "Brand not found!" });
        }
        const [result, metadata] = yield databse_1.sequelize.query('INSERT INTO Products (productName, productDescription, productThumbnail, productPrice, categoryID, brandID) VALUES (?, ?, ?, ?, ?, ?)', {
            replacements: [productName, productDescription, productThumbnail, productPrice, categoryID, brandID],
        });
        if (metadata !== 0) {
            return res.status(201).json({ message: "Product successfully added." });
        }
        else {
            return res.status(500).json({ error: "Failed to add product!" });
        }
    }
    catch (error) {
        console.log(error, "error");
        return res.status(500).json({ error: "Internal server error!" });
    }
});
exports.createProduct = createProduct;
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { categoryID, brandID, productName } = req.query;
    try {
        let whereClause = [];
        let replacements = [];
        if (categoryID) {
            whereClause.push("categoryID = ?");
            replacements.push(categoryID);
        }
        if (brandID) {
            whereClause.push("brandID = ?");
            replacements.push(brandID);
        }
        if (productName) {
            whereClause.push("productName LIKE ?");
            replacements.push(`%${productName}%`);
        }
        let whereQuery = whereClause.length > 0 ? "WHERE " + whereClause.join(" AND ") : "";
        const query = `
        SELECT * FROM Products
        ${whereQuery}
        ORDER BY productName;  -- Optional: You can add ordering logic based on your needs
      `;
        const products = yield databse_1.sequelize.query(query, {
            replacements,
            type: sequelize_1.QueryTypes.SELECT,
        });
        if (products.length === 0) {
            return res.status(404).json({ message: "No products found." });
        }
        return res.status(200).json(products);
    }
    catch (error) {
        console.log(error, "error");
        return res.status(500).json({ error: "Please try again later!" });
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
    const { productID, productName, productDescription, productThumbnail, productPrice, categoryID } = req.body;
    try {
        const isProductExist = yield databse_1.sequelize.query('SELECT * FROM Products WHERE productID=?', {
            replacements: [productID],
            type: sequelize_1.QueryTypes.SELECT
        });
        if (isProductExist.length === 0) {
            return res.status(403).json({ error: "This product doesn't exist" });
        }
        const updatedProduct = yield databse_1.sequelize.query('UPDATE Products SET productName=? ,productDescription=? ,productThumbnail=? ,productPrice=? ,categoryID=? WHERE productID=?', {
            replacements: [productName, productDescription, productThumbnail, productPrice, categoryID, productID],
            type: sequelize_1.QueryTypes.UPDATE
        });
        return res.status(200).json({ message: "Successfully updated the product." });
    }
    catch (error) {
        console.log(error, "error");
        return res.status(500).json({ error: "Please try again after sometimes!" });
    }
});
exports.updateProduct = updateProduct;
