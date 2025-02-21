"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Orders = void 0;
const databse_1 = require("../config/databse");
const sequelize_1 = require("sequelize");
const product_1 = require("./product");
const user_1 = require("./user");
exports.Orders = databse_1.sequelize.define("Orders", {
    orderID: {
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
    },
    productPrice: {
        type: sequelize_1.DataTypes.NUMBER,
        allowNull: false
    },
    platformFee: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        defaultValue: '10'
    },
    deliveryFee: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        defaultValue: '15'
    },
    totalPrice: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    status: {
        type: sequelize_1.DataTypes.ENUM('Pending', 'Success', 'Cancel'),
        allowNull: false,
        defaultValue: 'Pending'
    }
}, {
    timestamps: false
});
