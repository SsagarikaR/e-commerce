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
exports.deleteFromWishListService = exports.getWishListItemByIDService = exports.getWishListByUserService = exports.addProductToWishListService = void 0;
const wishLists_1 = require("../../respository/wishLists");
// Service to add a product to the wishlist
const addProductToWishListService = (userID, productID) => __awaiter(void 0, void 0, void 0, function* () {
    const existingItem = yield (0, wishLists_1.selectByUserAndProduct)(userID, productID);
    if (existingItem.length !== 0) {
        return { success: false, message: "Product already exists in the wishlist." };
    }
    const [result] = yield (0, wishLists_1.addProductToWishList)(userID, productID);
    if (result) {
        return { success: true, message: "Product added to wishlist." };
    }
    return { success: false, message: "Failed to add product to wishlist." };
});
exports.addProductToWishListService = addProductToWishListService;
// Service to get all wishlist items for a user
const getWishListByUserService = (userID) => __awaiter(void 0, void 0, void 0, function* () {
    const wishlist = yield (0, wishLists_1.getWishListByUserID)(userID);
    if (wishlist.length === 0) {
        return { success: false, message: "No items in wishlist." };
    }
    return { success: true, wishlist };
});
exports.getWishListByUserService = getWishListByUserService;
// Service to get a specific wishlist item by user and product id
const getWishListItemByIDService = (userID, productID) => __awaiter(void 0, void 0, void 0, function* () {
    const wishlistItem = yield (0, wishLists_1.selectByUserAndProduct)(userID, productID);
    console.log(wishlistItem, "why why");
    if (wishlistItem.length === 0) {
        return { success: false, message: "Wishlist item not found." };
    }
    return { success: true, wishlistItem };
});
exports.getWishListItemByIDService = getWishListItemByIDService;
// Service to remove an item from the wishlist
const deleteFromWishListService = (wishListID) => __awaiter(void 0, void 0, void 0, function* () {
    const wishlistItem = yield (0, wishLists_1.selectFromWishListByID)(wishListID);
    if (wishlistItem.length === 0) {
        return { success: false, message: "Wishlist item not found." };
    }
    yield (0, wishLists_1.deleteFromWishList)(wishListID);
    return { success: true, message: "Product removed from wishlist." };
});
exports.deleteFromWishListService = deleteFromWishListService;
