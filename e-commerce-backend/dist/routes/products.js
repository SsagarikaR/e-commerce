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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const productController_1 = require("../controllers/productController");
const authorization_1 = require("../middlewear/authorization");
const router = express_1.default.Router();
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
 * /products:
 *   post:
 *     summary: Create a new product
 *     tags: [Product]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - productName
 *               - productDescription
 *               - productThumbnail
 *               - productPrice
 *               - categoryID
 *             properties:
 *               productName: { type: string }
 *               productDescription: { type: string }
 *               productThumbnail: { type: string }
 *               productPrice: { type: number }
 *               categoryID: { type: integer }
 *     responses:
 *       201:
 *         description: Product created successfully
 *       403:
 *         description: Product already exists
 *       500:
 *         description: Server error
 */
router.post("/", authorization_1.checkToken, authorization_1.isAdmin, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    (0, productController_1.createProduct)(req, res, next);
}));
/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get a list of products
 *     tags: [Product]
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Filter by product name
 *       - in: query
 *         name: price
 *         schema:
 *           type: string
 *           enum: [low-to-high, high-to-low]
 *         description: Sort products by price
 *       - in: query
 *         name: categoryID
 *         schema:
 *           type: integer
 *         description: Filter by category ID
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         description: Filter by product ID
 *     responses:
 *       200:
 *         description: List of products
 *       404:
 *         description: No products found
 *       500:
 *         description: Server error
 */
router.get("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    (0, productController_1.getProducts)(req, res, next);
}));
/**
 * @swagger
 * /products:
 *   delete:
 *     summary: Delete a product
 *     tags: [Product]
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
 *               productID: { type: integer }
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *       404:
 *         description: Product not found
 *       500:
 *         description: Server error
 */
router.delete("/", authorization_1.checkToken, authorization_1.isAdmin, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    (0, productController_1.deleteProducts)(req, res, next);
}));
/**
 * @swagger
 * /products:
 *   patch:
 *     summary: Update product details
 *     tags: [Product]
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
 *               - productName
 *               - productDescription
 *               - productThumbnail
 *               - productPrice
 *               - categoryID
 *             properties:
 *               productID: { type: integer }
 *               productName: { type: string }
 *               productDescription: { type: string }
 *               productThumbnail: { type: string }
 *               productPrice: { type: number }
 *               categoryID: { type: integer }
 *     responses:
 *       200:
 *         description: Product updated successfully
 *       403:
 *         description: Product not found
 *       500:
 *         description: Server error
 */
router.patch("/", authorization_1.checkToken, authorization_1.isAdmin, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    (0, productController_1.updateProduct)(req, res, next);
}));
exports.default = router;
