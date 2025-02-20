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
exports.deleteFromWishList = exports.selectFromWishListByID = exports.getWishListByUserID = exports.addProductToWishList = exports.selectByUserAndProduct = void 0;
const databse_1 = require("../../config/databse");
const sequelize_1 = require("sequelize");
const selectByUserAndProduct = (userID, productID) => __awaiter(void 0, void 0, void 0, function* () {
    return yield databse_1.sequelize.query('SELECT * FROM WishLists WHERE userID=? and productID=?', {
        replacements: [userID, productID],
        type: sequelize_1.QueryTypes.SELECT
    });
});
exports.selectByUserAndProduct = selectByUserAndProduct;
const addProductToWishList = (userID, productID) => __awaiter(void 0, void 0, void 0, function* () {
    return yield databse_1.sequelize.query('Insert INTO WishLists (userID,productID) VALUES (?,?)', {
        replacements: [userID, productID],
        type: sequelize_1.QueryTypes.INSERT
    });
});
exports.addProductToWishList = addProductToWishList;
const getWishListByUserID = (userID) => __awaiter(void 0, void 0, void 0, function* () {
    return yield databse_1.sequelize.query(`
        SELECT 
          wl.wishListID, 
          p.productID, 
          p.productName, 
          p.productDescription, 
          p.productThumbnail, 
          p.productPrice, 
          c.categoryName,
          br.brandID,
          br.brandThumbnail
        FROM WishLists wl
        JOIN Products p ON wl.productID = p.productID
        JOIN Categories c ON p.categoryID = c.categoryID
        JOIN Brands br ON br.brandID = p.brandID
        WHERE wl.userID = ? 
      `, {
        replacements: [userID],
        type: sequelize_1.QueryTypes.SELECT,
    });
});
exports.getWishListByUserID = getWishListByUserID;
const selectFromWishListByID = (wishListID) => __awaiter(void 0, void 0, void 0, function* () {
    return yield databse_1.sequelize.query('SELECT * FROM WishLists WHERE WishListID=?', {
        replacements: [wishListID],
        type: sequelize_1.QueryTypes.SELECT
    });
});
exports.selectFromWishListByID = selectFromWishListByID;
const deleteFromWishList = (wishListID) => __awaiter(void 0, void 0, void 0, function* () {
    return yield databse_1.sequelize.query('DELETE FROM WishLists WHERE WishListID=?', {
        replacements: [wishListID],
        type: sequelize_1.QueryTypes.DELETE
    });
});
exports.deleteFromWishList = deleteFromWishList;
