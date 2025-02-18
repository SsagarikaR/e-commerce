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
exports.getProductWithCondition = exports.createNewProduct = exports.selectProductPerPage = exports.selectByProductID = exports.deleteByProductID = exports.updateProducts = exports.selectProductWithAllMatch = void 0;
const databse_1 = require("../../config/databse");
const sequelize_1 = require("sequelize");
const selectProductWithAllMatch = (productName, productDescription, productPrice, categoryID) => __awaiter(void 0, void 0, void 0, function* () {
    return yield databse_1.sequelize.query("SELECT * FROM Products WHERE productName=? AND productDescription=?  AND productPrice=? AND categoryID=?", {
        replacements: [productName, productDescription, productPrice, categoryID],
        type: sequelize_1.QueryTypes.SELECT,
    });
});
exports.selectProductWithAllMatch = selectProductWithAllMatch;
const updateProducts = (productName, productDescription, productThumbnail, productPrice, categoryID, productID) => __awaiter(void 0, void 0, void 0, function* () {
    return yield databse_1.sequelize.query('UPDATE Products SET productName=? ,productDescription=? ,productThumbnail=? ,productPrice=? ,categoryID=? WHERE productID=?', {
        replacements: [productName, productDescription, productThumbnail, productPrice, categoryID, productID],
        type: sequelize_1.QueryTypes.UPDATE
    });
});
exports.updateProducts = updateProducts;
const deleteByProductID = (productID) => __awaiter(void 0, void 0, void 0, function* () {
    return yield databse_1.sequelize.query('DELETE FROM Products WHERE productID=?', {
        replacements: [productID],
        type: sequelize_1.QueryTypes.DELETE
    });
});
exports.deleteByProductID = deleteByProductID;
const selectByProductID = (productID) => __awaiter(void 0, void 0, void 0, function* () {
    return yield databse_1.sequelize.query('SELECT * FROM Products WHERE productID=?', {
        replacements: [productID],
        type: sequelize_1.QueryTypes.SELECT
    });
});
exports.selectByProductID = selectByProductID;
const selectProductPerPage = (offset, limit) => __awaiter(void 0, void 0, void 0, function* () {
    return yield databse_1.sequelize.query("SELECT * FROM Products LIMIT ? OFFSET ?", {
        replacements: [limit, offset],
        type: sequelize_1.QueryTypes.SELECT
    });
});
exports.selectProductPerPage = selectProductPerPage;
const createNewProduct = (productName, productDescription, productThumbnail, productPrice, categoryID) => __awaiter(void 0, void 0, void 0, function* () {
    return yield databse_1.sequelize.query("INSERT INTO Products (productName,productDescription,productThumbnail,productPrice,categoryID) VALUES (?,?,?,?,?)", {
        replacements: [
            productName,
            productDescription,
            productThumbnail,
            productPrice,
            categoryID,
        ],
        type: sequelize_1.QueryTypes.INSERT,
    });
});
exports.createNewProduct = createNewProduct;
const getProductWithCondition = (_a) => __awaiter(void 0, [_a], void 0, function* ({ categoryID, name, id, price, }) {
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
    return yield databse_1.sequelize.query(query, {
        replacements: replacements,
        type: sequelize_1.QueryTypes.SELECT,
    });
});
exports.getProductWithCondition = getProductWithCondition;
