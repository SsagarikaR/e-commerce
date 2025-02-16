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
const authorization_1 = require("../middlewear/authorization");
const userController_1 = require("../controllers/userController");
const router = (0, express_1.Router)();
/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management APIs
 */
/**
 * @swagger
 * securityDefinitions:
 *   authorization:
 *     type: apiKey
 *     in: header
 *     name: Authorization
 *     description: "JWT Token required for authentication"
 */
/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of all users
 *       403:
 *         description: Forbidden, only admins can access
 *       500:
 *         description: Server error
 */
router.get("/users", authorization_1.checkToken, authorization_1.isAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, userController_1.getAllUser)(req, res);
}));
/**
 * @swagger
 * /user:
 *   get:
 *     summary: Get user by ID
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: User details retrieved successfully
 *       403:
 *         description: Unauthorized access
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
router.get("/user", authorization_1.checkToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, userController_1.getUserByID)(req, res);
}));
/**
 * @swagger
 * /users:
 *   delete:
 *     summary: Delete a user
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userID:
 *                 type: string
 *                 description: ID of the user to delete
 *     responses:
 *       200:
 *         description: Successfully deleted the user
 *       403:
 *         description: Unauthorized access
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
router.delete("/users", authorization_1.checkToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, userController_1.deleteUser)(req, res);
}));
/**
 * @swagger
 * /users:
 *   patch:
 *     summary: Update user password
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userID:
 *                 type: string
 *                 description: ID of the user
 *               newPassword:
 *                 type: string
 *                 description: New password
 *     responses:
 *       200:
 *         description: Successfully updated the password
 *       403:
 *         description: Unauthorized access
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
router.patch("/users", authorization_1.checkToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, userController_1.updateUserPassword)(req, res);
}));
exports.default = router;
