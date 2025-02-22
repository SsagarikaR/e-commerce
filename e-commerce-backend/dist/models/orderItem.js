"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderItems = void 0;
const sequelize_1 = require("sequelize");
const databse_1 = require("../config/databse");
const order_1 = require("./order");
exports.OrderItems = databse_1.sequelize.define("OrderItems", {
    orderItemID: {
        type: sequelize_1.DataTypes.INET,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    orderId: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: order_1.Orders,
            key: "orderID"
        }
    },
    productId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    quantity: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    price: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
}, {
    timestamps: false
});
