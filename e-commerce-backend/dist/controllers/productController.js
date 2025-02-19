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
exports.updateProduct = exports.deleteProducts = exports.getProducts = exports.createProduct = void 0;
const products_1 = require("../services/db/products");
//  controller to create a product
const createProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { productName, productDescription, productThumbnail, productPrice, categoryID, brandID, stock } = req.body;
    try {
        if (!productName || !productDescription || !productThumbnail || !productPrice || !categoryID || !brandID || !stock) {
            return next({ statusCode: 400, message: "Please enter all the required fields." });
        }
        const isProductExist = yield (0, products_1.selectProductWithAllMatch)(productName, productDescription, productPrice, categoryID, brandID);
        if (isProductExist.length > 0) {
            return next({ statusCode: 403, message: "This product already exists." });
        }
        const [result, metaData] = yield (0, products_1.createNewProduct)(productName, productDescription, productThumbnail, productPrice, categoryID, brandID, stock);
        if (metaData > 0) {
            return res.status(202).json({ message: "Successfully added the product." });
        }
        else {
            return next({ statusCode: 409, message: "Error in adding a new product." });
        }
    }
    catch (error) {
        console.log(error);
        return next({ statusCode: 500, message: "An error occurred while creating products" });
    }
});
exports.createProduct = createProduct;
// controller to fetch all product (by name,price,categoryID,productID or all products)
const getProducts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, price, categoryID, id } = req.query;
    console.log("Query Parameters:", req.query);
    try {
        // Construct the filters to be passed to the service based on query parameters
        const filters = {
            categoryID: categoryID ? String(categoryID) : undefined,
            name: name ? String(name) : undefined,
            id: id ? Number(id) : undefined,
            price: price === "low-to-high" || price === "high-to-low" ? price : undefined, // Price sorting if provided
        };
        // Fetch products based on the filters
        const products = yield (0, products_1.getProductWithCondition)(filters);
        if (products.length === 0) {
            return next({ statusCode: 404, message: "No products found" });
        }
        return res.status(200).json(products);
    }
    catch (error) {
        console.error("Error", error);
        return next({ statusCode: 500, message: "An error occurred while fetching products" });
    }
});
exports.getProducts = getProducts;
//controller to delete a product
const deleteProducts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { productID } = req.body;
    try {
        const isProductExist = yield (0, products_1.selectByProductID)(productID);
        if (isProductExist.length === 0) {
            return next({ statusCode: 404, message: "This product doesn't exist" });
        }
        const deleteProduct = yield (0, products_1.deleteByProductID)(productID);
        return res.status(200).json({ message: "Successfully deleted the product" });
    }
    catch (error) {
        console.log(error);
        return next({ statusCode: 500, message: "An error occurred while deleting products" });
    }
});
exports.deleteProducts = deleteProducts;
// controller to update a product
const updateProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { productID, productName, productDescription, productThumbnail, productPrice, categoryID } = req.body;
    try {
        const isProductExist = yield (0, products_1.selectByProductID)(productID);
        if (isProductExist.length === 0) {
            return next({ statusCode: 404, message: "This product doesn't exist" });
        }
        const updatedProduct = yield (0, products_1.updateProducts)(productName, productDescription, productThumbnail, productPrice, categoryID, productID);
        return res.status(200).json({ message: "Successfully updated the product." });
    }
    catch (error) {
        console.log(error, "error");
        return next({ statusCode: 500, message: "An error occurred while updating products" });
    }
});
exports.updateProduct = updateProduct;
