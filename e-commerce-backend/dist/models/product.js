"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Produtcs = void 0;
const databse_1 = require("../db/databse");
const sequelize_1 = require("sequelize");
const category_1 = require("./category");
exports.Produtcs = databse_1.sequelize.define("Products", {
    productID: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    productName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    productDescription: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false
    },
    ProductThumbnail: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false
    },
    productPrice: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    categoryID: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: category_1.Categories,
            key: "categoryID"
        },
        onDelete: 'CASCADE'
    }
}, {
    timestamps: false
});
// console.log(Produtcs===sequelize.model("Products"));
