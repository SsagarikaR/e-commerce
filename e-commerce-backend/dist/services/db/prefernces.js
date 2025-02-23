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
const cacheHelper_1 = require("../../helpers/cacheHelper");
// Service function for creating a preference
const createPreferenceService = (productID, userID) => __awaiter(void 0, void 0, void 0, function* () {
    const cacheKey = `preferences:${userID}`;
    try {
        // First, check if the preference already exists
        const existingPreference = yield (0, prefernces_1.selectPrefernceByProductANDUser)(productID, userID);
        // If the preference exists, return null to prevent adding again
        if (existingPreference.length > 0) {
            return { message: "Preference already exists" }; // Inform that preference already exists
        }
        // Insert new preference if it doesn't exist
        const result = yield (0, prefernces_1.insertPrefernce)(productID, userID);
        // After inserting, invalidate cache to reflect new changes
        (0, cacheHelper_1.invalidateCache)(cacheKey);
        return { message: "Preference created successfully", result };
    }
    catch (error) {
        console.log(error, "error");
        throw new Error("Error while creating preference. Please try again.");
    }
});
exports.createPreferenceService = createPreferenceService;
// Service function for fetching preferences
const fetchPreferencesService = (userID) => __awaiter(void 0, void 0, void 0, function* () {
    const cacheKey = `preferences:${userID}`;
    try {
        const cachedPreferences = (0, cacheHelper_1.getCache)(cacheKey);
        if (cachedPreferences) {
            console.log('Returning cached preferences');
            return cachedPreferences; // Return cached data if available
        }
        // Fetch preferences from database if cache is not available
        const preferences = yield (0, prefernces_1.fetchPreference)(userID);
        if (!preferences || preferences.length === 0) {
            return null; // No preferences found for the user
        }
        // Store the preferences in cache for future use
        (0, cacheHelper_1.setCache)(cacheKey, preferences);
        return preferences;
    }
    catch (error) {
        console.error(error);
        throw new Error("Error while fetching preferences. Please try again.");
    }
});
exports.fetchPreferencesService = fetchPreferencesService;
// Service function for updating a preference
const updatePreferenceService = (preferenceID, productID, userID) => __awaiter(void 0, void 0, void 0, function* () {
    const cacheKey = `preferences:${userID}`;
    try {
        // Update preference in the database
        const result = yield (0, prefernces_1.updatePreference)(preferenceID, productID, userID);
        if (result[0] === 0) {
            return { message: "Preference not found or not updated" }; // No rows were updated
        }
        // After updating, invalidate the cache so that the changes are reflected
        (0, cacheHelper_1.invalidateCache)(cacheKey);
        return { message: "Preference updated successfully", result };
    }
    catch (error) {
        throw new Error("Error while updating preferences. Please try again.");
    }
});
exports.updatePreferenceService = updatePreferenceService;
// Service function for deleting a preference
const deletePreferenceService = (preferenceID, userID) => __awaiter(void 0, void 0, void 0, function* () {
    const cacheKey = `preferences:${userID}`;
    try {
        // Delete preference from the database
        const result = yield (0, prefernces_1.deletePreference)(preferenceID);
        // After deleting, invalidate the cache so that the changes are reflected
        (0, cacheHelper_1.invalidateCache)(cacheKey);
        return { message: "Preference deleted successfully", result };
    }
    catch (error) {
        throw new Error("Error while deleting preferences. Please try again.");
    }
});
exports.deletePreferenceService = deletePreferenceService;
