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
exports.isAdmin = exports.checkToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const databse_1 = require("../config/databse");
const sequelize_1 = require("sequelize");
dotenv_1.default.config();
const checkToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer')) {
        return next({ statusCode: 401, message: "Authentication required." });
    }
    console.log(authHeader, "authHeader");
    const token = authHeader.split(' ')[1];
    try {
        if (process.env.JWT) {
            const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT);
            req.body.user = decoded;
            console.log(req.body);
            next();
        }
    }
    catch (error) {
        console.log(error, "error");
        res.status(401).json({ error: "Unauthorized" });
    }
};
exports.checkToken = checkToken;
const isAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.body.user.identifire;
    console.log(id, "route hit");
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
