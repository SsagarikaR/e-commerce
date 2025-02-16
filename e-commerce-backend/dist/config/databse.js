"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.sequelize = new sequelize_1.Sequelize(process.env.DBNAME, process.env.DBUSER, process.env.PASSWORD, {
    host: 'localhost',
    dialect: 'mysql'
});
try {
    exports.sequelize.authenticate();
    console.log(process.env.DBNAME, process.env.USERNAME, process.env.PASSWORD);
    console.log('Conncection has been established successfully.');
}
catch (error) {
    console.log("Error connecting databse:", error);
}
exports.sequelize.sync().then((data) => {
    console.log("databse synced successfully.");
}).catch((error) => {
    console.log("Error syncing databse:", error);
});
