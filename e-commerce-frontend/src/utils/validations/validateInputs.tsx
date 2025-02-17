import { validations } from "./validationRules";

export const validateInput = (
    field: string,
    value: string,
    setError: React.Dispatch<React.SetStateAction<string>>
  ): boolean => {
    let isValid = true;
  
    for (const key in validations[field]) {
      if (validations[field][key].logic(value)) {
        setError(validations[field][key].message);
        console.log(`${field} error:`, validations[field][key].message);
        isValid = false;
        break;
      } else {
        setError("");
      }
    }
  
    console.log(`${field} validation result:`, isValid);
    return isValid;
  };