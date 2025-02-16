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
const authController_1 = require("../controllers/authController");
const express_1 = require("express");
const router = (0, express_1.Router)();
/**
 * @swagger
 * /auth/signup:
 *   post:
 *     summary: Register a new user
 *     tags: [User Authentication]
 *     description: Creates a new user account if the username and email are not already taken.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - contactNo
 *               - password
 *               - role
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               contactNo:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 *       409:
 *         description: Error creating new user
 *       500:
 *         description: Internal server error
 */
router.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, authController_1.createUser)(req, res);
}));
/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Register a new user
 *     tags: [User Authentication]
 *     description:  Logs in a user if credentials match an existing account..
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - contactNo
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *               contactNo:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User authenticated successfully
 *       400:
 *         description: Invalid credentials
 *       500:
 *         description: Internal server error
 */
router.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, authController_1.getUser)(req, res);
}));
exports.default = router;
