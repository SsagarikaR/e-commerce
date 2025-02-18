"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Brands = void 0;
const sequelize_1 = require("sequelize");
const databse_1 = require("../config/databse");
exports.Brands = databse_1.sequelize.define("Brands", {
    brandID: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    brandName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    brandThumbnail: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false
    }
}, {
    timestamps: false
});
// console.log(Brands===sequelize.model("Brands"));
