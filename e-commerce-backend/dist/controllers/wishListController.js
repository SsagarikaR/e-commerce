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
const products_1 = require("../services/db/products");
const wishLists_1 = require("../services/db/wishLists");
//  Controller to add an item to the user's wishlist
const addToWishList = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { productID } = req.body;
    const userID = req.body.user.identifire;
    try {
        const [product] = yield (0, products_1.selectByProductID)(productID);
        if (!product) {
            return next({ statusCode: 404, message: "Product not found" });
        }
        const existingCartItem = yield (0, wishLists_1.selectByUserAndProduct)(userID, productID);
        if (existingCartItem.length !== 0) {
            return next({ statusCode: 403, message: "The item alraedy exists in the cart." });
        }
        const [result, metaData] = yield (0, wishLists_1.addProductToWishList)(userID, productID);
        return res.status(201).json({ message: "Successfully added the product to cart." });
    }
    catch (error) {
        console.error(error);
        return next({ statusCode: 500, message: "Error in adding item to wish list, please try again" });
    }
});
exports.addToWishList = addToWishList;
// Controller to fetch all items in the users wish list
const getWishListItems = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userID = req.body.user.identifire;
    try {
        const wishlist = yield (0, wishLists_1.getWishListByUserID)(userID);
        console.log(wishlist);
        if (wishlist.length === 0) {
            return next({ statusCode: 404, message: "No item found." });
        }
        else {
            return res.status(200).json(wishlist);
        }
    }
    catch (error) {
        console.log(error, "error");
        return next({ statusCode: 500, message: "Error in fetching item from wish list, please try again" });
    }
});
exports.getWishListItems = getWishListItems;
const getWishListItemById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userID = req.body.user.identifire;
    const { id } = req.params;
    try {
        const isWishlist = yield (0, wishLists_1.selectByUserAndProduct)(userID, Number(id));
        // console.log("wishlist",isWishlist)
        if (isWishlist.length === 0) {
            return next({ statusCode: 404, message: "No item found." });
        }
        else {
            return res.status(200).json(isWishlist);
        }
    }
    catch (error) {
        console.log(error, "error");
        return next({ statusCode: 500, message: "Error in fetching item from wish list, please try again" });
    }
});
exports.getWishListItemById = getWishListItemById;
// Controller to delete an item from the user's wishlist
const deleteWishListItem = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { wishListID } = req.body;
    try {
        const wishlist = yield (0, wishLists_1.selectFromWishListByID)(wishListID);
        if (wishlist.length === 0) {
            return next({ statusCode: 404, message: "This item is not exist in the list" });
        }
        yield (0, wishLists_1.deleteFromWishList)(wishListID);
        return res.status(200).json({ message: "Successfully deleted the item from the list" });
    }
    catch (error) {
        console.error(error);
        return next({ statusCode: 500, message: "Server error, please try again" });
    }
});
exports.deleteWishListItem = deleteWishListItem;
