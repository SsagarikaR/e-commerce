import { Request,Response,NextFunction} from "express";
import { createPreferenceService,deletePreferenceService,fetchPreferencesService, updatePreferenceService } from "../services/db/prefernces";  // Import service


//create a new preference
export const createPreference = async (req:Request, res:Response,next:NextFunction) => {
  const userID=req.body.user.identifire;
  const { productID } = req.body;

  try {
    const result = await createPreferenceService(productID, userID);

    if (!result) {
      return res.status(400).json({ message: "Preference already exists" });
    }

    res.status(201).json({ message: "Preference created successfully", result });
    
  } catch (error) {
    return next({statusCode:500,message:"Error in adding prefernces, Please try again!"});
  }
};


//fetch prefernces
export const fetchPreferences = async (req:Request, res:Response,next:NextFunction) => {
  const userID  = req.body.user.identifire; 
  try {
    const preferences = await fetchPreferencesService(userID);

    if (!preferences) {
      return res.status(404).json({ message: "No preferences found for the user" });
    }

    res.status(200).json( preferences );
  } catch (error) {
    return next({statusCode:500,message:"Failed to fetch Preferences, Please try again!"});
  }
};



//delete prefrecnes
export const deletePreference = async (req:Request, res:Response,next:NextFunction) => {
    const { preferenceID } = req.params;
  
    try {
      const result = await deletePreferenceService(Number(preferenceID));
  
      res.status(200).json({ message: "Preference deleted successfully" });

    } catch (error) {
        return next({statusCode:500, message: "Failed to delete preference" });
    }
  };



//update prefernces
export const updatePreference = async (req:Request, res:Response,next:NextFunction) => {
  const { preferenceID } = req.params;
  const userID  = req.body.user.identifire; 
  const { productID} = req.body;

  try {
    const result = await updatePreferenceService(Number(preferenceID), productID, userID);

    if (!result) {
      return res.status(404).json({ message: "Preference not found or not updated" });
    }

    res.status(200).json({ message: "Preference updated successfully", result });

  } catch (error) {
    return next({statusCode:500, message: "Failed to update preference" });
  }
};

  
  
