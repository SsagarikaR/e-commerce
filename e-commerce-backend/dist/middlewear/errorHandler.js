"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandler = (err, req, res, next) => {
    // Fallback to 500 Internal Server Error if statusCode is not provided
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Something went wrong. Please try again later.';
    // Log error details for debugging
    // console.error(`Error: ${message}`, err);
    // Send response to client
    res.status(statusCode).json({
        error: message,
    });
};
exports.default = errorHandler;
