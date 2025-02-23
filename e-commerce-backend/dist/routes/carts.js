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
const cartController_1 = require("../controllers/cartController"); // Import the controller functions
const authentication_1 = require("../middlewear/authentication");
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
 * /cart:
 *   post:
 *     summary: Add an item to the cart
 *     tags: [Cart]
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
 *               - quantity
 *             properties:
 *               productID: { type: integer }
 *               quantity: { type: integer }
 *     responses:
 *       201:
 *         description: Product added to cart
 *       404:
 *         description: Product not found
 *       500:
 *         description: Server error
 */
router.post("/", authentication_1.checkToken, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    (0, cartController_1.addCartItem)(req, res, next);
}));
/**
 * @swagger
 * /cart:
 *   get:
 *     summary: Get all cart items for the authenticated user
 *     tags: [Cart]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of cart items
 *       500:
 *         description: Server error
 */
router.get("/", authentication_1.checkToken, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    (0, cartController_1.getCartItems)(req, res, next);
}));
/**
 * @swagger
 * /cart:
 *   delete:
 *     summary: Delete an item from the cart
 *     tags: [Cart]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - cartItemID
 *             properties:
 *               cartItemID: { type: integer }
 *     responses:
 *       200:
 *         description: Cart item deleted successfully
 *       404:
 *         description: Cart item not found
 *       500:
 *         description: Server error
 */
router.delete("/", authentication_1.checkToken, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    (0, cartController_1.deleteCartItem)(req, res, next);
}));
/**
 * @swagger
 * /cart:
 *   patch:
 *     summary: Update the quantity of an item in the cart
 *     tags: [Cart]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - cartItemID
 *               - quantity
 *             properties:
 *               cartItemID: { type: integer }
 *               quantity: { type: integer }
 *     responses:
 *       200:
 *         description: Cart item quantity updated successfully
 *       404:
 *         description: Cart item not found
 *       500:
 *         description: Server error
 */
router.patch("/", authentication_1.checkToken, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    (0, cartController_1.updateCartItemQuantity)(req, res, next);
}));
exports.default = router;
