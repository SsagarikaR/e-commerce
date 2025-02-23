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
const express_1 = require("express");
const authentication_1 = require("../middlewear/authentication");
const wishListController_1 = require("../controllers/wishListController");
const router = (0, express_1.Router)();
/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *
 * securityDefinitions:
 *   authorization:
 *     type: apiKey
 *     in: header
 *     name: Authorization
 *     description: "JWT Token required for authentication"
 */
/**
 * @swagger
 * /wishlist:
 *   post:
 *     summary: Add a product to the user's wishlist
 *     tags: [WishList]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - productID
 *             properties:
 *               productID:
 *                 type: integer
 *                 description: The ID of the product to add to the wishlist
 *     responses:
 *       201:
 *         description: Product added to wishlist successfully
 *       403:
 *         description: Unable to add product to wishlist (product already in wishlist or other errors)
 *       500:
 *         description: Server error
 */
router.post("/", authentication_1.checkToken, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    (0, wishListController_1.addToWishList)(req, res, next);
}));
/**
 * @swagger
 * /wishlist/{id}:
 *   get:
 *     summary: Get a specific product in the wishlist by ID
 *     tags: [WishList]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the product to fetch from the wishlist
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Wishlist item retrieved successfully
 *       404:
 *         description: Wishlist item not found
 *       500:
 *         description: Server error
 */
router.get("/:id", authentication_1.checkToken, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    (0, wishListController_1.getWishListItemById)(req, res, next);
}));
/**
 * @swagger
 * /wishlist:
 *   get:
 *     summary: Get all products in the user's wishlist
 *     tags: [WishList]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of products in the wishlist
 *       404:
 *         description: No products found in the wishlist
 *       500:
 *         description: Server error
 */
router.get("/", authentication_1.checkToken, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    (0, wishListController_1.getWishListItems)(req, res, next);
}));
/**
 * @swagger
 * /wishlist:
 *   delete:
 *     summary: Delete an item from the user's wishlist
 *     tags: [WishList]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - wishListID
 *             properties:
 *               wishListID:
 *                 type: integer
 *                 description: The ID of the wishlist item to delete
 *     responses:
 *       200:
 *         description: Wishlist item deleted successfully
 *       404:
 *         description: Wishlist item not found
 *       500:
 *         description: Server error
 */
router.delete("/", authentication_1.checkToken, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    (0, wishListController_1.deleteWishListItem)(req, res, next);
}));
exports.default = router;
