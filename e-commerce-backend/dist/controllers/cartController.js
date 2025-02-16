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
exports.updateCartItemQuantity = exports.deleteCartItem = exports.checkCart = exports.getCartItems = exports.addCartItem = void 0;
const databse_1 = require("../config/databse");
const sequelize_1 = require("sequelize");
const addCartItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { productID, quantity } = req.body;
    const userID = req.body.user.identifire;
    try {
        const [product] = yield databse_1.sequelize.query("SELECT * FROM Products WHERE productID = :productID", {
            replacements: { productID },
            type: sequelize_1.QueryTypes.SELECT,
        });
        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }
        const [existingCartItem] = yield databse_1.sequelize.query("SELECT * FROM CartItems WHERE userID = ? AND productID = ?", {
            replacements: [userID, productID],
            type: sequelize_1.QueryTypes.SELECT,
        });
        if (existingCartItem) {
            yield databse_1.sequelize.query("UPDATE CartItems SET quantity = quantity + 1 WHERE userID = :userID AND productID = :productID", {
                replacements: { userID, productID },
                type: sequelize_1.QueryTypes.UPDATE,
            });
            return res
                .status(200)
                .json({ message: "Product quantity updated in cart" });
        }
        const [newCartItem] = yield databse_1.sequelize.query("INSERT INTO CartItems (userID, productID, quantity) VALUES (:userID, :productID, :quantity)", {
            replacements: { userID, productID, quantity: quantity || 1 },
            type: sequelize_1.QueryTypes.INSERT,
        });
        return res.status(201).json({
            message: "Product added to cart",
            cartItemID: newCartItem,
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Server error, please try again" });
    }
});
exports.addCartItem = addCartItem;
const getCartItems = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userID = req.body.user.identifire;
    try {
        const cartItems = yield databse_1.sequelize.query(`
        SELECT ci.cartItemID, ci.quantity, p.productID, p.productName, p.productDescription, p.productThumbnail, p.productPrice, c.categoryName,
        (SELECT SUM(ci2.quantity * p2.productPrice) 
        FROM CartItems ci2 
        JOIN Products p2 ON ci2.productID = p2.productID 
        WHERE ci2.userID = ?) AS totalPrice
        FROM CartItems ci
        JOIN Products p ON ci.productID = p.productID
        JOIN Categories c ON p.categoryID = c.categoryID
        WHERE ci.userID = ? 
      `, {
            replacements: [userID, userID],
            type: sequelize_1.QueryTypes.SELECT,
        });
        return res.status(200).json(cartItems);
    }
    catch (error) {
        console.log(error, "error");
        return res.status(500).json({ error: "Please try again after sometime!" });
    }
});
exports.getCartItems = getCartItems;
const checkCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const Response = yield databse_1.sequelize.query(`SELECT *`);
});
exports.checkCart = checkCart;
const deleteCartItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { cartItemID } = req.body;
    try {
        const cartItem = yield databse_1.sequelize.query("SELECT * FROM CartItems WHERE cartItemID = ?", {
            replacements: [cartItemID],
            type: sequelize_1.QueryTypes.SELECT,
        });
        if (cartItem.length === 0) {
            return res.status(404).json({ error: "Cart item not found" });
        }
        yield databse_1.sequelize.query("DELETE FROM CartItems WHERE cartItemID = :cartItemID", {
            replacements: { cartItemID },
            type: sequelize_1.QueryTypes.DELETE,
        });
        return res.status(200).json({ message: "Cart item deleted successfully" });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Server error, please try again" });
    }
});
exports.deleteCartItem = deleteCartItem;
const updateCartItemQuantity = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { quantity, cartItemID } = req.body;
    try {
        const [cartItem] = yield databse_1.sequelize.query("SELECT * FROM CartItems WHERE cartItemID = :cartItemID", {
            replacements: { cartItemID },
            type: sequelize_1.QueryTypes.SELECT,
        });
        if (!cartItem) {
            return res.status(404).json({ error: "Cart item not found" });
        }
        yield databse_1.sequelize.query("UPDATE CartItems SET quantity = :quantity WHERE cartItemID = :cartItemID", {
            replacements: { quantity, cartItemID },
            type: sequelize_1.QueryTypes.UPDATE,
        });
        return res.status(200).json({
            message: "Cart item quantity updated successfully",
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Server error, please try again" });
    }
});
exports.updateCartItemQuantity = updateCartItemQuantity;
