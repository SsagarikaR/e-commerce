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
exports.deleteYourReview = exports.updateYourReview = exports.getReviewOfProduct = exports.addReview = void 0;
const products_1 = require("../services/db/products");
const reviews_1 = require("../services/db/reviews");
//add a new review
const addReview = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userID = req.body.user.identifire;
    const { productID, rating, description } = req.body;
    console.log(productID, rating, description);
    try {
        if (!userID) {
            return next({ statusCode: 400, message: "User not authenticated or missing." });
        }
        if (!productID || !(rating >= 0 && rating <= 5) || !description) {
            return next({ statusCode: 409, message: "Please enter all the require fields." });
        }
        const isAlreadyExist = yield (0, reviews_1.selectReviewByProductAndUser)(userID, productID);
        if (isAlreadyExist.length > 0) {
            return next({ statusCode: 403, message: "You have already added review for this product." });
        }
        const [result, metaData] = yield (0, reviews_1.addNewReview)(userID, productID, rating, description);
        if (metaData > 0) {
            return res.status(201).json({ message: "Thank you for adding review." });
        }
        else {
            return next({ statusCode: 409, message: "Error in adding review, Please try again!" });
        }
    }
    catch (error) {
        console.log(error);
        return next({ statusCode: 500, message: "Error in adding review, Please try again!" });
    }
});
exports.addReview = addReview;
const getReviewOfProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        if (!id) {
            return next({ statusCode: 409, message: "Please enter the product id to fetch reviews for this product." });
        }
        const isProductExist = yield (0, products_1.selectByProductID)(Number(id));
        if (isProductExist.length === 0) {
            return next({ statusCode: 404, message: "This product doesn't exist." });
        }
        const review = yield (0, reviews_1.selectReviewOfProduct)(Number(id));
        if (review.length === 0) {
            return next({ statusCode: 403, message: "No review found." });
        }
        else {
            return res.status(200).json(review);
        }
    }
    catch (error) {
        console.log(error);
        return next({ statusCode: 500, message: "Error in adding review, Please try again!" });
    }
});
exports.getReviewOfProduct = getReviewOfProduct;
const updateYourReview = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userID = req.body.user.identifire;
    const { reviewID, rating, description } = req.body;
    try {
        if (!reviewID) {
            return next({ statusCode: 409, message: "Please enter the reviews id to fetch reviews for this product." });
        }
        if (!rating || !description) {
            return next({ statusCode: 404, message: "No review  exist for this review ID." });
        }
        const isReviewExist = yield (0, reviews_1.selectByReviewID)(reviewID);
        if (isReviewExist.length === 0) {
            return next({ statusCode: 404, message: "No review  exist for this review ID." });
        }
        yield (0, reviews_1.updateReview)(userID, reviewID, rating, description);
        return res.status(200).json({ message: "Review updated successfully" });
    }
    catch (error) {
        console.log(error);
        return next({ statusCode: 500, message: "Error in adding review, Please try again!" });
    }
});
exports.updateYourReview = updateYourReview;
const deleteYourReview = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userID = req.body.user.identifire;
    const { reviewID } = req.body;
    try {
        if (!reviewID) {
            return next({ statusCode: 409, message: "Please enter the reviews id to fetch reviews for this product." });
        }
        const isReviewExist = yield (0, reviews_1.selectByReviewID)(reviewID);
        if (isReviewExist.length === 0) {
            return next({ statusCode: 404, message: "No review  exist for this review ID." });
        }
        yield (0, reviews_1.deleteReview)(userID, reviewID);
        return res.status(200).json({ message: "Review deleted succesfully" });
    }
    catch (error) {
        console.log(error);
        return next({ statusCode: 500, message: "Error in adding review, Please try again!" });
    }
});
exports.deleteYourReview = deleteYourReview;
