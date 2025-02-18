"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sellers = void 0;
const sequelize_1 = require("sequelize");
const databse_1 = require("../config/databse");
const user_1 = require("./user");
exports.Sellers = databse_1.sequelize.define("Sellers", {
    sellerID: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    userID: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        references: {
            model: user_1.Users,
            key: "categoryID"
        },
        onDelete: 'CASCADE'
    }
}, {
    timestamps: false
});
// console.log(Brands===sequelize.model("Brands"));
