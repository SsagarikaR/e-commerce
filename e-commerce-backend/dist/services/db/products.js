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
exports.updateProductService = exports.deleteProductService = exports.getProductsService = exports.createProductService = void 0;
const products_1 = require("../../respository/products");
const node_cache_1 = __importDefault(require("node-cache"));
const cache = new node_cache_1.default({ stdTTL: 3600, checkperiod: 600 });
// Service to create a new product
const createProductService = (productName, productDescription, productThumbnail, productPrice, categoryID, brandID, stock) => __awaiter(void 0, void 0, void 0, function* () {
    // Check if product already exists
    const isProductExist = yield (0, products_1.selectProductWithAllMatch)(productName, productDescription, productPrice, categoryID, brandID);
    if (isProductExist.length > 0) {
        throw new Error("This product already exists.");
    }
    const [result, metaData] = yield (0, products_1.createNewProduct)(productName, productDescription, productThumbnail, productPrice, categoryID, brandID, stock);
    if (metaData > 0) {
        return { success: true, message: "Successfully added the product." };
    }
    else {
        throw new Error("Error in adding a new product.");
    }
});
exports.createProductService = createProductService;
// Service to fetch products with condition (filters), including caching logic
const getProductsService = (filters, page, limit) => __awaiter(void 0, void 0, void 0, function* () {
    // Generate a unique cache key based on filters, page, and limit
    const cacheKey = `products:${JSON.stringify(filters)}:page:${page}:limit:${limit}`;
    const cachedProducts = cache.get(cacheKey);
    if (cachedProducts) {
        // console.log('Returning cached products',cachedProducts);
        return cachedProducts;
    }
    const products = yield (0, products_1.getProductWithCondition)(filters, page, limit);
    if (products.length === 0) {
        throw new Error("No products found.");
    }
    // Store the fetched products in the cache for future requests
    cache.set(cacheKey, products);
    return products;
});
exports.getProductsService = getProductsService;
// Service to delete a product
const deleteProductService = (productID) => __awaiter(void 0, void 0, void 0, function* () {
    const isProductExist = yield (0, products_1.selectByProductID)(productID);
    if (isProductExist.length === 0) {
        throw new Error("This product doesn't exist.");
    }
    yield (0, products_1.deleteByProductID)(productID);
    return { success: true, message: "Successfully deleted the product" };
});
exports.deleteProductService = deleteProductService;
// Service to update a product
const updateProductService = (productName, productDescription, productThumbnail, productPrice, categoryID, productID) => __awaiter(void 0, void 0, void 0, function* () {
    const isProductExist = yield (0, products_1.selectByProductID)(productID);
    if (isProductExist.length === 0) {
        throw new Error("This product doesn't exist.");
    }
    yield (0, products_1.updateProducts)(productName, productDescription, productThumbnail, productPrice, categoryID, productID);
    return { success: true, message: "Successfully updated the product." };
});
exports.updateProductService = updateProductService;
