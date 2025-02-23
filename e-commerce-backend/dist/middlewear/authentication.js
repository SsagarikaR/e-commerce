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
exports.checkToken = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require('dotenv').config();
const generateToken = (id) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(id,"authentication hit",process.env);
    try {
        const token = jsonwebtoken_1.default.sign({ identifire: id }, process.env.JWT, { expiresIn: '7d' });
        console.log(token, "generated token");
        return token;
    }
    catch (error) {
        console.log("error", error);
    }
});
exports.generateToken = generateToken;
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
