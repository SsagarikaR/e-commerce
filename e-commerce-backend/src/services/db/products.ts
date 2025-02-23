import { selectProductWithAllMatch, createNewProduct, getProductWithCondition, selectByProductID, deleteByProductID, updateProducts } from "../../respository/products";
import { invalidateCache,getCache,setCache } from "../../helpers/cacheHelper";

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
    // After product creation, clear the cache for affected product lists
    const cacheKey = `products:${JSON.stringify({ categoryID })}:page:1:limit:20`; // Example cache key for the category (you can customize this based on your filtering needs)
    invalidateCache(cacheKey); // Invalidate the cache for category and product list

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
  
  const cachedProducts = getCache(cacheKey);
  if (cachedProducts) {
    // Return cached products if available
    return cachedProducts;
  }

  const products = await getProductWithCondition(filters, page, limit);
  if (products.length === 0) {
    throw new Error("No products found.");
  }

  // Store the fetched products in the cache for future requests
  setCache(cacheKey, products);
  
  return products;
};

// Service to delete a product
export const deleteProductService = async (productID: number) => {
  const isProductExist = await selectByProductID(productID);
  if (isProductExist.length === 0) {
    throw new Error("This product doesn't exist.");
  }

  // Delete the product from the database
  await deleteByProductID(productID);

  // After deleting, invalidate the cache for affected product lists
  const cacheKey = `products:${JSON.stringify({ id: productID })}:page:1:limit:20`; // Customize this to match the cache keys for your filtering
  invalidateCache(cacheKey); // Invalidate cache for the specific product list (could be more detailed)

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

  // Update the product details in the database
  await updateProducts(productName, productDescription, productThumbnail, productPrice, categoryID, productID);

  // After updating, invalidate the cache for affected product lists
  const cacheKey = `products:${JSON.stringify({ categoryID })}:page:1:limit:20`; // Example cache key for the category
  invalidateCache(cacheKey); // Invalidate cache for the category or any other applicable product filters

  return { success: true, message: "Successfully updated the product." };
};
