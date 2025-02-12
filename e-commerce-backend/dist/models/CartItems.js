"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartItems = void 0;
const sequelize_1 = require("sequelize");
const databse_1 = require("../config/databse");
const Products_1 = require("./Products");
const Users_1 = require("./Users");
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
            model: Products_1.Produtcs,
            key: "productID"
        },
        onDelete: 'CASCADE'
    },
    userID: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Users_1.Users,
            key: "userID"
        },
        onDelete: 'CASCADE'
    }
}, {
    timestamps: false
});
console.log(exports.CartItems === databse_1.sequelize.model("CartItems"));
