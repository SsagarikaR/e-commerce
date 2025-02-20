import { Request, Response, NextFunction } from "express";
import { selectByProductID } from "../services/db/products";
import {addProductToWishList,
        selectByUserAndProduct ,
        getWishListByUserID,
        selectFromWishListByID,
        deleteFromWishList} from "../services/db/wishLists";
 

//  Controller to add an item to the user's wishlist
export const addToWishList = async (req: Request, res: Response, next: NextFunction) => {
  const { productID} = req.body;
  const userID = req.body.user.identifire;

  try {
    const [product] = await selectByProductID(productID);
    if (!product) {
      return next({ statusCode: 404, message: "Product not found" });
    }

    const existingCartItem = await selectByUserAndProduct(userID, productID);
    if (existingCartItem.length!==0)
    {
        return next({ statusCode: 403, message: "The item alraedy exists in the cart." });
    }

    const [result,metaData] = await addProductToWishList(userID, productID);
    return res.status(201).json({message:"Successfully added the product to cart."});
    
  } catch (error) {
    console.error(error);
    return next({ statusCode: 500, message: "Error in adding item to wish list, please try again" });
  }
};




// Controller to fetch all items in the users wish list
export const getWishListItems = async (req: Request, res: Response, next: NextFunction) => {
  const userID = req.body.user.identifire;

  try {

    const wishlist = await getWishListByUserID(userID);
    console.log(wishlist);
    if(wishlist.length===0){
        return next({ statusCode: 404, message: "No item found." });
    }
    else{
        return res.status(200).json(wishlist);
    }

  } catch (error) {
    console.log(error, "error");
    return next({ statusCode: 500, message: "Error in fetching item from wish list, please try again" });
  }
};




export const getWishListItemById=async(req: Request, res: Response, next: NextFunction)=>{
  const userID = req.body.user.identifire;
  const {id}=req.params;
  try{
      const isWishlist=await selectByUserAndProduct(userID,Number( id));
      console.log("wishlist",isWishlist)
      if(isWishlist.length===0){
        return next({ statusCode: 404, message: "No item found." });
      }
      else{
        return res.status(200).json(isWishlist);
      }
  }catch (error) {
    console.log(error, "error");
    return next({ statusCode: 500, message: "Error in fetching item from wish list, please try again" });
  }
}


// Controller to delete an item from the user's wishlist
export const deleteWishListItem = async (req: Request, res: Response, next: NextFunction) => {
  const { wishListID } = req.body;

  try {
    const wishlist = await selectFromWishListByID(wishListID);
    if (wishlist.length === 0) {
      return next({ statusCode: 404, message: "This item is not exist in the list" });
    }

    await deleteFromWishList(wishListID);
    return res.status(200).json({ message: "Successfully deleted the item from the list" });

  } catch (error) {
    console.error(error);
    return next({ statusCode: 500, message: "Server error, please try again" });
  }
};

