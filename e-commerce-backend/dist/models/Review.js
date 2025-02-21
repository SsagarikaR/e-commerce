"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Reviews = void 0;
const sequelize_1 = require("sequelize");
const databse_1 = require("../config/databse");
const product_1 = require("./product");
exports.Reviews = databse_1.sequelize.define("Reviews", {
    reviewID: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    productID: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: product_1.Produtcs,
            key: "productID"
        }
    },
    rating: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    description: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false
    }
}, {
    timestamps: false
});
