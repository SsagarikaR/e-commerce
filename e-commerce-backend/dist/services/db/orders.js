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
exports.createOrder = void 0;
const databse_1 = require("../../config/databse");
const sequelize_1 = require("sequelize");
const createOrder = (userID, productID, productPrice, address, quantiy) => __awaiter(void 0, void 0, void 0, function* () {
    return yield databse_1.sequelize.query(`INSERT INTO Orders (productID,userID,productPrice,totalPrice,address,quantity) VALUES
        (?,?,?,sum(platformFee,deliveryFee,productPrice),?,?) `, {
        replacements: [productID, userID, productPrice, address, quantiy],
        type: sequelize_1.QueryTypes.INSERT
    });
});
exports.createOrder = createOrder;
