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
            return next({ statusCode: 500, message: error.message });
        }
        return next({ statusCode: 500, message: "An unknown error occurred." });
    }
});
exports.createProduct = createProduct;
// Controller to fetch products (by filters or all)
const getProducts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, price, categoryID, id, page = 1, limit = 8 } = req.query;
    const currentPage = Number(page);
    const itemsPerPage = Number(limit);
    const cacheKey = `products:${name}:${price}:${categoryID}:${id}:${currentPage}:${itemsPerPage}`;
    try {
        const cachedProducts = cache.get(cacheKey);
        if (cachedProducts) {
            console.log('Returning cached products');
            return res.status(200).json(cachedProducts);
        }
        const filters = {
            categoryID: categoryID ? String(categoryID) : undefined,
            name: name ? String(name) : undefined,
            id: id ? Number(id) : undefined,
            price: price === "low-to-high" || price === "high-to-low" ? price : undefined,
        };
        const products = yield (0, products_1.getProductsService)(filters, currentPage, itemsPerPage);
        cache.set(cacheKey, products);
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
            return next({ statusCode: 500, message: error.message });
        }
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
            return next({ statusCode: 500, message: error.message });
        }
        return next({ statusCode: 500, message: "An unknown error occurred." });
    }
});
exports.updateProduct = updateProduct;
