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
exports.createNewOrder = void 0;
const orders_1 = require("../services/db/orders");
//add a new order
const createNewOrder = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userID = req.body.user.identifire;
    const { productID, productPrice, address, quantiy } = req.body;
    try {
        if (!productID) {
            return next({ statusCode: 409, message: "Please enter the product ." });
        }
        const [result, metaData] = yield (0, orders_1.createOrder)(userID, productID, productPrice, address, quantiy);
        if (metaData > 0) {
            return res.status(201).json({ message: "Successfully ordered this product." });
        }
        else {
            return next({ statusCode: 409, message: "Error in creating order, Please try again!" });
        }
    }
    catch (error) {
        console.log(error);
        return next({ statusCode: 500, message: "Error in adding review, Please try again!" });
    }
});
exports.createNewOrder = createNewOrder;
