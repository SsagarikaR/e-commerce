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
exports.updatePreference = exports.deletePreference = exports.fetchPreferences = exports.createPreference = void 0;
const prefernces_1 = require("../services/db/prefernces"); // Import service
//create a new preference
const createPreference = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userID = req.body.user.identifire;
    const { productID } = req.body;
    try {
        const result = yield (0, prefernces_1.createPreferenceService)(productID, userID);
        if (!result) {
            return res.status(400).json({ message: "Preference already exists" });
        }
        res.status(201).json({ message: "Preference created successfully", result });
    }
    catch (error) {
        return next({ statusCode: 500, message: "Error in adding prefernces, Please try again!" });
    }
});
exports.createPreference = createPreference;
//fetch prefernces
const fetchPreferences = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userID = req.body.user.identifire;
    try {
        const preferences = yield (0, prefernces_1.fetchPreferencesService)(userID);
        if (!preferences) {
            return res.status(404).json({ message: "No preferences found for the user" });
        }
        res.status(200).json(preferences);
    }
    catch (error) {
        return next({ statusCode: 500, message: "Failed to fetch Preferences, Please try again!" });
    }
});
exports.fetchPreferences = fetchPreferences;
//delete prefrecnes
const deletePreference = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { preferenceID } = req.params;
    try {
        const result = yield (0, prefernces_1.deletePreferenceService)(Number(preferenceID));
        res.status(200).json({ message: "Preference deleted successfully" });
    }
    catch (error) {
        return next({ statusCode: 500, message: "Failed to delete preference" });
    }
});
exports.deletePreference = deletePreference;
//update prefernces
const updatePreference = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { preferenceID } = req.params;
    const userID = req.body.user.identifire;
    const { productID } = req.body;
    try {
        const result = yield (0, prefernces_1.updatePreferenceService)(Number(preferenceID), productID, userID);
        if (!result) {
            return res.status(404).json({ message: "Preference not found or not updated" });
        }
        res.status(200).json({ message: "Preference updated successfully", result });
    }
    catch (error) {
        return next({ statusCode: 500, message: "Failed to update preference" });
    }
});
exports.updatePreference = updatePreference;
