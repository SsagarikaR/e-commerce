import { sequelize } from "../db/databse";
import { Request,Response } from "express";
import { QueryTypes } from "sequelize";

export const createCategories=async(req:Request,res:Response)=>{
    const {categoryName,categoryThumbnail}=req.body
    try{
        const isCategoryExist=await sequelize.query(`SELECT * FROM Categories WHERE categoryName=?`,{
            replacements:[categoryName],
            type:QueryTypes.SELECT
        })
        if(isCategoryExist.length!==0){
            return res.status(404).json({error:"This category already exist"})
        }
        const [result,metaData]=await sequelize.query('INSERT INTO Categories (categoryName,categoryThumbnail) VALUES (?,?)',{
            replacements:[categoryName,categoryThumbnail]
        })
        if(metaData!==0){
            return res.status(202).json({message:"Succesfully added a new category."})
        }
        else{
            return res.status(409).json({message:"Error in adding a new category."})
        }
    }
    catch(error){
        console.log(error,"error");
        return res.status(500).json({error:"Please try again after sometimes"})
    }
}

export const getCategories=async(req:Request,res:Response)=>{
    const {categoryName}=req.params;
    console.log(categoryName);
    try{
        if(categoryName){
            const categoryWithThisName=await sequelize.query('SELECT * FROM Categories WHERE categoryName=?',{
                replacements:[categoryName],
                type:QueryTypes.SELECT
            })
            if(categoryWithThisName.length===0){
                return res.status(404).json({message:`No catgeory with name ${categoryName} found.`});
            }
            else{
                return res.status(200).json(categoryWithThisName)
            }
        }
        const allCatgeories=await sequelize.query('SELECT * FROM Categories',{
            type:QueryTypes.SELECT
        });
        if(allCatgeories.length===0){
            return res.status(404).json({message:"No categories found."});
        }
        else{
            return res.status(200).json(allCatgeories);
        }
    }
    catch(error){
        console.log(error,"error");
        return res.status(500).json({error:"Please try again after sometimes!"})
    }
}

export const updateCategories=async(req:Request,res:Response)=>{
    const {categoryID,categoryName,categoryThumbnail}=req.body;
    try{
            const updateThumbnail=await sequelize.query(`UPDATE Categories SET categoryName=?, categoryThumbnail=? where categoryID=?`,
                {
                    replacements:[categoryName,categoryThumbnail,categoryID],
                    type:QueryTypes.UPDATE
                }
            )
            console.log(updateThumbnail);
                return res.status(200).json({message:"Successfully updated the category."});
    }
    catch(error){
        console.log(error,"error");
        return res.status(500).json({error:"Please try again after sometimes."})
    }
}

export const deletecategories=async(req:Request,res:Response)=>{
    const {categoryID}=req.body;
    try{
        const isCategoryExist=await sequelize.query('SELECT * FROM Categories WHERE categoryID=?',{
            replacements:[categoryID],
            type:QueryTypes.SELECT
        })
        if(isCategoryExist.length===0){
            return res.status(404).json({message:"This category not found"});
        }
        await sequelize.query('DELETE FROM Categories WHERE categoryID=?',{
            replacements:[categoryID],
            type:QueryTypes.DELETE
        })
        // console.log(deletecategories,"deleteCategory");
        return res.status(200).json({message:"Successfully deleted the category."});
    }
    catch(error){
        console.log(error,"error");
        return res.status(500).json({error:"Please try again after sometimes!"})
    }
}

