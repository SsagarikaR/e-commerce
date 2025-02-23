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
exports.updateReview = exports.deleteReview = exports.selectReviewOfProduct = exports.selectByReviewID = exports.addNewReview = exports.selectReviewByProductAndUser = void 0;
const databse_1 = require("../config/databse");
const sequelize_1 = require("sequelize");
const selectReviewByProductAndUser = (userID, productID) => __awaiter(void 0, void 0, void 0, function* () {
    return yield databse_1.sequelize.query("SELECT * FROM Reviews WHERE userID=? AND productID=?", {
        replacements: [userID, productID],
        type: sequelize_1.QueryTypes.SELECT
    });
});
exports.selectReviewByProductAndUser = selectReviewByProductAndUser;
const addNewReview = (userID, productID, rating, description) => __awaiter(void 0, void 0, void 0, function* () {
    return yield databse_1.sequelize.query(`INSERT INTO Reviews (userID,productID,rating,description) VALUES 
        (?,?,?,?)`, {
        replacements: [userID, productID, rating, description],
        type: sequelize_1.QueryTypes.INSERT
    });
});
exports.addNewReview = addNewReview;
const selectByReviewID = (reviewID) => __awaiter(void 0, void 0, void 0, function* () {
    return yield databse_1.sequelize.query("SELECT * FROM Reviews WHERE reviewID=?", {
        replacements: [reviewID],
        type: sequelize_1.QueryTypes.SELECT
    });
});
exports.selectByReviewID = selectByReviewID;
const selectReviewOfProduct = (productID) => __awaiter(void 0, void 0, void 0, function* () {
    return yield databse_1.sequelize.query(`SELECT r.*,u.*
                                FROM Reviews r 
                                JOIN Users u on r.userID=u.userID
                                WHERE  r.productID=?`, {
        replacements: [productID],
        type: sequelize_1.QueryTypes.SELECT
    });
});
exports.selectReviewOfProduct = selectReviewOfProduct;
const deleteReview = (userID, reviewID) => __awaiter(void 0, void 0, void 0, function* () {
    return yield databse_1.sequelize.query("DELETE FROM Reviews WHERE userID=? AND reviewID=?", {
        replacements: [userID, reviewID],
        type: sequelize_1.QueryTypes.DELETE
    });
});
exports.deleteReview = deleteReview;
const updateReview = (userID, reviewID, rating, description) => __awaiter(void 0, void 0, void 0, function* () {
    return yield databse_1.sequelize.query("UPDATE Reviews SET rating=? , description=? WHERE userID=? AND reviewID=?", {
        replacements: [rating, description, userID, reviewID],
        type: sequelize_1.QueryTypes.UPDATE
    });
});
exports.updateReview = updateReview;
