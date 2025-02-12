"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Categories = void 0;
const sequelize_1 = require("sequelize");
const databse_1 = require("../config/databse");
exports.Categories = databse_1.sequelize.define("Categories", {
    categoryID: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    categoryName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    categoryThumbnail: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
}, {
    timestamps: false
});
console.log(exports.Categories === databse_1.sequelize.model("Categories"));
