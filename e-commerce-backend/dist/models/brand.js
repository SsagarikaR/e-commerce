"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.brands = void 0;
const databse_1 = require("../config/databse");
const sequelize_1 = require("sequelize");
exports.brands = databse_1.sequelize.define("brands", {
    brandtID: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    brandName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
}, {
    timestamps: false
});
// console.log(Produtcs===sequelize.model("Products"));
