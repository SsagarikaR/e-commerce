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
exports.updateCartItemQuantityService = exports.deleteCartItemService = exports.getCartItemsService = exports.addCartItemService = void 0;
const carts_1 = require("../../respository/carts");
// Service to add an item to the cart
const addCartItemService = (userID, productID, quantity) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Check if the product already exists in the cart
        const existingCartItem = yield (0, carts_1.selectFromCartByUserANDProduct)(userID, productID);
        if (existingCartItem.length > 0) {
            yield (0, carts_1.updateQuantityIfAlreadyExist)(userID, productID);
            return { success: true, message: "Product quantity updated in cart" };
        }
        // Add new item to the cart
        const result = yield (0, carts_1.addNewCartItem)(userID, productID, quantity);
        return { success: true, message: "Product added to cart", cartItemID: result[0] };
    }
    catch (error) {
        console.error(error);
        throw new Error("An error occurred while adding the item to the cart");
    }
});
exports.addCartItemService = addCartItemService;
// Service to get all cart items by user
const getCartItemsService = (userID) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cartItems = yield (0, carts_1.getCartByUserID)(userID);
        return { success: true, cartItems };
    }
    catch (error) {
        console.error(error);
        throw new Error("An error occurred while fetching the cart items");
    }
});
exports.getCartItemsService = getCartItemsService;
// Service to delete an item from the cart
const deleteCartItemService = (cartItemID) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cartItem = yield (0, carts_1.selectFromCartItemCartID)(cartItemID);
        if (cartItem.length === 0) {
            return { success: false, message: "Cart item not found" };
        }
        yield (0, carts_1.deleteFromCart)(cartItemID);
        return { success: true, message: "Cart item deleted successfully" };
    }
    catch (error) {
        console.error(error);
        throw new Error("An error occurred while deleting the cart item");
    }
});
exports.deleteCartItemService = deleteCartItemService;
// Service to update the quantity of an item in the cart
const updateCartItemQuantityService = (quantity, cartItemID) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cartItem = yield (0, carts_1.selectFromCartItemCartID)(cartItemID);
        if (cartItem.length === 0) {
            return { success: false, message: "Cart item not found" };
        }
        yield (0, carts_1.updateCartItemsQuantity)(quantity, cartItemID);
        return { success: true, message: "Cart item quantity updated successfully" };
    }
    catch (error) {
        console.error(error);
        throw new Error("An error occurred while updating the cart item quantity");
    }
});
exports.updateCartItemQuantityService = updateCartItemQuantityService;
