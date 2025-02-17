import { Request,Response } from "express";
import { createNewCategory, deleteCatgeory, selectAllCatgeory, selectCatgeoryByID, selectCatgeoryByName, updateTheCatgeory } from "../services/db/categories";

export const createCategories=async(req:Request,res:Response)=>{
    const {categoryName,categoryThumbnail}=req.body
    try{
        const isCategoryExist=await selectCatgeoryByName(categoryName)
        if(isCategoryExist.length!==0){
            return res.status(404).json({error:"This category already exist"})
        }
        const [result,metaData]=await createNewCategory(categoryName,categoryThumbnail);
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
    const {name}=req.query;
    console.log(req.query,"query");
    console.log(name);
    try{
        if(name){
            if(typeof name==="string"){
                const categoryWithThisName=await selectCatgeoryByName(name);
                if(categoryWithThisName.length===0){
                    return res.status(404).json({message:`No catgeory with name ${name} found.`});
                }
                else{
                    return res.status(200).json(categoryWithThisName)
                }
            }
        }
        const allCatgeories=await selectAllCatgeory();
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
            const updateThumbnail=await updateTheCatgeory(categoryName,categoryThumbnail,categoryID);
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
        const isCategoryExist=await selectCatgeoryByID(categoryID)
        if(isCategoryExist.length===0){
            return res.status(404).json({message:"This category not found"});
        }
        await deleteCatgeory(categoryID);
        // console.log(deletecategories,"deleteCategory");
        return res.status(200).json({message:"Successfully deleted the category."});
    }
    catch(error){
        console.log(error,"error");
        return res.status(500).json({error:"Please try again after sometimes!"})
    }
}

