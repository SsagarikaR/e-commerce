import { Request,Response,NextFunction } from "express";
import { selectProductWithAllMatch ,createNewProduct, getProductWithCondition, selectByProductID, deleteByProductID,updateProducts} from "../services/db/products";


/**
 * controller to create a product
 */
export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
    const { productName, productDescription, productThumbnail, productPrice, categoryID, brandID, stock } = req.body;
  
    try {
      // Check for missing fields
      if (!productName || !productDescription || !productThumbnail || !productPrice || !categoryID || !brandID || !stock) {
        return next({ statusCode: 400, message: "Please enter all the required fields." });
      }
  
      // Check if the product already exists
      const isProductExist = await selectProductWithAllMatch(productName, productDescription, productPrice, categoryID, brandID);
      if (isProductExist.length > 0) {
        return next({ statusCode: 403, message: "This product already exists." });
      }
  
      // Create the new product
      const [result, metaData] = await createNewProduct(productName, productDescription, productThumbnail, productPrice, categoryID, brandID, stock);
      if (metaData > 0) {
        return res.status(202).json({ message: "Successfully added the product." });
      } else {
        return next({ statusCode: 409, message: "Error in adding a new product." });
      }
    } catch (error) {
      console.log(error);
      return next({ statusCode: 500, message: "An error occurred while creating products" });
    }
  };
  

/**
 * controller to fetch all product (by name,price,categoryID,productID or all products)
 */
  export const getProducts = async (req: Request, res: Response, next: NextFunction) => {
    const { name, price, categoryID, id } = req.query;
  
    // Log incoming query parameters for debugging purposes
    console.log("Query Parameters:", req.query);
  
    try {
      // Construct the filters to be passed to the service based on query parameters
      const filters = {
        categoryID: categoryID ? String(categoryID) : undefined, // Category filter if provided
        name: name ? String(name) : undefined, // Name filter if provided
        id: id ? Number(id) : undefined, // Product ID filter if provided
        price: price === "low-to-high" || price === "high-to-low" ? (price as "low-to-high" | "high-to-low") : undefined, // Price sorting if provided
      };
  
      // Fetch products based on the filters
      const products = await getProductWithCondition(filters);
  
      // Check if no products were found, if so return a 404 response
      if (products.length === 0) {
        return next({ statusCode: 404, message: "No products found" });
      }
  
      // If products are found, return them with a 200 status
      return res.status(200).json(products);
    } catch (error) {
      // If an error occurs, pass the error to the global error handler
      console.error("Error", error);

      // Pass the actual error to next()
      return next({ statusCode: 500, message: "An error occurred while fetching products" });
    }
};


  

/**
 * controller to delete a product
 */
export const deleteProducts = async (req: Request, res: Response, next: NextFunction) => {
    const { productID } = req.body;
    try {
      //fetch the product to be delete
      const isProductExist = await selectByProductID(productID);
      //if the product doesnt exist return them with 404 response
      if (isProductExist.length === 0) {
        return next({ statusCode: 404, message: "This product doesn't exist" });
      }
  
      //if product is deleted successfully then return success message a 200 status code
      const deleteProduct = await deleteByProductID(productID);
      return res.status(200).json({ message: "Successfully deleted the product" });

    } catch (error) {
      // If an error occurs, pass the error to the global error handler
      console.log(error);
      return next({ statusCode: 500, message: "An error occurred while deleting products" });
    }
  };




/**
 * controller to update a product
 */
  export const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
      const { productID, productName, productDescription, productThumbnail, productPrice, categoryID } = req.body;
  
      try {
        //fetch the product to be update
          const isProductExist = await selectByProductID(productID);
        //if the product doesn't exist return response with 404 status
          if (isProductExist.length === 0) {
              return next({ statusCode: 404, message: "This product doesn't exist" });
          }
  
           //if product is deleted successfully then return success message a 200 status code
          const updatedProduct = await updateProducts(productName, productDescription, productThumbnail, productPrice, categoryID, productID);
          return res.status(200).json({ message: "Successfully updated the product." });
      } catch (error) {
        // If an error occurs, pass the error to the global error handler
          console.log(error,"error")
          return next({ statusCode: 500, message: "An error occurred while updating products" });
      }
  };
  
