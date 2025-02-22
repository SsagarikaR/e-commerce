import { insertPrefernce, selectPrefernceByProductANDUser,
    fetchPreference,updatePreference, 
    deletePreference} from "../../respository/prefernces";



// Service function for creating a preference
export const createPreferenceService = async (productID:number, userID:number) => {
  try {
    // First, check if the preference already exists
    const existingPreference= await selectPrefernceByProductANDUser(productID,userID)

    // If the preference exists, return null to prevent adding again
    if (existingPreference.length>0) {
      return null;
    }

    // Insert new preference if it doesn't exist
    const result = await insertPrefernce(productID,userID);

    return result;
  } catch (error) {
    console.log(error,"error");
    throw new Error("Error while creating preference: " );
  }
};


export const fetchPreferencesService = async (userID:number) => {
    console.log(userID,"got3")
    try {
      const preferences = await fetchPreference(userID);
      if (!preferences || preferences.length === 0) {
        return null; // No preferences found for the user
      }
      return preferences;
    } catch (error) {
        console.error(error);
      throw new Error("Error while selecting prefernces. Please try again!");
    }
};




export const updatePreferenceService = async (preferenceID:number, productID:number, userID:number) => {
  try {
    const result = await updatePreference(preferenceID, productID, userID);

    if (result[0] === 0) {
      return null; // No rows were updated (preference might not exist)
    }

    return result;
  } catch (error) {

    throw new Error("Error while updating prefernces. Please try again!");
  }
};



export const deletePreferenceService = async (preferenceID:number) => {
  try {
    const result = await deletePreference(preferenceID);

    return result;

  } catch (error) {
    throw new Error("Error while deleting prefernces. Please try again!");
  }
};

