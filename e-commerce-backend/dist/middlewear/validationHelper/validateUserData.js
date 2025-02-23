"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUpdatePassword = exports.validateSignInData = exports.validateSignUpData = void 0;
// Middleware to validate user data during sign-up
const validateSignUpData = (req, res, next) => {
    const { name, email, contactNo, password } = req.body;
    if (!name || !email || !contactNo || !password) {
        return next({ statusCode: 400, message: "Please enter all required credentials: name, email, contactNo, and password." });
    }
    if (name.length < 3 || name.length > 50) {
        return next({ statusCode: 400, message: "Name must be between 3 and 50 characters." });
    }
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email)) {
        return next({ statusCode: 400, message: "Invalid email format." });
    }
    const contactNoRegex = /^[0-9]{10}$/;
    if (!contactNoRegex.test(contactNo)) {
        return next({ statusCode: 400, message: "Contact number must be 10 digits." });
    }
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
        return next({ statusCode: 400, message: "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number." });
    }
    next();
};
exports.validateSignUpData = validateSignUpData;
const validateSignInData = (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return next({ statusCode: 400, message: "Email and password are required" });
    }
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email)) {
        return next({ statusCode: 400, message: "Invalid email format" });
    }
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
        return next({ statusCode: 400, message: "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number." });
    }
    next();
};
exports.validateSignInData = validateSignInData;
const validateUpdatePassword = (req, res, next) => {
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
        return next({ statusCode: 400, message: "Both old password and new password are required" });
    }
    if (newPassword.length < 6) {
        return next({ statusCode: 400, message: "New password must be at least 6 characters long" });
    }
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(newPassword)) {
        return next({ statusCode: 400, message: "New password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number." });
    }
    next();
};
exports.validateUpdatePassword = validateUpdatePassword;
