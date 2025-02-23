import { selectProductWithAllMatch, createNewProduct, getProductWithCondition, selectByProductID, deleteByProductID, updateProducts } from "../../respository/products";
import NodeCache from 'node-cache';

const cache = new NodeCache({ stdTTL: 3600, checkperiod: 600 });


// Service to create a new product
export const createProductService = async (
  productName: string,
  productDescription: string,
  productThumbnail: string,
  productPrice: number,
  categoryID: number,
  brandID: number,
  stock: number
) => {
  // Check if product already exists
  const isProductExist = await selectProductWithAllMatch(productName, productDescription, productPrice, categoryID, brandID);
  if (isProductExist.length > 0) {
    throw new Error("This product already exists.");
  }

  const [result, metaData] = await createNewProduct(
    productName,
    productDescription,
    productThumbnail,
    productPrice,
    categoryID,
    brandID,
    stock
  );

  if (metaData > 0) {
    return { success: true, message: "Successfully added the product." };
  } else {
    throw new Error("Error in adding a new product.");
  }
};






// Service to fetch products with condition (filters), including caching logic
export const getProductsService = async (
  filters: { categoryID?: string | number, name?: string, id?: string | number, price?: "low-to-high" | "high-to-low" },
  page: number,
  limit: number
) => {
  // Generate a unique cache key based on filters, page, and limit
  const cacheKey = `products:${JSON.stringify(filters)}:page:${page}:limit:${limit}`;
  
  const cachedProducts = cache.get(cacheKey);
  if (cachedProducts) {
    // console.log('Returning cached products',cachedProducts);
    return cachedProducts;
  }

  const products = await getProductWithCondition(filters, page, limit);
  if (products.length === 0) {
    throw new Error("No products found.");
  }

  // Store the fetched products in the cache for future requests
  cache.set(cacheKey, products);
  
  return products;
};







// Service to delete a product
export const deleteProductService = async (productID: number) => {
  const isProductExist = await selectByProductID(productID);
  if (isProductExist.length === 0) {
    throw new Error("This product doesn't exist.");
  }

  await deleteByProductID(productID);
  return { success: true, message: "Successfully deleted the product" };
};







// Service to update a product
export const updateProductService = async (
  productName: string,
  productDescription: string,
  productThumbnail: string,
  productPrice: number,
  categoryID: number,
  productID: number
) => {
  const isProductExist = await selectByProductID(productID);
  if (isProductExist.length === 0) {
    throw new Error("This product doesn't exist.");
  }

  await updateProducts(productName, productDescription, productThumbnail, productPrice, categoryID, productID);
  return { success: true, message: "Successfully updated the product." };
};
