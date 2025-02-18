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
exports.paginatedProduct = exports.updateProduct = exports.deleteProducts = exports.getProducts = exports.createProduct = void 0;
const products_1 = require("../services/db/products");
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { productName, productDescription, productThumbnail, productPrice, categoryID } = req.body;
    try {
        if (productName === "" || productName === undefined || !productName) {
            return res.status(404).json({ error: "Product's name can't be empty" });
        }
        if (productDescription === "" || productDescription === undefined || !productDescription) {
            return res.status(404).json({ error: "Product's description can't be empty" });
        }
        if (productThumbnail === "" || productThumbnail === undefined || !productThumbnail) {
            return res.status(404).json({ error: "Product's thumbnail No. can't be empty." });
        }
        if (productPrice === "" || productPrice === undefined || !productPrice) {
            return res.status(404).json({ error: "Product's price role can't be empty." });
        }
        if (categoryID === "" || categoryID === undefined || !categoryID) {
            return res.status(404).json({ error: "Please choose a category role can't be empty." });
        }
        const isProductExist = yield (0, products_1.selectProductWithAllMatch)(productName, productDescription, productPrice, categoryID);
        if (isProductExist.length > 0) {
            return res.status(403).json({ error: "This product already exist." });
        }
        const [result, metaData] = yield (0, products_1.createNewProduct)(productName, productDescription, productThumbnail, productPrice, categoryID);
        if (metaData > 0) {
            return res.status(202).json({ message: "Successfully added the product." });
        }
        else {
            return res.status(409).json({ error: "Error in adding a new product." });
        }
    }
    catch (error) {
        console.log(error, "error");
        return res.status(500).json({ error: "Please try again after sometimes!" });
    }
});
exports.createProduct = createProduct;
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, price, categoryID, id } = req.query;
    console.log(req.query);
    try {
        const products = yield (0, products_1.getProductWithCondition)({
            categoryID: categoryID ? String(categoryID) : undefined,
            name: name ? String(name) : undefined,
            id: id ? Number(id) : undefined,
            price: price === "low-to-high" || price === "high-to-low" ? price : undefined,
        });
        if (products.length === 0) {
            return res.status(404).json({ message: "No products found" });
        }
        return res.status(200).json(products);
    }
    catch (error) {
        console.log(error, "error");
        return res.status(500).json({ error: "Please try again after sometime!" });
    }
});
exports.getProducts = getProducts;
const deleteProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("data", req.body);
    const { productID } = req.body;
    try {
        const isProductExist = yield (0, products_1.selectByProductID)(productID);
        if (isProductExist.length === 0) {
            return res.status(404).json({ error: "This product doesn't exist" });
        }
        console.log(req.body);
        const deleteProduct = yield (0, products_1.deleteByProductID)(productID);
        return res.status(200).json({ message: "Successfully deletd the product" });
    }
    catch (error) {
        console.log(req);
        console.log(error, "error");
        return res.status(500).json({ error: "Please try again after sometimes!" });
    }
});
exports.deleteProducts = deleteProducts;
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { productID, productName, productDescription, productThumbnail, productPrice, categoryID } = req.body;
    try {
        const isProductExist = yield (0, products_1.selectByProductID)(productID);
        if (isProductExist.length === 0) {
            return res.status(403).json({ error: "This product doesn't exist" });
        }
        const updatedProduct = yield (0, products_1.updateProducts)(productName, productDescription, productThumbnail, productPrice, categoryID, productID);
        return res.status(200).json({ message: "Successfully updated the product." });
    }
    catch (error) {
        console.log(error, "error");
        return res.status(500).json({ error: "Please try again after sometimes!" });
    }
});
exports.updateProduct = updateProduct;
const paginatedProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { page } = req.body;
    try {
        let limit = 12;
        const offset = page > 1 ? limit * page : 1;
        const products = yield (0, products_1.selectProductPerPage)(offset, limit);
        return res.status(200).json(products);
    }
    catch (error) {
        console.log(error, "error");
        return res.status(500).json({ error: "Please try again after sometimes!" });
    }
});
exports.paginatedProduct = paginatedProduct;
