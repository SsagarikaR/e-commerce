"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authentication_1 = require("../middlewear/authentication");
const orderController_1 = require("../controllers/orderController");
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
 * /orders:
 *   post:
 *     summary: Create a new order
 *     tags: [Order]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - totalAmount
 *               - items
 *               - address
 *             properties:
 *               totalAmount:
 *                 type: number
 *                 description: Total amount for the order
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     productID:
 *                       type: integer
 *                       description: The ID of the product
 *                     quantity:
 *                       type: integer
 *                       description: Quantity of the product
 *               address:
 *                 type: string
 *                 description: Shipping address for the order
 *     responses:
 *       201:
 *         description: Order created successfully
 *       400:
 *         description: Missing required fields (totalAmount, items, or address)
 *       401:
 *         description: Unauthorized, user needs to be logged in
 *       500:
 *         description: Server error
 */
router.post("/", authentication_1.checkToken, (req, res, next) => {
    (0, orderController_1.createOrder)(req, res, next);
});
/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Fetch all orders for the authenticated user
 *     tags: [Order]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of orders retrieved successfully
 *       404:
 *         description: No orders found for the user
 *       401:
 *         description: Unauthorized, user needs to be logged in
 *       500:
 *         description: Server error
 */
router.get("/", authentication_1.checkToken, (req, res, next) => {
    (0, orderController_1.fetchUserOrders)(req, res, next);
});
/**
 * @swagger
 * /orders:
 *   patch:
 *     summary: Update the shipping address of an order
 *     tags: [Order]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - orderId
 *               - productId
 *               - newAddress
 *             properties:
 *               orderId:
 *                 type: integer
 *                 description: The ID of the order to update
 *               productId:
 *                 type: integer
 *                 description: The ID of the product in the order
 *               newAddress:
 *                 type: string
 *                 description: The new shipping address
 *     responses:
 *       200:
 *         description: Order address updated successfully
 *       400:
 *         description: Missing fields or invalid order ID
 *       401:
 *         description: Unauthorized, user needs to be logged in
 *       500:
 *         description: Server error
 */
router.patch("/", authentication_1.checkToken, (req, res, next) => {
    (0, orderController_1.updateOrderAddress)(req, res, next);
});
/**
 * @swagger
 * /orders/status:
 *   patch:
 *     summary: Update the status of an order to "Cancelled"
 *     tags: [Order]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - orderId
 *             properties:
 *               orderId:
 *                 type: integer
 *                 description: The ID of the order to cancel
 *     responses:
 *       200:
 *         description: Order status updated to Cancelled
 *       400:
 *         description: Invalid order ID or already cancelled
 *       401:
 *         description: Unauthorized, user needs to be logged in
 *       500:
 *         description: Server error
 */
router.patch("/status", authentication_1.checkToken, (req, res, next) => {
    (0, orderController_1.updateOrderStatusToCancelled)(req, res, next);
});
/**
 * @swagger
 * /orders:
 *   delete:
 *     summary: Delete an order
 *     tags: [Order]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - orderId
 *             properties:
 *               orderId:
 *                 type: integer
 *                 description: The ID of the order to delete
 *     responses:
 *       200:
 *         description: Order deleted successfully
 *       400:
 *         description: Invalid order ID
 *       401:
 *         description: Unauthorized, user needs to be logged in
 *       500:
 *         description: Server error
 */
router.delete("/", authentication_1.checkToken, (req, res, next) => {
    (0, orderController_1.deleteOrder)(req, res, next);
});
exports.default = router;
