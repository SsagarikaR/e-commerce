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
exports.getUser = exports.createUser = void 0;
const authentication_1 = require("../config/authentication");
const databse_1 = require("../config/databse");
const bcrypt_1 = __importDefault(require("bcrypt"));
const sequelize_1 = require("sequelize");
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, contactNo, role, password } = req.body;
    try {
        if (name === "" || name === undefined || !name) {
            return res.status(404).json({ error: "Name can't be empty" });
        }
        if (email === "" || email === undefined || !email) {
            return res.status(404).json({ error: "Email can't be empty" });
        }
        if (contactNo === "" || contactNo === undefined || !contactNo) {
            return res.status(404).json({ error: "Contact No. can't be empty." });
        }
        if (role === "" || role === undefined || !role) {
            return res.status(404).json({ error: "User's role can't be empty." });
        }
        if (password === "" || password === undefined || !password) {
            return res.status(404).json({ error: "User's role can't be empty." });
        }
        const ifUserExist = yield databse_1.sequelize.query(`SELECT * FROM Users WHERE name=? AND email=?`, {
            replacements: [name, email],
            type: sequelize_1.QueryTypes.SELECT
        });
        if (ifUserExist.length !== 0) {
            return res.status(403).json({ error: "This user is already registered" });
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const [result, metaData] = yield databse_1.sequelize.query(`INSERT INTO Users (name,email,contactNo,role,password) VALUES
            (?,?,?,?,?)`, {
            replacements: [name, email, contactNo, role, hashedPassword],
            type: sequelize_1.QueryTypes.INSERT
        });
        if (metaData !== 0) {
            const token = yield (0, authentication_1.generateToken)(result);
            return res.status(202).json(token);
        }
        else {
            return res.status(403).json({ error: "Error creating a new user." });
        }
    }
    catch (error) {
        console.log(error, "error creating  user");
        return res.status(500).json({ message: "Please try again after sometimes!" });
    }
});
exports.createUser = createUser;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, contactNo, role, password } = req.body;
    try {
        if (name === "" || name === undefined || !name) {
            return res.status(404).json({ error: "Name can't be empty" });
        }
        if (email === "" || email === undefined || !email) {
            return res.status(404).json({ error: "Email can't be empty" });
        }
        if (contactNo === "" || contactNo === undefined || !contactNo) {
            return res.status(404).json({ error: "Contact No. can't be empty." });
        }
        if (role === "" || role === undefined || !role) {
            return res.status(404).json({ error: "User's role can't be empty." });
        }
        const user = yield databse_1.sequelize.query(`SELECT * FROM Users WHERE name=? AND email=? AND contactNo=? AND role=? `, {
            replacements: [name, email, contactNo, role],
            type: sequelize_1.QueryTypes.SELECT
        });
        if (user.length !== 0) {
            const isPasswordValid = yield bcrypt_1.default.compare(password, user[0].password);
            if (!isPasswordValid) {
                return res.status(403).json({ message: "Invalid password." });
            }
            // console.log(user)
            // console.log(user[0].userID)
            const token = yield (0, authentication_1.generateToken)(user[0].userID);
            console.log(token, "token");
            const userToReturn = user[0];
            userToReturn.token = token;
            return res.status(200).json(userToReturn);
        }
        else {
            return res.status(404).json({ message: "User not found" });
        }
    }
    catch (error) {
        console.log(error, "error creating  user");
        return res.status(500).json({ message: "Please try again after sometimes!" });
    }
});
exports.getUser = getUser;
