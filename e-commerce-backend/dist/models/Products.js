"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Produtcs = void 0;
const databse_1 = require("../config/databse");
const sequelize_1 = require("sequelize");
const Categories_1 = require("./Categories");
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
    ProdutThumbnail: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    categoryID: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Categories_1.Categories,
            key: "categoryID"
        },
        onDelete: 'CASCADE'
    }
}, {
    timestamps: false
});
// console.log(Produtcs===sequelize.model("Products"));
