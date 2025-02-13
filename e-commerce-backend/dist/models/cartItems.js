"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartItems = void 0;
const sequelize_1 = require("sequelize");
const databse_1 = require("../config/databse");
const products_1 = require("./products");
const users_1 = require("./users");
exports.CartItems = databse_1.sequelize.define("CartItems", {
    cartItemID: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    productID: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: products_1.Produtcs,
            key: "productID"
        },
        onDelete: 'CASCADE'
    },
    userID: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: users_1.Users,
            key: "userID"
        },
        onDelete: 'CASCADE'
    }
}, {
    timestamps: false
});
// console.log(CartItems===sequelize.model("CartItems"))
