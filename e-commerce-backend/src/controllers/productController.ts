import { sequelize } from "../db/databse";
import { Request,Response } from "express";
import { QueryTypes } from "sequelize";

export const createProduct=async(req:Request,res:Response)=>{
    const {productName,productDescription,productThumbnail,productPrice,categoryID}=req.body;
    try{
        if( productName===""  || productName===undefined || !productName){
            return res.status(404).json({error:"Product's name can't be empty"});
        }
        if(productDescription==="" || productDescription===undefined || !productDescription){
            return res.status(404).json({error:"Product's description can't be empty"});
        }
        if(productThumbnail==="" || productThumbnail===undefined || !productThumbnail){
            return res.status(404).json({error:"Product's thumbnail No. can't be empty."});
        }
        if(productPrice==="" || productPrice===undefined || !productPrice){
            return res.status(404).json({error:"Product's price role can't be empty."});
        }
        if(categoryID==="" || categoryID===undefined || !categoryID){
            return res.status(404).json({error:"Please choose a category role can't be empty."});
        }

        const isProductExist=await sequelize.query('SELECT * FROM Products WHERE productName=? AND productDescription=?  AND productPrice=? AND categoryID=?',
            {
                replacements:[productName,productDescription,productPrice,categoryID],
                type:QueryTypes.SELECT
            }
        )
        if(isProductExist.length>0){
            return res.status(403).json({error:"This product already exist."});
        }
        const [result,metaData]=await sequelize.query('INSERT INTO Products (productName,productDescription,productThumbnail,productPrice,categoryID) VALUES (?,?,?,?,?)',{
            replacements:[productName,productDescription,productThumbnail,productPrice,categoryID],
            type:QueryTypes.INSERT
        });
        if(metaData>0){
            return res.status(202).json({message:"Successfully added the product."})
        }
        else{
            return res.status(409).json({error:"Error in adding a new product."})
        }
    }
    catch(error){
        console.log(error,"error");
        return res.status(500).json({error:"Please try again after sometimes!"});
    }
}


export const getProducts = async (req: Request, res: Response) => {
  const { name, price } = req.query;  
  
  try {
    let query = `
      SELECT p.productID, p.productName, p.productDescription, p.productThumbnail, p.productPrice, p.categoryID, c.categoryName
      FROM Products p
      LEFT JOIN Categories c ON p.categoryID = c.categoryID
    `;
    let replacements: Array<any> = [];

    if (name) {
      query += ` WHERE p.productName LIKE ?`;
      replacements.push(`%${name}%`);
    }

    if (price) {
      if (price === 'low-high') {
        query += replacements.length > 0 ? ` AND p.productPrice ASC` : ` ORDER BY p.productPrice ASC`;
      } else if (price === 'high-low') {
        query += replacements.length > 0 ? ` AND p.productPrice DESC` : ` ORDER BY p.productPrice DESC`;
      }
    }

    const products = await sequelize.query(query, {
      replacements: replacements,
      type: QueryTypes.SELECT,
    });

    if (products.length === 0) {
      return res.status(404).json({ message: "No products found" });
    }

    return res.status(200).json( products );
  } catch (error) {
    console.log(error, "error");
    return res.status(500).json({ error: "Please try again after sometime!" });
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