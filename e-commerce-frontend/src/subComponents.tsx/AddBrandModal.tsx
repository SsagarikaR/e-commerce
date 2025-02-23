import { useState } from "react";
import crossIcon from "../assets/cross.png";
import { makeAuthorizedPatchRequest, makeAuthorizedPostRequest } from "../services/authorizedRequests";
import CloudinaryImageUpload from "../services/CloudinaryImageUpload";
import ModalInput from "../subComponents.tsx/ModalInput";
import { validateInput } from "../utils/validations/validateInputs"; 
import useToast from "../utils/useToast";

function AddBrandModal({ setToggleModal, setListChange, editBrand }: brandModalProp) {
  const [brandName, setBrandName] = useState<string>(editBrand?.brandName || "");
  const [brandThumbnail, setBrandThumbnail] = useState<string>(editBrand?.brandThumbnail || "");
  const [uploadedFileName, setUploadedFileName] = useState<string>("");

  const [brandNameError, setBrandNameError] = useState<string>(""); // Error state for brand name
  const {success,error}=useToast

  // Data to send in the parameter on making the API call
  const data = {
    brandName: brandName,
    brandThumbnail: brandThumbnail,
  };

  // Input text fields of the form
  const fields = [
    {
      id: "brand_name",
      value: brandName,
      setValue: setBrandName,
      field: "brand name",
      error: brandNameError,
      setError: setBrandNameError,
    }
  ];

  /**
   * Handle submission
   */
  const handleSubmit = async () => {
    console.log("Response of adding post");
    let response;

    if (editBrand) {
      response = await makeAuthorizedPatchRequest("/brands", { editBrand: editBrand.brandID, ...data }); // if the edit brand is present then update the field
    } else {
      response = await makeAuthorizedPostRequest("/brands", data); // else add a new brand
    }
    console.log(response, "Response of adding post");
    if (response?.data) {
      setListChange((prev) => !prev);
      setToggleModal(false);
      success("Success")
    }
    else{
      error("something went wrong.Please try again!!")
    }
  };


  //Check for any input errors before submitting the form
  const checkError = (): boolean => {
    let isValid = true;

    // Validate brand name and brand thumbnail fields
    isValid = validateInput("brand_name", brandName, setBrandNameError) && isValid;
    
    console.log("Validation result:", isValid);
    return isValid;
  };

  return (
    <div className="fixed p-6 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white z-10 w-200">
      <div className="4xl absolute right-2">
        <img src={crossIcon} className="w-8 h-8" onClick={() => { setToggleModal(false) }} />
      </div>
      <div className="text-4xl p-6 text-center font-bold text-blue-500 ">Add a new brand</div>
      <div className="text-lg text-gray-600 p-2 flex flex-col gap-6">
        {fields.map((field) => (
          <ModalInput
            key={field.id}
            id={field.id}
            value={field.value}
            setValue={field.setValue}
            field={field.field}
            error={field.error}
            setError={field.setError}
          />
        ))}
        <div className="flex">
          <label htmlFor="category_thumbnail" className="font-semibold text-xl  w-70 ">Enter brand thumbnail</label>
          <div>
            <CloudinaryImageUpload seturl={setBrandThumbnail} setName={setUploadedFileName} />
            <div>{uploadedFileName}</div>
          </div>
        </div>
        <div className="flex justify-between p-4">
          <button
            className="w-50 shadow-lg bg-blue-500 p-2 text-black text-2xl font-semibold cursor-pointer"
            onClick={() => {
              setToggleModal(false);
            }}
          >
            Cancel
          </button>
          <button
            className="w-50 shadow-lg bg-blue-500 p-2 text-black text-2xl font-semibold cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              if (checkError()) {
                handleSubmit();
              }
            }}
          >
            {editBrand ? "Update" : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddBrandModal;
