"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Admins = void 0;
const sequelize_1 = require("sequelize");
const databse_1 = require("../config/databse");
const user_1 = require("./user");
exports.Admins = databse_1.sequelize.define("Admins", {
    adminID: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    userID: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: user_1.Users,
            key: 'userID'
        }
    }
}, {
    timestamps: false
});
// console.log(Admins===sequelize.model("Admins"));
