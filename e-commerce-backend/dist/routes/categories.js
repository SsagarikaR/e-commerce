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
const categoriesController_1 = require("../controllers/categoriesController");
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
 * /categories:
 *   post:
 *     summary: Create a new category
 *     tags: [Categories]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - categoryName
 *               - categoryThumbnail
 *             properties:
 *               categoryName: { type: string }
 *               categoryThumbnail: { type: string }
 *     responses:
 *       201:
 *         description: Successfully added a new category
 *       409:
 *         description: Error in adding a new category
 *       500:
 *         description: Server error
 */
router.post("/", authorization_1.checkToken, authorization_1.isAdmin, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    (0, categoriesController_1.createCategories)(req, res, next);
}));
/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Get all categories or filter by name
 *     tags: [Categories]
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Filter categories by name (optional)
 *     responses:
 *       200:
 *         description: List of matching categories or all categories if no filter is applied
 *       404:
 *         description: No categories found
 *       500:
 *         description: Server error
 */
router.get("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    (0, categoriesController_1.getCategories)(req, res, next);
}));
/**
 * @swagger
 * /categories:
 *   delete:
 *     summary: Delete a category
 *     tags: [Categories]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - categoryID
 *             properties:
 *               categoryID: { type: integer }
 *     responses:
 *       200:
 *         description: Successfully deleted the category
 *       404:
 *         description: Category not found
 *       500:
 *         description: Server error
 */
router.delete("/", authorization_1.checkToken, authorization_1.isAdmin, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    (0, categoriesController_1.deleteCategories)(req, res, next);
}));
/**
 * @swagger
 * /categories:
 *   patch:
 *     summary: Update a category
 *     tags: [Categories]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - categoryID
 *               - categoryName
 *               - categoryThumbnail
 *             properties:
 *               categoryID: { type: integer }
 *               categoryName: { type: string }
 *               categoryThumbnail: { type: string }
 *     responses:
 *       200:
 *         description: Successfully updated the category
 *       500:
 *         description: Server error
 */
router.patch("/", authorization_1.checkToken, authorization_1.isAdmin, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    (0, categoriesController_1.updateCategories)(req, res, next);
}));
exports.default = router;
