"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const prefernceController_1 = require("../controllers/prefernceController");
const router = (0, express_1.Router)();
router.post("/", (req, res, next) => {
    (0, prefernceController_1.createPreference)(req, res, next);
});
router.get("/", (req, res, next) => {
    (0, prefernceController_1.fetchPreferences)(req, res, next);
});
router.patch("/", (req, res, next) => {
    (0, prefernceController_1.updatePreference)(req, res, next);
});
router.delete("/", (req, res, next) => {
    (0, prefernceController_1.deletePreference)(req, res, next);
});
exports.default = router;
