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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authorization_1 = require("../config/authorization");
const userController_1 = require("../controllers/userController");
const router = (0, express_1.Router)();
router.get("/", authorization_1.checkToken, authorization_1.isAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, userController_1.getAllUser)(req, res);
}));
router.delete("/", authorization_1.checkToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, userController_1.deleteUser)(req, res);
}));
router.patch("/", authorization_1.checkToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, userController_1.updateUserPassword)(req, res);
}));
exports.default = router;
