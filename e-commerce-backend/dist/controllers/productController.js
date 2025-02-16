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
    const { productName, productDescription, productThumbnail, productPrice, categoryID } = req.body;
    try {
        if (productName === "" || productName === undefined || !productName) {
            return res.status(404).json({ error: "Product's name can't be empty" });
        }
        if (productDescription === "" || productDescription === undefined || !productDescription) {
            return res.status(404).json({ error: "Product's description can't be empty" });
        }
        if (productThumbnail === "" || productThumbnail === undefined || !productThumbnail) {
            return res.status(404).json({ error: "Product's thumbnail No. can't be empty." });
        }
        if (productPrice === "" || productPrice === undefined || !productPrice) {
            return res.status(404).json({ error: "Product's price role can't be empty." });
        }
        if (categoryID === "" || categoryID === undefined || !categoryID) {
            return res.status(404).json({ error: "Please choose a category role can't be empty." });
        }
        const isProductExist = yield databse_1.sequelize.query('SELECT * FROM Products WHERE productName=? AND productDescription=?  AND productPrice=? AND categoryID=?', {
            replacements: [productName, productDescription, productPrice, categoryID],
            type: sequelize_1.QueryTypes.SELECT
        });
        if (isProductExist.length > 0) {
            return res.status(403).json({ error: "This product already exist." });
        }
        const [result, metaData] = yield databse_1.sequelize.query('INSERT INTO Products (productName,productDescription,productThumbnail,productPrice,categoryID) VALUES (?,?,?,?,?)', {
            replacements: [productName, productDescription, productThumbnail, productPrice, categoryID],
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
    const { name, price, categoryID, id } = req.query;
    console.log(req.query);
    try {
        let query = `
      SELECT *
      FROM Products p
      LEFT JOIN Categories c ON p.categoryID = c.categoryID
    `;
        let replacements = [];
        let conditions = [];
        if (categoryID) {
            conditions.push(`p.categoryID = ?`);
            replacements.push(categoryID);
        }
        if (name) {
            conditions.push(`p.productName LIKE ?`);
            replacements.push(`%${name}%`);
        }
        if (id) {
            conditions.push(`p.productID = ?`);
            replacements.push(id);
        }
        if (conditions.length > 0) {
            query += ` WHERE ` + conditions.join(" AND ");
        }
        if (price) {
            if (price === "low-to-high") {
                query += ` ORDER BY p.productPrice ASC`;
            }
            else if (price === "high-to-low") {
                query += ` ORDER BY p.productPrice DESC`;
            }
        }
        const products = yield databse_1.sequelize.query(query, {
            replacements: replacements,
            type: sequelize_1.QueryTypes.SELECT,
        });
        if (products.length === 0) {
            return res.status(404).json({ message: "No products found" });
        }
        return res.status(200).json(products);
    }
    catch (error) {
        console.log(error, "error");
        return res.status(500).json({ error: "Please try again after sometime!" });
    }
});
exports.getProducts = getProducts;
const deleteProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("data", req.body);
    const { productID } = req.body;
    try {
        const isProductExist = yield databse_1.sequelize.query('SELECT * FROM Products WHERE productID=?', {
            replacements: [productID],
            type: sequelize_1.QueryTypes.SELECT
        });
        if (isProductExist.length === 0) {
            return res.status(404).json({ error: "This product doesn't exist" });
        }
        console.log(req.body);
        const deleteProduct = yield databse_1.sequelize.query('DELETE FROM Products WHERE productID=?', {
            replacements: [productID],
            type: sequelize_1.QueryTypes.DELETE
        });
        return res.status(200).json({ message: "Successfully deletd the product" });
    }
    catch (error) {
        console.log(req);
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
