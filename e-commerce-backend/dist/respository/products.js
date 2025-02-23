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
exports.getProductWithCondition = exports.createNewProduct = exports.selectByProductID = exports.deleteByProductID = exports.updateProducts = exports.selectProductWithAllMatch = void 0;
const databse_1 = require("../config/databse");
const sequelize_1 = require("sequelize");
const selectProductWithAllMatch = (productName, productDescription, productPrice, categoryID, brandID) => __awaiter(void 0, void 0, void 0, function* () {
    return yield databse_1.sequelize.query("SELECT * FROM Products WHERE productName=? AND productDescription=?  AND productPrice=? AND categoryID=? AND brandID=?", {
        replacements: [productName, productDescription, productPrice, categoryID, brandID],
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
const createNewProduct = (productName, productDescription, productThumbnail, productPrice, categoryID, brandID, stock) => __awaiter(void 0, void 0, void 0, function* () {
    return yield databse_1.sequelize.query("INSERT INTO Products (productName,productDescription,productThumbnail,productPrice,categoryID,brandID,stock) VALUES (?,?,?,?,?,?,?)", {
        replacements: [
            productName,
            productDescription,
            productThumbnail,
            productPrice,
            categoryID,
            brandID,
            stock
        ],
        type: sequelize_1.QueryTypes.INSERT,
    });
});
exports.createNewProduct = createNewProduct;
const getProductWithCondition = (_a, page_1, limit_1) => __awaiter(void 0, [_a, page_1, limit_1], void 0, function* ({ categoryID, name, id, price, }, page, limit) {
    // Base query for products
    let query = `
    SELECT p.*, c.*, b.*, COUNT(*) OVER() AS totalCount
    FROM Products p
    LEFT JOIN Categories c ON p.categoryID = c.categoryID
    LEFT JOIN Brands b ON p.brandID = b.brandID
  `;
    let replacements = [];
    let conditions = [];
    // Apply conditions for filtering products
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
    // Add conditions to the query if any filters are provided
    if (conditions.length > 0) {
        query += ` WHERE ` + conditions.join(" AND ");
    }
    // Add sorting based on price if provided
    if (price) {
        if (price === "low-to-high") {
            query += ` ORDER BY p.productPrice ASC`;
        }
        else if (price === "high-to-low") {
            query += ` ORDER BY p.productPrice DESC`;
        }
    }
    // Pagination logic (LIMIT and OFFSET)
    query += ` LIMIT ? OFFSET ?`;
    replacements.push(limit, (page - 1) * limit);
    console.log(query, "query");
    console.log(replacements, "replacements");
    // Execute the query to fetch products
    const result = yield databse_1.sequelize.query(query, {
        replacements: replacements,
        type: sequelize_1.QueryTypes.SELECT,
    });
    // Extract the totalCount from the first result (since it's the same for all rows)
    return result;
});
exports.getProductWithCondition = getProductWithCondition;
