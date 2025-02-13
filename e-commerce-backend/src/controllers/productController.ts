import { sequelize } from "../db/databse";
import { Request,Response } from "express";
import { QueryTypes } from "sequelize";

export const createProduct = async (req: Request, res: Response) => {
    const { productName, productDescription, productThumbnail, productPrice, categoryID, brandID } = req.body;
  
    try {
        if(!productName || !productDescription || !productThumbnail || !productPrice || !categoryID || !brandID){
            return res.status(403).json({message:"Please enter the required files."})
        }
      const category = await sequelize.query('SELECT * FROM Categories WHERE categoryID = ?', {
        replacements: [categoryID],
        type: QueryTypes.SELECT,
      });
  
      if (category.length === 0) {
        return res.status(404).json({ error: "Category not found!" });
      }
  
      const brand = await sequelize.query('SELECT * FROM brands WHERE brandID = ?', {
        replacements: [brandID],
        type: QueryTypes.SELECT,
      });
  
      if (brand.length === 0) {
        return res.status(404).json({ error: "Brand not found!" });
      }
  
      const [result, metadata] = await sequelize.query('INSERT INTO Products (productName, productDescription, productThumbnail, productPrice, categoryID, brandID) VALUES (?, ?, ?, ?, ?, ?)', {
        replacements: [productName, productDescription, productThumbnail, productPrice, categoryID, brandID],
      });
  
      if (metadata !== 0) {
        return res.status(201).json({ message: "Product successfully added." });
      } else {
        return res.status(500).json({ error: "Failed to add product!" });
      }
    } catch (error) {
      console.log(error, "error");
      return res.status(500).json({ error: "Internal server error!" });
    }
  };


  export const getProducts = async (req: Request, res: Response) => {
    const { categoryID, brandID, productName } = req.query;  
  
    try {
      let whereClause = [];
      let replacements: string[] = [];
  
      if (categoryID) {
        whereClause.push("categoryID = ?");
        replacements.push(categoryID as string);
      }
  
      if (brandID) {
        whereClause.push("brandID = ?");
        replacements.push(brandID as string);
      }
  
      if (productName) {
        whereClause.push("productName LIKE ?");
        replacements.push(`%${productName}%`); 
      }
  
      let whereQuery = whereClause.length > 0 ? "WHERE " + whereClause.join(" AND ") : "";
  
      const query = `
        SELECT * FROM Products
        ${whereQuery}
        ORDER BY productName;  -- Optional: You can add ordering logic based on your needs
      `;
  
      const products = await sequelize.query(query, {
        replacements,
        type: QueryTypes.SELECT,
      });
  
      if (products.length === 0) {
        return res.status(404).json({ message: "No products found." });
      }
  
      return res.status(200).json(products);
    } catch (error) {
      console.log(error, "error");
      return res.status(500).json({ error: "Please try again later!" });
    }
  };


export const deleteProducts=async(req:Request,res:Response)=>{
    const {productID}=req.body;
    try{
        const isProductExist=await sequelize.query('SELECT * FROM Products WHERE productID=?',
            {
                replacements:[productID],
                type:QueryTypes.SELECT
            }
        )
        if(isProductExist.length===0){
            return res.status(403).json({error:"This product doesn't exist"});
        }
        const deleteProduct=await sequelize.query('DELETE FROM Products WHERE productID=?',{
            replacements:[productID],
            type:QueryTypes.DELETE
        });
        return res.status(200).json({message:"Successfully deletd the product"})
    }
    catch(error){
        console.log(error,"error");
        return res.status(500).json({error:"Please try again after sometimes!"})
    }
}

export const updateProduct=async(req:Request,res:Response)=>{
    const {productID,productName,productDescription,productThumbnail,productPrice,categoryID}=req.body;
    try{
        const isProductExist=await sequelize.query('SELECT * FROM Products WHERE productID=?',
            {
                replacements:[productID],
                type:QueryTypes.SELECT
            }
        )
        if(isProductExist.length===0){
            return res.status(403).json({error:"This product doesn't exist"});
        }
        const updatedProduct=await sequelize.query('UPDATE Products SET productName=? ,productDescription=? ,productThumbnail=? ,productPrice=? ,categoryID=? WHERE productID=?',{
            replacements:[productName,productDescription,productThumbnail,productPrice,categoryID,productID],
            type:QueryTypes.UPDATE
        })
            return res.status(200).json({message:"Successfully updated the product."})
    }
    catch(error){
        console.log(error,"error");
        return res.status(500).json({error:"Please try again after sometimes!"})
    }
}