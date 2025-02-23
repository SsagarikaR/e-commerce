"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUpdateProductData = exports.validateCreateProductData = void 0;
// Middleware to validate data for creating a new product
const validateCreateProductData = (req, res, next) => {
    const { productName, productDescription, productThumbnail, productPrice, categoryID, brandID, stock } = req.body;
    // Validate required fields
    if (!productName || !productDescription || !productThumbnail || !productPrice || !categoryID || !brandID || !stock) {
        return next({ statusCode: 400, message: "All fields are required: productName, productDescription, productThumbnail, productPrice, categoryID, brandID, and stock" });
    }
    // Validate productName length
    if (productName.length < 3 || productName.length > 100) {
        return next({ statusCode: 400, message: "Product name must be between 3 and 100 characters" });
    }
    // Validate productPrice as a number and within a reasonable range
    if (isNaN(Number(productPrice)) || Number(productPrice) <= 0) {
        return next({ statusCode: 400, message: "Product price must be a positive number" });
    }
    // Validate stock as a non-negative integer
    if (isNaN(Number(stock)) || Number(stock) < 0) {
        return next({ statusCode: 400, message: "Stock must be a non-negative integer" });
    }
    // Validate categoryID and brandID as integers
    if (isNaN(Number(categoryID)) || isNaN(Number(brandID))) {
        return next({ statusCode: 400, message: "Category ID and Brand ID must be valid integers" });
    }
    // Validate productThumbnail URL
    const urlRegex = /^(https?:\/\/)?([\w\d-]+\.)+[a-z]{2,6}(\/[^\s]*)?$/i;
    if (!urlRegex.test(productThumbnail)) {
        return next({ statusCode: 400, message: "Product thumbnail must be a valid URL" });
    }
    next();
};
exports.validateCreateProductData = validateCreateProductData;
// Middleware to validate data for updating an existing product
const validateUpdateProductData = (req, res, next) => {
    const { productID, productName, productDescription, productThumbnail, productPrice, categoryID, stock } = req.body;
    // Validate required fields
    if (!productID) {
        return next({ statusCode: 400, message: "Product ID is required" });
    }
    // If no fields are provided to update, return an error
    if (!productName && !productDescription && !productThumbnail && !productPrice && !categoryID && !stock) {
        return next({ statusCode: 400, message: "At least one field must be provided for updating the product" });
    }
    // Validate productName length (if provided)
    if (productName && (productName.length < 3 || productName.length > 100)) {
        return next({ statusCode: 400, message: "Product name must be between 3 and 100 characters" });
    }
    // Validate productPrice as a number and within a reasonable range (if provided)
    if (productPrice && (isNaN(Number(productPrice)) || Number(productPrice) <= 0)) {
        return next({ statusCode: 400, message: "Product price must be a positive number" });
    }
    // Validate stock as a non-negative integer (if provided)
    if (stock && (isNaN(Number(stock)) || Number(stock) < 0)) {
        return next({ statusCode: 400, message: "Stock must be a non-negative integer" });
    }
    // Validate categoryID as an integer (if provided)
    if (categoryID && isNaN(Number(categoryID))) {
        return next({ statusCode: 400, message: "Category ID must be a valid integer" });
    }
    // Validate productThumbnail URL (if provided)
    if (productThumbnail && !/^(https?:\/\/)?([\w\d-]+\.)+[a-z]{2,6}(\/[^\s]*)?$/i.test(productThumbnail)) {
        return next({ statusCode: 400, message: "Product thumbnail must be a valid URL" });
    }
    next();
};
exports.validateUpdateProductData = validateUpdateProductData;
