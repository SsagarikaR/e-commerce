"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authentication_1 = require("../middlewear/authentication");
const prefernceController_1 = require("../controllers/prefernceController");
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
 * /preferences:
 *   post:
 *     summary: Create a new preference
 *     tags: [Preference]
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
 *                 description: The ID of the product to be added as a preference
 *     responses:
 *       201:
 *         description: Preference created successfully
 *       400:
 *         description: Preference already exists
 *       401:
 *         description: Unauthorized, user needs to be logged in
 *       500:
 *         description: Server error
 */
router.post("/", authentication_1.checkToken, (req, res, next) => {
    (0, prefernceController_1.createPreference)(req, res, next);
});
/**
 * @swagger
 * /preferences:
 *   get:
 *     summary: Fetch all preferences for the authenticated user
 *     tags: [Preference]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of preferences retrieved successfully
 *       404:
 *         description: No preferences found for the user
 *       401:
 *         description: Unauthorized, user needs to be logged in
 *       500:
 *         description: Server error
 */
router.get("/", authentication_1.checkToken, (req, res, next) => {
    (0, prefernceController_1.fetchPreferences)(req, res, next);
});
/**
 * @swagger
 * /preferences/{preferenceID}:
 *   patch:
 *     summary: Update a preference by ID
 *     tags: [Preference]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: preferenceID
 *         required: true
 *         description: The ID of the preference to update
 *         schema:
 *           type: integer
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
 *                 description: The new product ID for the updated preference
 *     responses:
 *       200:
 *         description: Preference updated successfully
 *       404:
 *         description: Preference not found
 *       401:
 *         description: Unauthorized, user needs to be logged in
 *       500:
 *         description: Server error
 */
router.patch("/:preferenceID", authentication_1.checkToken, (req, res, next) => {
    (0, prefernceController_1.updatePreference)(req, res, next);
});
/**
 * @swagger
 * /preferences/{preferenceID}:
 *   delete:
 *     summary: Delete a preference by ID
 *     tags: [Preference]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: preferenceID
 *         required: true
 *         description: The ID of the preference to delete
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Preference deleted successfully
 *       404:
 *         description: Preference not found
 *       401:
 *         description: Unauthorized, user needs to be logged in
 *       500:
 *         description: Server error
 */
router.delete("/:preferenceID", authentication_1.checkToken, (req, res, next) => {
    (0, prefernceController_1.deletePreference)(req, res, next);
});
exports.default = router;
