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
exports.updateProduct = exports.deleteProduct = exports.getProducts = exports.createProduct = void 0;
const products_1 = require("../services/db/products");
const node_cache_1 = __importDefault(require("node-cache"));
// Create a cache instance (TTL of 1 hour)
const cache = new node_cache_1.default({ stdTTL: 3600, checkperiod: 600 });
// Controller to create a product
const createProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { productName, productDescription, productThumbnail, productPrice, categoryID, brandID, stock, } = req.body;
    try {
        const result = yield (0, products_1.createProductService)(productName, productDescription, productThumbnail, productPrice, categoryID, brandID, stock);
        return res.status(202).json(result);
    }
    catch (error) {
        if (error instanceof Error) {
            // Now TypeScript knows 'error' is an instance of Error
            return next({ statusCode: 500, message: error.message });
        }
        // If error isn't an instance of Error, you can handle it here
        return next({ statusCode: 500, message: "An unknown error occurred." });
    }
});
exports.createProduct = createProduct;
// Controller to fetch products (by filters or all)
const getProducts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, price, categoryID, id, page = 1, limit = 8 } = req.query;
    const currentPage = Number(page);
    const itemsPerPage = Number(limit);
    // Generate a unique cache key based on the query parameters
    const cacheKey = `products:${name}:${price}:${categoryID}:${id}:${currentPage}:${itemsPerPage}`;
    try {
        // First, check if data is in the cache
        const cachedProducts = cache.get(cacheKey);
        if (cachedProducts) {
            console.log('Returning cached products');
            return res.status(200).json(cachedProducts); // Return cached data
        }
        // Define filters for the database query
        const filters = {
            categoryID: categoryID ? String(categoryID) : undefined,
            name: name ? String(name) : undefined,
            id: id ? Number(id) : undefined,
            price: price === "low-to-high" || price === "high-to-low" ? price : undefined,
        };
        // Fetch products from the service (database)
        const products = yield (0, products_1.getProductsService)(filters, currentPage, itemsPerPage);
        // Store the fetched products in the cache for future requests
        cache.set(cacheKey, products);
        // Return the fetched products
        return res.status(200).json(products);
    }
    catch (error) {
        if (error instanceof Error) {
            return next({ statusCode: 500, message: error.message });
        }
        return next({ statusCode: 500, message: "An unknown error occurred." });
    }
});
exports.getProducts = getProducts;
// Controller to delete a product
const deleteProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { productID } = req.body;
    try {
        const result = yield (0, products_1.deleteProductService)(productID);
        return res.status(200).json(result);
    }
    catch (error) {
        if (error instanceof Error) {
            // Now TypeScript knows 'error' is an instance of Error
            return next({ statusCode: 500, message: error.message });
        }
        // If error isn't an instance of Error, you can handle it here
        return next({ statusCode: 500, message: "An unknown error occurred." });
    }
});
exports.deleteProduct = deleteProduct;
// Controller to update a product
const updateProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { productID, productName, productDescription, productThumbnail, productPrice, categoryID, } = req.body;
    try {
        const result = yield (0, products_1.updateProductService)(productName, productDescription, productThumbnail, productPrice, categoryID, productID);
        return res.status(200).json(result);
    }
    catch (error) {
        if (error instanceof Error) {
            // Now TypeScript knows 'error' is an instance of Error
            return next({ statusCode: 500, message: error.message });
        }
        // If error isn't an instance of Error, you can handle it here
        return next({ statusCode: 500, message: "An unknown error occurred." });
    }
});
exports.updateProduct = updateProduct;
