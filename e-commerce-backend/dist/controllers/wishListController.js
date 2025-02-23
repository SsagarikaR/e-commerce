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
exports.deleteWishListItem = exports.getWishListItemById = exports.getWishListItems = exports.addToWishList = void 0;
const wishLists_1 = require("../services/db/wishLists");
// Controller to add a product to the wishlist
const addToWishList = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { productID } = req.body;
    const userID = req.body.user.identifire;
    try {
        const result = yield (0, wishLists_1.addProductToWishListService)(userID, productID);
        if (!result.success) {
            return next({ statusCode: 403, message: result.message });
        }
        return res.status(201).json({ message: result.message });
    }
    catch (error) {
        console.error(error);
        return next({ statusCode: 500, message: "Server error, please try again" });
    }
});
exports.addToWishList = addToWishList;
// Controller to get all products in the wishlist
const getWishListItems = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userID = req.body.user.identifire;
    try {
        const result = yield (0, wishLists_1.getWishListByUserService)(userID);
        if (!result.success) {
            return next({ statusCode: 404, message: result.message });
        }
        return res.status(200).json(result.wishlist);
    }
    catch (error) {
        console.error(error);
        return next({ statusCode: 500, message: "Server error, please try again" });
    }
});
exports.getWishListItems = getWishListItems;
// Controller to get a specific product in the product by ID
const getWishListItemById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userID = req.body.user.identifire;
    const { id } = req.params;
    try {
        const result = yield (0, wishLists_1.getWishListItemByIDService)(userID, Number(id));
        console.log(result, "Result bro");
        if (!result.success) {
            return next({ statusCode: 404, message: result.message });
        }
        return res.status(200).json(result.wishlistItem);
    }
    catch (error) {
        console.error(error);
        return next({ statusCode: 500, message: "Server error, please try again" });
    }
});
exports.getWishListItemById = getWishListItemById;
// Controller to delete an item from the wishlist
const deleteWishListItem = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { wishListID } = req.body;
    try {
        const result = yield (0, wishLists_1.deleteFromWishListService)(wishListID);
        if (!result.success) {
            return next({ statusCode: 404, message: result.message });
        }
        return res.status(200).json({ message: result.message });
    }
    catch (error) {
        console.error(error);
        return next({ statusCode: 500, message: "Server error, please try again" });
    }
});
exports.deleteWishListItem = deleteWishListItem;
