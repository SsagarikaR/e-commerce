import { Request,Response,NextFunction } from "express";



// Middleware to validate data for creating a new product
export const validateCreateProductData = (req: Request, res: Response, next: NextFunction) => {
    const {
      productName,
      productDescription,
      productThumbnail,
      productPrice,
      categoryID,
      brandID,
      stock
    } = req.body;
  
    // Validate required fields
    if (!productName || !productDescription || !productThumbnail || !productPrice || !categoryID || !brandID || !stock) {
      return next({ statusCode: 400, message: "All fields are required: productName, productDescription, productThumbnail, productPrice, categoryID, brandID, and stock" });
    }
 
    if (productName.length < 3 || productName.length > 100) {
      return next({ statusCode: 400, message: "Product name must be between 3 and 100 characters" });
    }
  

    if (isNaN(Number(productPrice)) || Number(productPrice) <= 0) {
      return next({ statusCode: 400, message: "Product price must be a positive number" });
    }
  
    if (isNaN(Number(stock)) || Number(stock) < 0) {
      return next({ statusCode: 400, message: "Stock must be a non-negative integer" });
    }
  
    if (isNaN(Number(categoryID)) || isNaN(Number(brandID))) {
      return next({ statusCode: 400, message: "Category ID and Brand ID must be valid integers" });
    }
  
    const urlRegex = /^(https?:\/\/)?([\w\d-]+\.)+[a-z]{2,6}(\/[^\s]*)?$/i;
    if (!urlRegex.test(productThumbnail)) {
      return next({ statusCode: 400, message: "Product thumbnail must be a valid URL" });
    }
  
    next();
  };




  // Middleware to validate data for updating an existing product
export const validateUpdateProductData = (req: Request, res: Response, next: NextFunction) => {
    const {
      productID,
      productName,
      productDescription,
      productThumbnail,
      productPrice,
      categoryID,
      stock
    } = req.body;
  
    if (!productID) {
      return next({ statusCode: 400, message: "Product ID is required" });
    }
  
    if (!productName && !productDescription && !productThumbnail && !productPrice && !categoryID && !stock) {
      return next({ statusCode: 400, message: "At least one field must be provided for updating the product" });
    }
  
    if (productName && (productName.length < 3 || productName.length > 100)) {
      return next({ statusCode: 400, message: "Product name must be between 3 and 100 characters" });
    }
  
    if (productPrice && (isNaN(Number(productPrice)) || Number(productPrice) <= 0)) {
      return next({ statusCode: 400, message: "Product price must be a positive number" });
    }
  
    if (stock && (isNaN(Number(stock)) || Number(stock) < 0)) {
      return next({ statusCode: 400, message: "Stock must be a non-negative integer" });
    }
  
    if (categoryID && isNaN(Number(categoryID))) {
      return next({ statusCode: 400, message: "Category ID must be a valid integer" });
    }
  
    if (productThumbnail && !/^(https?:\/\/)?([\w\d-]+\.)+[a-z]{2,6}(\/[^\s]*)?$/i.test(productThumbnail)) {
      return next({ statusCode: 400, message: "Product thumbnail must be a valid URL" });
    }
  
    next();
  };
  
  