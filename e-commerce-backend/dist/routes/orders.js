"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authorization_1 = require("../middlewear/authorization");
const orderController_1 = require("../controllers/orderController");
const router = (0, express_1.Router)();
router.post("/", authorization_1.checkToken, (req, res, next) => {
    (0, orderController_1.createOrder)(req, res, next);
});
router.get("/", authorization_1.checkToken, (req, res, next) => {
    (0, orderController_1.fetchUserOrders)(req, res, next);
});
router.patch("/", authorization_1.checkToken, (req, res, next) => {
    (0, orderController_1.updateOrderAddress)(req, res, next);
});
router.patch("/status", authorization_1.checkToken, (req, res, next) => {
    (0, orderController_1.updateOrderStatusToCancelled)(req, res, next);
});
router.delete("/", authorization_1.checkToken, (req, res, next) => {
    (0, orderController_1.deleteOrder)(req, res, next);
});
exports.default = router;
