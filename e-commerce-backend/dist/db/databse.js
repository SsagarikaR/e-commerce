"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
exports.sequelize = new sequelize_1.Sequelize('eCommerce', 'sagarika', 'Sagarika@%71', {
    host: 'localhost',
    dialect: 'mysql'
});
try {
    exports.sequelize.authenticate();
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
