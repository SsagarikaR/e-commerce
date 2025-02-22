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
exports.updateAdminService = exports.deleteAdminService = exports.selectAdminService = exports.createAdminService = void 0;
const admins_1 = require("../../respository/admins");
// Service function to create a new admin
const createAdminService = (userID) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Check if the admin already exists
        const existingAdmin = yield (0, exports.selectAdminService)(userID);
        if (existingAdmin.length > 0) {
            return { success: false, message: "This Admin is already registered." };
        }
        // Create new admin
        const [result, metaData] = yield (0, admins_1.createNewAdmin)(userID);
        if (metaData === 0) {
            return { success: false, message: "Failed to create admin. Please try again later." };
        }
        return { success: true, message: "Admin created successfully" };
    }
    catch (error) {
        console.error("Error creating admin:", error);
        throw new Error("An error occurred while creating the admin.");
    }
});
exports.createAdminService = createAdminService;
// Service function to get an admin by userID
const selectAdminService = (userID) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield (0, admins_1.selectAdmin)(userID);
    }
    catch (error) {
        console.error("Error fetching admin:", error);
        throw new Error("Error while fetching admin details.");
    }
});
exports.selectAdminService = selectAdminService;
// Service function to delete admin by userID
const deleteAdminService = (userID) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Check if the admin exists
        const admin = yield (0, exports.selectAdminService)(userID);
        if (admin.length === 0) {
            return { success: false, message: "Admin not found" };
        }
        // Delete the admin
        const result = yield (0, admins_1.deleteAdminByID)(userID);
        return { success: true, message: "Admin deleted successfully" };
    }
    catch (error) {
        console.error("Error deleting admin:", error);
        throw new Error("An error occurred while deleting the admin.");
    }
});
exports.deleteAdminService = deleteAdminService;
// Service function to update admin by userID
const updateAdminService = (userID, newUserID) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Check if the admin exists
        const admin = yield (0, exports.selectAdminService)(userID);
        if (admin.length === 0) {
            return { success: false, message: "Admin not found" };
        }
        // Update the admin
        const result = yield (0, admins_1.updateAdminByID)(userID, newUserID);
        if (result[0] === 0) {
            return { success: false, message: "Failed to update admin" };
        }
        return { success: true, message: "Admin updated successfully" };
    }
    catch (error) {
        console.error("Error updating admin:", error);
        throw new Error("An error occurred while updating the admin.");
    }
});
exports.updateAdminService = updateAdminService;
