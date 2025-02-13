import { sequelize } from "../config/databse";
import { Request,Response } from "express";
import { QueryTypes } from "sequelize";

export const createProduct=async(req:Request,res:Response)=>{
    const {name,description,thumbnail,price,categoryID}=req.body;
    try{
        if( name===""  || name===undefined || !name){
            return res.status(404).json({error:"Name can't be empty"});
        }
        if(description==="" || description===undefined || !description){
            return res.status(404).json({error:"Description can't be empty"});
        }
        if(thumbnail==="" || thumbnail===undefined || !thumbnail){
            return res.status(404).json({error:"Thumbnail No. can't be empty."});
        }
        if(price==="" || price===undefined || !price){
            return res.status(404).json({error:"Price role can't be empty."});
        }
        if(categoryID==="" || categoryID===undefined || !categoryID){
            return res.status(404).json({error:"Please choose a category role can't be empty."});
        }

        const isProductExist=await sequelize.query('SELECT * FROM Products WHERE name=? AND description=?  AND price=? AND categoryID=?',
            {
                replacements:[name,description,price,categoryID],
                type:QueryTypes.SELECT
            }
        )
        if(isProductExist.length>0){
            return res.status(403).json({error:"This product already exist."});
        }
        const [result,metaData]=await sequelize.query('INSERT INTO Products (name,description,thumbnail,price,categoryID) VALUES (?,?,?,?,?)',{
            replacements:[name,description,thumbnail,price,categoryID],
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
  const { name, price, categories } = req.query;  
  
  try {
    let query = `
      SELECT p.productID, p.name, p.description, p.thumbnail, p.price, p.categoryID, c.categoryName
      FROM Products p
      LEFT JOIN Categories c ON p.categoryID = c.categoryID
    `;
    let replacements: Array<any> = [];

    if (name) {
      query += ` WHERE p.name LIKE ?`;
      replacements.push(`%${name}%`);
    }

    if (price) {
      if (price === 'low') {
        query += replacements.length > 0 ? ` AND p.price ASC` : ` ORDER BY p.price ASC`;
      } else if (price === 'high') {
        query += replacements.length > 0 ? ` AND p.price DESC` : ` ORDER BY p.price DESC`;
      }
    }

    const products = await sequelize.query(query, {
      replacements: replacements,
      type: QueryTypes.SELECT,
    });

    if (products.length === 0) {
      return res.status(404).json({ message: "No products found" });
    }

    return res.status(200).json({ products });
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
    const {productID,name,description,thumbnail,price,categoryID}=req.body;
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
        const updatedProduct=await sequelize.query('UPDATE Products SET name=? ,description=? ,thumbnail=? ,price=? ,categoryID=? WHERE productID=?',{
            replacements:[name,description,thumbnail,price,categoryID,productID],
            type:QueryTypes.UPDATE
        })
        if(updatedProduct[1]>0){
            return res.status(200).json({message:"Successfully updated the product."})
        }
        else{
            return res.status(409).json({error:"Error in updating product."})
        }
    }
    catch(error){
        console.log(error,"error");
        return res.status(500).json({error:"Please try again after sometimes!"})
    }
}