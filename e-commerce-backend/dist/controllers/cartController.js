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
/**
 * Controller to add an item to the user's cart
 * */
const addCartItem = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { productID, quantity } = req.body;
    const userID = req.body.user.identifire;
    try {
        // Check if product exists in the database
        const [product] = yield (0, products_1.selectByProductID)(productID);
        if (!product) {
            return next({ statusCode: 404, message: "Product not found" });
        }
        // Check if the product is already in the user's cart
        const [existingCartItem] = yield (0, carts_1.selectFromCartByUserANDProduct)(userID, productID);
        if (existingCartItem) {
            // If the item is already in the cart, update its quantity
            yield (0, carts_1.updateQuantityIfAlreadyExist)(userID, productID);
            return res.status(200).json({ message: "Product quantity updated in cart" });
        }
        // Add new product to the cart
        const [newCartItem] = yield (0, carts_1.addNewCartItem)(userID, productID, quantity);
        return res.status(201).json({
            message: "Product added to cart",
            cartItemID: newCartItem,
        });
    }
    catch (error) {
        // Catch any errors and forward them to the global error handler
        console.error(error);
        return next({ statusCode: 500, message: "Server error, please try again" });
    }
});
exports.addCartItem = addCartItem;
/**
 * Controller to fetch all items in the user's cart
 * */
const getCartItems = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userID = req.body.user.identifire;
    try {
        // Retrieve all cart items for the user
        const cartItems = yield (0, carts_1.getCartByUserID)(userID);
        return res.status(200).json(cartItems);
    }
    catch (error) {
        // Catch any errors and forward them to the global error handler
        console.log(error, "error");
        return next({ statusCode: 500, message: "Please try again after sometime!" });
    }
});
exports.getCartItems = getCartItems;
/**
 *  Controller to delete an item from the user's cart
 * */
const deleteCartItem = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { cartItemID } = req.body;
    try {
        // Check if the cart item exists in the database
        const cartItem = yield (0, carts_1.selectFromCartItemCartID)(cartItemID);
        if (cartItem.length === 0) {
            return next({ statusCode: 404, message: "Cart item not found" });
        }
        // Delete the cart item
        yield (0, carts_1.deleteFromCart)(cartItemID);
        return res.status(200).json({ message: "Cart item deleted successfully" });
    }
    catch (error) {
        // Catch any errors and forward them to the global error handler
        console.error(error);
        return next({ statusCode: 500, message: "Server error, please try again" });
    }
});
exports.deleteCartItem = deleteCartItem;
/**
 *  Controller to update the quantity of an item in the user's cart
 * */
const updateCartItemQuantity = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { quantity, cartItemID } = req.body;
    console.log(req.body);
    try {
        // Check if the cart item exists
        const [cartItem] = yield (0, carts_1.selectFromCartItemCartID)(cartItemID);
        if (!cartItem) {
            return next({ statusCode: 404, message: "Cart item not found" });
        }
        // Update the quantity of the cart item
        yield (0, carts_1.updateCartItemsQuantity)(quantity, cartItemID);
        return res.status(200).json({
            message: "Cart item quantity updated successfully",
        });
    }
    catch (error) {
        // Catch any errors and forward them to the global error handler
        console.error(error);
        return next({ statusCode: 500, message: "Server error, please try again" });
    }
});
exports.updateCartItemQuantity = updateCartItemQuantity;
