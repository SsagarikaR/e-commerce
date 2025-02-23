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
const reviewController_1 = require("../controllers/reviewController");
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
 * /reviews:
 *   post:
 *     summary: Add a new review for a product
 *     tags: [Review]
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
 *               - rating
 *               - description
 *             properties:
 *               productID:
 *                 type: integer
 *                 description: The ID of the product being reviewed
 *               rating:
 *                 type: integer
 *                 description: The rating given to the product (0-5)
 *               description:
 *                 type: string
 *                 description: The review text describing the user's experience with the product
 *     responses:
 *       201:
 *         description: Review added successfully
 *       401:
 *         description: User not authenticated or missing
 *       409:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.post("/", authentication_1.checkToken, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    (0, reviewController_1.addReview)(req, res, next);
}));
/**
 * @swagger
 * /reviews/{id}:
 *   get:
 *     summary: Get all reviews for a specific product
 *     tags: [Review]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the product to fetch reviews for
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of reviews retrieved successfully
 *       404:
 *         description: No reviews found for the product
 *       500:
 *         description: Server error
 */
router.get("/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    (0, reviewController_1.getReviewsOfProduct)(req, res, next);
}));
/**
 * @swagger
 * /reviews:
 *   patch:
 *     summary: Update an existing review
 *     tags: [Review]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - reviewID
 *               - rating
 *               - description
 *             properties:
 *               reviewID:
 *                 type: integer
 *                 description: The ID of the review to update
 *               rating:
 *                 type: integer
 *                 description: The new rating for the review (0-5)
 *               description:
 *                 type: string
 *                 description: The updated review description
 *     responses:
 *       200:
 *         description: Review updated successfully
 *       400:
 *         description: Missing required fields
 *       404:
 *         description: Review not found or not updated
 *       500:
 *         description: Server error
 */
router.patch("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    (0, reviewController_1.updateReview)(req, res, next);
}));
/**
 * @swagger
 * /reviews:
 *   delete:
 *     summary: Delete an existing review
 *     tags: [Review]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - reviewID
 *             properties:
 *               reviewID:
 *                 type: integer
 *                 description: The ID of the review to delete
 *     responses:
 *       200:
 *         description: Review deleted successfully
 *       400:
 *         description: Missing review ID
 *       404:
 *         description: Review not found
 *       500:
 *         description: Server error
 */
router.delete("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    (0, reviewController_1.deleteReview)(req, res, next);
}));
exports.default = router;
