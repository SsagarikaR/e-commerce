import { Request,Response,NextFunction } from "express";
import { selectProductWithAllMatch ,createNewProduct, getProductWithCondition, selectByProductID, deleteByProductID,updateProducts} from "../services/db/products";



//  controller to create a product
export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
    const { productName, productDescription, productThumbnail, productPrice, categoryID, brandID, stock } = req.body;
  
    try {
      if (!productName || !productDescription || !productThumbnail || !productPrice || !categoryID || !brandID || !stock) {
        return next({ statusCode: 400, message: "Please enter all the required fields." });
      }

      const isProductExist = await selectProductWithAllMatch(productName, productDescription, productPrice, categoryID, brandID);
      if (isProductExist.length > 0) {
        return next({ statusCode: 403, message: "This product already exists." });
      }
  
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
  


  // controller to fetch all product (by name,price,categoryID,productID or all products)
  export const getProducts = async (req: Request, res: Response, next: NextFunction) => {
    const { name, price, categoryID, id } = req.query;
    console.log("Query Parameters:", req.query);
  
    try {
      // Construct the filters to be passed to the service based on query parameters
      const filters = {
        categoryID: categoryID ? String(categoryID) : undefined,
        name: name ? String(name) : undefined, 
        id: id ? Number(id) : undefined, 
        price: price === "low-to-high" || price === "high-to-low" ? (price as "low-to-high" | "high-to-low") : undefined, // Price sorting if provided
      };
  
      // Fetch products based on the filters
      const products = await getProductWithCondition(filters);
  
    
      if (products.length === 0) {
        return next({ statusCode: 404, message: "No products found" });
      }
      return res.status(200).json(products);
    } 
    catch (error) {
      console.error("Error", error);
      return next({ statusCode: 500, message: "An error occurred while fetching products" });
    }
};


  


//controller to delete a product
export const deleteProducts = async (req: Request, res: Response, next: NextFunction) => {
    const { productID } = req.body;
    try {
      const isProductExist = await selectByProductID(productID);
      if (isProductExist.length === 0) {
        return next({ statusCode: 404, message: "This product doesn't exist" });
      }
  
      const deleteProduct = await deleteByProductID(productID);
      return res.status(200).json({ message: "Successfully deleted the product" });

    } catch (error) {
      console.log(error);
      return next({ statusCode: 500, message: "An error occurred while deleting products" });
    }
  };





  // controller to update a product
  export const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
    const { productID, productName, productDescription, productThumbnail, productPrice, categoryID } = req.body;
  
    try {
      const isProductExist = await selectByProductID(productID);
      if (isProductExist.length === 0) {
          return next({ statusCode: 404, message: "This product doesn't exist" });
      }

      const updatedProduct = await updateProducts(productName, productDescription, productThumbnail, productPrice, categoryID, productID);
      return res.status(200).json({ message: "Successfully updated the product." });
      
    } catch (error) {
      console.log(error,"error")
      return next({ statusCode: 500, message: "An error occurred while updating products" });
    }
  };
  
