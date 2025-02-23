import { Request, Response, NextFunction } from "express";
import {
  createProductService,
  getProductsService,
  deleteProductService,
  updateProductService,
} from "../services/db/products";
import NodeCache from "node-cache";

// Create a cache instance (TTL of 1 hour)
const cache = new NodeCache({ stdTTL: 3600, checkperiod: 600 });

// Controller to create a product
export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    productName,
    productDescription,
    productThumbnail,
    productPrice,
    categoryID,
    brandID,
    stock,
  } = req.body;

  try {
    const result = await createProductService(
      productName,
      productDescription,
      productThumbnail,
      productPrice,
      categoryID,
      brandID,
      stock
    );
    return res.status(202).json(result);
  } catch (error) {
    if (error instanceof Error) {
      // Now TypeScript knows 'error' is an instance of Error
      return next({ statusCode: 500, message: error.message });
    }

    // If error isn't an instance of Error, you can handle it here
    return next({ statusCode: 500, message: "An unknown error occurred." });
  }
};

// Controller to fetch products (by filters or all)
export const getProducts = async (req: Request, res: Response, next: NextFunction) => {
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
      return res.status(200).json(cachedProducts);  // Return cached data
    }

    // Define filters for the database query
    const filters = {
      categoryID: categoryID ? String(categoryID) : undefined,
      name: name ? String(name) : undefined,
      id: id ? Number(id) : undefined,
      price: price === "low-to-high" || price === "high-to-low" ? (price as "low-to-high" | "high-to-low") : undefined,
    };

    // Fetch products from the service (database)
    const products = await getProductsService(filters, currentPage, itemsPerPage);

    // Store the fetched products in the cache for future requests
    cache.set(cacheKey, products);

    // Return the fetched products
    return res.status(200).json(products);

  } catch (error) {
    if (error instanceof Error) {
      return next({ statusCode: 500, message: error.message });
    }
    return next({ statusCode: 500, message: "An unknown error occurred." });
  }
};


// Controller to delete a product
export const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { productID } = req.body;

  try {
    const result = await deleteProductService(productID);
    return res.status(200).json(result);
  } catch (error) {
    if (error instanceof Error) {
      // Now TypeScript knows 'error' is an instance of Error
      return next({ statusCode: 500, message: error.message });
    }

    // If error isn't an instance of Error, you can handle it here
    return next({ statusCode: 500, message: "An unknown error occurred." });
  }
};

// Controller to update a product
export const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    productID,
    productName,
    productDescription,
    productThumbnail,
    productPrice,
    categoryID,
  } = req.body;

  try {
    const result = await updateProductService(
      productName,
      productDescription,
      productThumbnail,
      productPrice,
      categoryID,
      productID
    );
    return res.status(200).json(result);
  } catch (error) {
    if (error instanceof Error) {
      // Now TypeScript knows 'error' is an instance of Error
      return next({ statusCode: 500, message: error.message });
    }

    // If error isn't an instance of Error, you can handle it here
    return next({ statusCode: 500, message: "An unknown error occurred." });
  }
};
