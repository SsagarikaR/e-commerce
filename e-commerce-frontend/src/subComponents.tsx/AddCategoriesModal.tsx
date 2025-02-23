import { useState } from "react";
import crossIcon from "../assets/cross.png";
import { makeAuthorizedPatchRequest, makeAuthorizedPostRequest } from "../services/authorizedRequests";
import CloudinaryImageUpload from "../services/CloudinaryImageUpload";
import ModalInput from "./ModalInput";
import { validateInput } from "../utils/validations/validateInputs"; // import validateInput
import useToast from "../utils/useToast";

function AddCategoriesModal({ setToggleModal, setListChange, editCategory }: categoryModalProp) {
  const [categoryName, setCategoryName] = useState<string>(editCategory?.categoryName || "");
  const [categoryThumbnail, setCategoryThumbnail] = useState<string>(editCategory?.categoryThumbnail || "");
  const [uploadedFileName, setUploadedFileName] = useState("");
  const {success,error}=useToast;
  
  const [categoryNameError, setCategoryNameError] = useState<string>(""); // Error state for category name
  
  const data = {
    categoryName: categoryName,
    categoryThumbnail: categoryThumbnail
  };

  const fields = [
    {
      id: "category_name",
      value: categoryName,
      setValue: setCategoryName,
      field: "Category Name",
      error: categoryNameError,
      setError: setCategoryNameError,
    },
  ];

  const handleSubmit = async () => {
    let response;

    if (editCategory) {
      response = await makeAuthorizedPatchRequest("/categories", { categoryID: editCategory.categoryID, ...data });
    } else {
      response = await makeAuthorizedPostRequest("/categories", data);
    }

    if (response?.data) {
      setListChange((prev) => !prev);
      setToggleModal(false);
      success("Success")
    }
    else{
      error("something went wrong.Please try again!!")
    }
  };

  const checkError = (): boolean => {
    let isValid = true;

    // Validate category name and category thumbnail fields
    isValid = validateInput("category_name", categoryName, setCategoryNameError);
    console.log(isValid);
    console.log(categoryNameError);
    
    return isValid;
  };

  return (
    <div className="fixed p-6 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white z-10 w-200">
      <div className="4xl absolute right-2"><img src={crossIcon} className="w-8 h-8" onClick={() => { setToggleModal(false); }} /></div>
      <div className="text-4xl p-6 text-center font-bold text-blue-500 ">Add a new category</div>
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
          <label htmlFor="category_thumbnail" className="font-semibold text-xl w-70">Enter category thumbnail</label>
          <div>
            <CloudinaryImageUpload seturl={setCategoryThumbnail} setName={setUploadedFileName} />
            <div>{uploadedFileName}</div>
          </div>
        </div>
        <div className="flex justify-between p-4">
          <button className="w-50 shadow-lg bg-blue-500 p-2 text-black text-2xl font-semibold cursor-pointer" onClick={() => { setToggleModal(false); }}>
            Cancel
          </button>
          <button className="w-50 shadow-lg bg-blue-500 p-2 text-black text-2xl font-semibold cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              if (checkError()) {
                handleSubmit();
              }
            }}
          >
            {editCategory ? "Update" : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddCategoriesModal;
