"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WishLists = void 0;
const databse_1 = require("../config/databse");
const sequelize_1 = require("sequelize");
const product_1 = require("./product");
const user_1 = require("./user");
exports.WishLists = databse_1.sequelize.define("WishLists", {
    wishListID: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    productID: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: product_1.Produtcs,
            key: "productID"
        },
        onDelete: 'CASCADE'
    },
    userID: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: user_1.Users,
            key: "userID"
        },
        onDelete: 'CASCADE'
    }
}, {
    timestamps: false
});
