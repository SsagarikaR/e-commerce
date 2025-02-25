"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdmin = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const databse_1 = require("../config/databse");
const sequelize_1 = require("sequelize");
dotenv_1.default.config();
const isAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.body.user.identifire;
    try {
        const user = yield databse_1.sequelize.query('SELECT * FROM Admins WHERE userID=?', {
            replacements: [id],
            type: sequelize_1.QueryTypes.SELECT
        });
        if (user.length === 0) {
            res.status(403).json({ error: "You are not authorized for this action." });
            next();
        }
        next();
    }
    catch (error) {
        res.status(500).json({ error: "Please try again after sometimes" });
    }
});
exports.isAdmin = isAdmin;
