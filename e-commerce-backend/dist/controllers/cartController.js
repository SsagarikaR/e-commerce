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
exports.updateCartItemQuantity = exports.deleteCartItem = exports.getCartItems = exports.addCartItem = void 0;
const products_1 = require("../services/db/products");
const carts_1 = require("../services/db/carts");
const addCartItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { productID, quantity } = req.body;
    const userID = req.body.user.identifire;
    try {
        const [product] = yield (0, products_1.selectByProductID)(productID);
        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }
        const [existingCartItem] = yield (0, carts_1.selectFromCartByUserANDProduct)(userID, productID);
        if (existingCartItem) {
            yield (0, carts_1.updateQuantityIfAlreadyExist)(userID, productID);
            return res
                .status(200)
                .json({ message: "Product quantity updated in cart" });
        }
        const [newCartItem] = yield (0, carts_1.addNewCartItem)(userID, productID, quantity);
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
        const cartItems = yield (0, carts_1.getCartByUserID)(userID);
        return res.status(200).json(cartItems);
    }
    catch (error) {
        console.log(error, "error");
        return res.status(500).json({ error: "Please try again after sometime!" });
    }
});
exports.getCartItems = getCartItems;
const deleteCartItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { cartItemID } = req.body;
    try {
        const cartItem = yield (0, carts_1.selectFromCartItemCartID)(cartItemID);
        if (cartItem.length === 0) {
            return res.status(404).json({ error: "Cart item not found" });
        }
        yield (0, carts_1.deleteFromCart)(cartItemID);
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
    console.log(req.body);
    try {
        const [cartItem] = yield (0, carts_1.selectFromCartItemCartID)(cartItemID);
        if (!cartItem) {
            return res.status(404).json({ error: "Cart item not found" });
        }
        yield (0, carts_1.updateCartItemsQuantity)(quantity, cartItemID);
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
