import { useEffect, useState } from "react";
import { makeUnAuthorizedGetRequest } from "../services/unAuthorizedRequest";
import crossIcon from "../assets/cross.png";
import { makeAuthorizedPatchRequest, makeAuthorizedPostRequest } from "../services/authorizedRequests";
import CloudinaryImageUpload from "../services/CloudinaryImageUpload";
import ModalInput from "./ModalInput";

function AddProductModal({
  setToggleModal,
  setListChange,
  editProduct
}: forProductModalProp) {
  const [productName, setProductName] = useState(editProduct?.productName || "");
  const [productDescription, setProductDescription] = useState(editProduct?.productDescription || "");
  const [productThumbnail, setProductThumbnail] = useState(editProduct?.ProductThumbnail || "");
  const [stock,setStock]=useState(editProduct?.stock || " ")
  const [uploadedFileName, setUploadedFileName] = useState(""); 
  const [productPrice, setProductPrice] = useState(editProduct?.productPrice.toString() || "");
  const [categoryID, setCategoryID] = useState(editProduct?.categoryID || "");
  const [categories, setCategories] = useState<forCategories[]>();
  const [brandID, setBrandID] = useState(editProduct?.brandID || "");
  const [brands,setBrands]=useState<forBrand[]>();
  console.log(uploadedFileName);

   // data to send in the parameter on making api call
  const data = {
    productName: productName,
    productDescription: productDescription,
    productThumbnail: productThumbnail,
    productPrice: productPrice,
    stock:stock,
    brandID:brandID,
    categoryID: categoryID,
  };

  
  //Input text fields of the form fields
  const fields=[
    {
      id:"product_name",
      value:productName,
      setValue:setProductName,
      field:"product name"
    },
    {
      id:"product_price",
      value:productPrice,
      setValue:setProductPrice,
      field:"product price"
    },
    {
      id:"stock",
      value:stock,
      setValue:setStock,
      field:"stock"
    }
  ]

  /**
   * fetch categories to show the category list to add in the products category
   */
  const getCatgeories = async () => {
    const response = await makeUnAuthorizedGetRequest("/categories");
    setCategories(response?.data);
  };

  /**
   * fetch brands to show the brands list to add in the products brand
   */
  const getBrands=async () =>{
    const response = await makeUnAuthorizedGetRequest("/brands");
    setBrands(response?.data);
  }

  /**
   * handle submit
   */
  const handleSubmit = async () => {
    let response;
    if (editProduct) {
      // If productData exists, update the product
      response = await makeAuthorizedPatchRequest(`/products`, {productID:editProduct.productID,...data});
    } else {
      // Otherwise, add a new product
      response = await makeAuthorizedPostRequest("/products", data);
    }
    console.log(response);
    if (response?.data) {
      console.log("list changed")
      // console.log(listChange);
      setListChange(prev=>!prev);
      // console.log(listChange);
      setToggleModal(false);
    }
  };

  useEffect(() => {
    getCatgeories();
    getBrands();
  },[]);

  return (
    <div className="fixed p-6 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white z-10 w-200">
      <div className="4xl absolute right-2">
        <img
          src={crossIcon}
          className="w-8 h-8"
          onClick={() => {
            setToggleModal(false);
          }}
        />
      </div>
      <div className="text-4xl p-6 text-center font-bold text-blue-500 ">
        Add a new product
      </div>
      <div className="text-lg text-gray-600 p-2 flex flex-col gap-6">
        {
          fields.map((field)=>(
             <ModalInput 
              id={field.id}
              value={field.value}
              setValue={field.setValue}
              field={field.field}
             />
          ))
        }
        <div className="flex ">
          <label htmlFor="product_description" className="font-semibold text-xl w-70 ">
            Enter product description
          </label>
          <textarea
            id="product_description"
            className="border p-2 outline-none w-91"
            value={productDescription}
            onChange={(e) => {
              setProductDescription(e.target.value);
            }}
          ></textarea>
        </div>
        <div className="flex ">
          <label htmlFor="product_thumbnail" className="font-semibold text-xl  w-70 ">
            Select product thumbnail
          </label>
          <div>
           <CloudinaryImageUpload seturl={setProductThumbnail} setName={setUploadedFileName} />
           <div>{uploadedFileName}</div>
           </div>
        </div>
        <div className="flex">
          <label className="font-semibold text-xl w-70">Select category</label>
          <select
            className=" border p-2  outline-none w-91"
            onChange={(e) => {
              setCategoryID(e.target.value);
            }}
          >
            <option disabled selected>
              --Select catgeory--
            </option>
            {categories &&
              categories.map((catgeory) => (
                <option value={catgeory.categoryID}>
                  {catgeory.categoryName}
                </option>
              ))}
          </select>
        </div>
        <div className="flex">
          <label className="font-semibold text-xl w-70">Select brand</label>
          <select
            className=" border p-2  outline-none w-91"
            onChange={(e) => {
             setBrandID(e.target.value);
            }}
          >
            <option disabled selected>
              --Select brand--
            </option>
            {brands &&
              brands.map((brand) => (
                <option value={brand.brandID}>
                  {brand.brandName}
                </option>
              ))}
          </select>
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
          <button className="w-50 shadow-lg bg-blue-500 p-2 text-black text-2xl font-semibold cursor-pointer" 
            onClick={()=>{ handleSubmit(); }}>
            {editProduct ? "Update" : "Add"} 
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddProductModal;
