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
exports.fetchPreference = exports.updatePreference = exports.deletePreference = exports.insertPrefernce = exports.selectPrefernceByProductANDUser = void 0;
const databse_1 = require("../config/databse");
const sequelize_1 = require("sequelize");
const selectPrefernceByProductANDUser = (productID, userID) => __awaiter(void 0, void 0, void 0, function* () {
    return yield databse_1.sequelize.query(`SELECT * FROM Preferences WHERE productID = :productID AND userID = :userID`, {
        replacements: { productID, userID },
        type: sequelize_1.QueryTypes.SELECT,
    });
});
exports.selectPrefernceByProductANDUser = selectPrefernceByProductANDUser;
const insertPrefernce = (productID, userID) => __awaiter(void 0, void 0, void 0, function* () {
    return yield databse_1.sequelize.query(`INSERT INTO Preferences (productID, userID) VALUES (:productID, :userID)`, {
        replacements: { productID, userID },
        type: sequelize_1.QueryTypes.INSERT,
    });
});
exports.insertPrefernce = insertPrefernce;
const deletePreference = (preferenceID) => __awaiter(void 0, void 0, void 0, function* () {
    return yield databse_1.sequelize.query(`DELETE FROM Preferences WHERE preferenceID = :preferenceID`, {
        replacements: { preferenceID },
        type: sequelize_1.QueryTypes.DELETE
    });
});
exports.deletePreference = deletePreference;
const updatePreference = (productID, userID, preferenceID) => __awaiter(void 0, void 0, void 0, function* () {
    return yield databse_1.sequelize.query(`UPDATE Preferences 
         SET productID = :productID, userID = :userID 
         WHERE preferenceID = :preferenceID`, {
        replacements: { productID, userID, preferenceID },
        type: sequelize_1.QueryTypes.UPDATE
    });
});
exports.updatePreference = updatePreference;
const fetchPreference = (userID) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(userID,"got2")
    return yield databse_1.sequelize.query(`SELECT p.preferenceID, p.productID, p.userID, 
        pr.productName, pr.productDescription,pr.productThumbnail,pr.productPrice, 
        b.brandName, b.brandThumbnail
         FROM Preferences p
         JOIN Products pr ON pr.productID = p.productID
         JOIN Brands b ON b.brandID = pr.brandID
         WHERE p.userID = ? LIMIT 8`, // Filter by userID
    {
        replacements: [userID],
        type: sequelize_1.QueryTypes.SELECT
    });
});
exports.fetchPreference = fetchPreference;
