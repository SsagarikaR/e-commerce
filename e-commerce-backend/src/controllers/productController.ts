import { Request,Response } from "express";
import { selectProductWithAllMatch ,createNewProduct, getProductWithCondition, selectByProductID, deleteByProductID,updateProducts} from "../services/db/products";

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

      const isProductExist=await selectProductWithAllMatch(productName,productDescription,productPrice,categoryID);
      if(isProductExist.length>0){
          return res.status(403).json({error:"This product already exist."});
      }
      const [result,metaData]=await createNewProduct(productName,productDescription,productThumbnail,productPrice,categoryID)
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
  const { name, price, categoryID, id } = req.query;
  console.log(req.query);

  try {
    const products = await getProductWithCondition({
      categoryID: categoryID ? String(categoryID) : undefined,
      name: name ? String(name) : undefined,
      id: id ? Number(id) : undefined, 
      price: price === "low-to-high" || price === "high-to-low" ? (price as "low-to-high" | "high-to-low") : undefined,
    });

    if (products.length === 0) {
      return res.status(404).json({ message: "No products found" });
    }

    return res.status(200).json(products);
  } catch (error) {
    console.log(error, "error");
    return res.status(500).json({ error: "Please try again after sometime!" });
  }
};

  


export const deleteProducts=async(req:Request,res:Response)=>{
    console.log("data",req.body)
    const {productID}=req.body;
    try{
        const isProductExist=await selectByProductID(productID);
        if(isProductExist.length===0){
            return res.status(404).json({error:"This product doesn't exist"});
        }
        console.log(req.body)
        const deleteProduct=await deleteByProductID(productID)
        return res.status(200).json({message:"Successfully deletd the product"})
    }
    catch(error){
        console.log(req)
        console.log(error,"error");
        return res.status(500).json({error:"Please try again after sometimes!"})
    }
}

export const updateProduct=async(req:Request,res:Response)=>{
    const {productID,productName,productDescription,productThumbnail,productPrice,categoryID}=req.body;
    try{
        const isProductExist=await selectByProductID(productID);

        if(isProductExist.length===0){
            return res.status(403).json({error:"This product doesn't exist"});
        }
        const updatedProduct=await updateProducts(productName,productDescription,productThumbnail,productPrice,categoryID,productID)
            return res.status(200).json({message:"Successfully updated the product."})
    }
    catch(error){
        console.log(error,"error");
        return res.status(500).json({error:"Please try again after sometimes!"})
    }
}