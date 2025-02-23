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
exports.deleteReviewService = exports.updateReviewService = exports.getReviewsOfProductService = exports.addReviewService = void 0;
const reviews_1 = require("../../respository/reviews");
// Service function to add a new review
const addReviewService = (userID, productID, rating, description) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const isAlreadyExist = yield (0, reviews_1.selectReviewByProductAndUser)(userID, productID);
        if (isAlreadyExist.length > 0) {
            return { success: false, message: "You have already added a review for this product." };
        }
        const [result, metaData] = yield (0, reviews_1.addNewReview)(userID, productID, rating, description);
        if (metaData === 0) {
            return { success: false, message: "Error in adding review, Please try again!" };
        }
        return { success: true, message: "Thank you for adding a review!" };
    }
    catch (error) {
        console.error("Error adding review:", error);
        throw new Error("An error occurred while adding the review.");
    }
});
exports.addReviewService = addReviewService;
// Service function to get all reviews for a product
const getReviewsOfProductService = (productID) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reviews = yield (0, reviews_1.selectReviewOfProduct)(productID);
        if (reviews.length === 0) {
            return { success: false, message: "No reviews found." };
        }
        return { success: true, reviews };
    }
    catch (error) {
        console.error("Error fetching reviews:", error);
        throw new Error("An error occurred while fetching reviews.");
    }
});
exports.getReviewsOfProductService = getReviewsOfProductService;
// Service function to update a review
const updateReviewService = (userID, reviewID, rating, description) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reviewExist = yield (0, reviews_1.selectByReviewID)(reviewID);
        if (reviewExist.length === 0) {
            return { success: false, message: "No review found for this review ID." };
        }
        yield (0, reviews_1.updateReview)(userID, reviewID, rating, description);
        return { success: true, message: "Review updated successfully!" };
    }
    catch (error) {
        console.error("Error updating review:", error);
        throw new Error("An error occurred while updating the review.");
    }
});
exports.updateReviewService = updateReviewService;
// Service function to delete a review
const deleteReviewService = (userID, reviewID) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reviewExist = yield (0, reviews_1.selectByReviewID)(reviewID);
        if (reviewExist.length === 0) {
            return { success: false, message: "No review found for this review ID." };
        }
        yield (0, reviews_1.deleteReview)(userID, reviewID);
        return { success: true, message: "Review deleted successfully!" };
    }
    catch (error) {
        console.error("Error deleting review:", error);
        throw new Error("An error occurred while deleting the review.");
    }
});
exports.deleteReviewService = deleteReviewService;
