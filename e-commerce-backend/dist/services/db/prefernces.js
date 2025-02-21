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
exports.yourPrefernce = void 0;
const databse_1 = require("../../config/databse");
const sequelize_1 = require("sequelize");
const yourPrefernce = (userID) => __awaiter(void 0, void 0, void 0, function* () {
    databse_1.sequelize.query(`SELECT
                    pr.PreferenceID,
                    pr.userID
                    p.productID,
                    p.productName,
                    p.productThumbnail,
                    p.productPrice,
                    c.categoryID,
                    br.brandID,
                    br.brandThumbnail
                    FROM Preferences pr
                    JOIN Products p ON pr.productID = p.productID
                    JOIN Catgeories c on p.categoryID = c.categoryID
                    JOIN Brands br ON p.brandID = br.brandID
                    WHERE pr.userID=?
                    `, {
        replacements: [userID],
        type: sequelize_1.QueryTypes.SELECT
    });
});
exports.yourPrefernce = yourPrefernce;
