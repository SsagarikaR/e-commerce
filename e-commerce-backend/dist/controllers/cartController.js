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
const carts_1 = require("../services/db/carts");
// Controller to add an item to the user's cart
const addCartItem = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { productID, quantity } = req.body;
    const userID = req.body.user.identifire;
    try {
        const result = yield (0, carts_1.addCartItemService)(userID, productID, quantity);
        if (result.success) {
            return res.status(200).json({ message: result.message, cartItemID: result.cartItemID });
        }
        else {
            return next({ statusCode: 400, message: result.message });
        }
    }
    catch (error) {
        console.error(error);
        return next({ statusCode: 500, message: "An error occurred while adding the item to the cart" });
    }
});
exports.addCartItem = addCartItem;
// Controller to get all items in the user's cart
const getCartItems = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userID = req.body.user.identifire;
    try {
        const result = yield (0, carts_1.getCartItemsService)(userID);
        return res.status(200).json(result.cartItems);
    }
    catch (error) {
        console.error(error);
        return next({ statusCode: 500, message: "An error occurred while fetching the cart items" });
    }
});
exports.getCartItems = getCartItems;
// Controller to delete an item from the user's cart
const deleteCartItem = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { cartItemID } = req.body;
    try {
        const result = yield (0, carts_1.deleteCartItemService)(cartItemID);
        if (result.success) {
            return res.status(200).json({ message: result.message });
        }
        else {
            return next({ statusCode: 404, message: result.message });
        }
    }
    catch (error) {
        console.error(error);
        return next({ statusCode: 500, message: "An error occurred while deleting the cart item" });
    }
});
exports.deleteCartItem = deleteCartItem;
// Controller to update the quantity of an item in the user's cart
const updateCartItemQuantity = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { quantity, cartItemID } = req.body;
    try {
        const result = yield (0, carts_1.updateCartItemQuantityService)(quantity, cartItemID);
        if (result.success) {
            return res.status(200).json({ message: result.message });
        }
        else {
            return next({ statusCode: 404, message: result.message });
        }
    }
    catch (error) {
        console.error(error);
        return next({ statusCode: 500, message: "An error occurred while updating the cart item quantity" });
    }
});
exports.updateCartItemQuantity = updateCartItemQuantity;
