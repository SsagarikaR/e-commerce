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
exports.deletePreferenceService = exports.updatePreferenceService = exports.fetchPreferencesService = exports.createPreferenceService = void 0;
const prefernces_1 = require("../../respository/prefernces");
// Service function for creating a preference
const createPreferenceService = (productID, userID) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // First, check if the preference already exists
        const existingPreference = yield (0, prefernces_1.selectPrefernceByProductANDUser)(productID, userID);
        // If the preference exists, return null to prevent adding again
        if (existingPreference.length > 0) {
            return null;
        }
        // Insert new preference if it doesn't exist
        const result = yield (0, prefernces_1.insertPrefernce)(productID, userID);
        return result;
    }
    catch (error) {
        console.log(error, "error");
        throw new Error("Error while creating preference: ");
    }
});
exports.createPreferenceService = createPreferenceService;
const fetchPreferencesService = (userID) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(userID, "got3");
    try {
        const preferences = yield (0, prefernces_1.fetchPreference)(userID);
        if (!preferences || preferences.length === 0) {
            return null; // No preferences found for the user
        }
        return preferences;
    }
    catch (error) {
        console.error(error);
        throw new Error("Error while selecting prefernces. Please try again!");
    }
});
exports.fetchPreferencesService = fetchPreferencesService;
const updatePreferenceService = (preferenceID, productID, userID) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, prefernces_1.updatePreference)(preferenceID, productID, userID);
        if (result[0] === 0) {
            return null; // No rows were updated (preference might not exist)
        }
        return result;
    }
    catch (error) {
        throw new Error("Error while updating prefernces. Please try again!");
    }
});
exports.updatePreferenceService = updatePreferenceService;
const deletePreferenceService = (preferenceID) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, prefernces_1.deletePreference)(preferenceID);
        return result;
    }
    catch (error) {
        throw new Error("Error while deleting prefernces. Please try again!");
    }
});
exports.deletePreferenceService = deletePreferenceService;
