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
const express_1 = __importDefault(require("express"));
const cartController_1 = require("../controllers/cartController"); // Import the controller functions
const authorization_1 = require("../middlewear/authorization");
const router = express_1.default.Router();
router.post("/", authorization_1.checkToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, cartController_1.addCartItem)(req, res);
}));
router.get("/", authorization_1.checkToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, cartController_1.getCartItems)(req, res);
}));
router.delete("/", authorization_1.checkToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, cartController_1.deleteCartItem)(req, res);
}));
router.patch("/", authorization_1.checkToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, cartController_1.updateCartItemQuantity)(req, res);
}));
exports.default = router;
