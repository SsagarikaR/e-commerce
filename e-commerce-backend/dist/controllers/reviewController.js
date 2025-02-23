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
exports.deleteReview = exports.updateReview = exports.getReviewsOfProduct = exports.addReview = void 0;
const reviews_1 = require("../services/db/reviews");
// Controller to add a new review
const addReview = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userID = req.body.user.identifire;
    const { productID, rating, description } = req.body;
    if (!userID) {
        return next({ statusCode: 401, message: "User not authenticated or missing." });
    }
    if (!productID || !(rating >= 0 && rating <= 5) || !description) {
        return next({ statusCode: 409, message: "Please enter all the required fields." });
    }
    try {
        const { success, message } = yield (0, reviews_1.addReviewService)(userID, productID, rating, description);
        if (!success) {
            return next({ statusCode: 403, message });
        }
        return res.status(201).json({ message });
    }
    catch (error) {
        console.error("Error adding review:", error);
        return next({ statusCode: 500, message: "An error occurred while adding the review." });
    }
});
exports.addReview = addReview;
// Controller to get reviews for a product
const getReviewsOfProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!id) {
        return next({ statusCode: 409, message: "Please enter the product id to fetch reviews for this product." });
    }
    try {
        const { success, reviews, message } = yield (0, reviews_1.getReviewsOfProductService)(Number(id));
        if (!success) {
            return next({ statusCode: 404, message });
        }
        return res.status(200).json(reviews);
    }
    catch (error) {
        console.error("Error getting reviews:", error);
        return next({ statusCode: 500, message: "An error occurred while fetching reviews." });
    }
});
exports.getReviewsOfProduct = getReviewsOfProduct;
// Controller to update a review
const updateReview = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userID = req.body.user.identifire;
    const { reviewID, rating, description } = req.body;
    if (!userID) {
        return next({ statusCode: 401, message: "User not authenticated or missing." });
    }
    if (!reviewID || !rating || !description) {
        return next({ statusCode: 400, message: "Please enter review ID, rating, and description." });
    }
    try {
        const { success, message } = yield (0, reviews_1.updateReviewService)(userID, reviewID, rating, description);
        if (!success) {
            return next({ statusCode: 404, message });
        }
        return res.status(200).json({ message });
    }
    catch (error) {
        console.error("Error updating review:", error);
        return next({ statusCode: 500, message: "An error occurred while updating the review." });
    }
});
exports.updateReview = updateReview;
// Controller to delete a review
const deleteReview = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userID = req.body.user.identifire;
    const { reviewID } = req.body;
    if (!reviewID) {
        return next({ statusCode: 400, message: "Please provide a review ID to delete." });
    }
    try {
        const { success, message } = yield (0, reviews_1.deleteReviewService)(userID, reviewID);
        if (!success) {
            return next({ statusCode: 404, message });
        }
        return res.status(200).json({ message });
    }
    catch (error) {
        console.error("Error deleting review:", error);
        return next({ statusCode: 500, message: "An error occurred while deleting the review." });
    }
});
exports.deleteReview = deleteReview;
