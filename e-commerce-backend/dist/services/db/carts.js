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
exports.updateCartItemsQuantity = exports.deleteFromCart = exports.selectFromCartItemCartID = exports.getCartByUserID = exports.addNewCartItem = exports.updateQuantityIfAlreadyExist = exports.selectFromCartByUserANDProduct = void 0;
const databse_1 = require("../../config/databse");
const sequelize_1 = require("sequelize");
const selectFromCartByUserANDProduct = (userID, productID) => __awaiter(void 0, void 0, void 0, function* () {
    return yield databse_1.sequelize.query("SELECT * FROM CartItems WHERE userID = ? AND productID = ?", {
        replacements: [userID, productID],
        type: sequelize_1.QueryTypes.SELECT,
    });
});
exports.selectFromCartByUserANDProduct = selectFromCartByUserANDProduct;
const updateQuantityIfAlreadyExist = (userID, productID) => __awaiter(void 0, void 0, void 0, function* () {
    return yield databse_1.sequelize.query("UPDATE CartItems SET quantity = quantity + 1 WHERE userID = :userID AND productID = :productID", {
        replacements: { userID, productID },
        type: sequelize_1.QueryTypes.UPDATE,
    });
});
exports.updateQuantityIfAlreadyExist = updateQuantityIfAlreadyExist;
const addNewCartItem = (userID, productID, quantity) => __awaiter(void 0, void 0, void 0, function* () {
    return yield databse_1.sequelize.query("INSERT INTO CartItems (userID, productID, quantity) VALUES (:userID, :productID, :quantity)", {
        replacements: { userID, productID, quantity: quantity || 1 },
        type: sequelize_1.QueryTypes.INSERT,
    });
});
exports.addNewCartItem = addNewCartItem;
const getCartByUserID = (userID) => __awaiter(void 0, void 0, void 0, function* () {
    return yield databse_1.sequelize.query(`
            SELECT ci.cartItemID, ci.quantity, p.productID, p.productName, p.productDescription, p.productThumbnail, p.productPrice, c.categoryName,br.brandID,br.brandThumbnail,
            (SELECT SUM(ci2.quantity * p2.productPrice) 
            FROM CartItems ci2 
            JOIN Products p2 ON ci2.productID = p2.productID 
            WHERE ci2.userID = ?) AS totalPrice
            FROM CartItems ci
            JOIN Products p ON ci.productID = p.productID
            JOIN Categories c ON p.categoryID = c.categoryID
            JOIN Brands br ON br.brandID = p.brandID
            WHERE ci.userID = ? 
          `, {
        replacements: [userID, userID],
        type: sequelize_1.QueryTypes.SELECT,
    });
});
exports.getCartByUserID = getCartByUserID;
const selectFromCartItemCartID = (cartItemID) => __awaiter(void 0, void 0, void 0, function* () {
    return yield databse_1.sequelize.query("SELECT * FROM CartItems WHERE cartItemID = ?", {
        replacements: [cartItemID],
        type: sequelize_1.QueryTypes.SELECT,
    });
});
exports.selectFromCartItemCartID = selectFromCartItemCartID;
const deleteFromCart = (cartItemID) => __awaiter(void 0, void 0, void 0, function* () {
    return yield databse_1.sequelize.query("DELETE FROM CartItems WHERE cartItemID = :cartItemID", {
        replacements: { cartItemID },
        type: sequelize_1.QueryTypes.DELETE,
    });
});
exports.deleteFromCart = deleteFromCart;
const updateCartItemsQuantity = (quantity, cartItemID) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(quantity);
    return yield databse_1.sequelize.query("UPDATE CartItems SET quantity =? WHERE cartItemID =?", {
        replacements: [quantity, cartItemID],
        type: sequelize_1.QueryTypes.UPDATE,
    });
});
exports.updateCartItemsQuantity = updateCartItemsQuantity;
