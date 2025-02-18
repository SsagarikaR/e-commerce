import { useState } from "react"
import crossIcon from "../assets/cross.png";
import { makeAuthorizedPatchRequest, makeAuthorizedPostRequest } from "../services/authorizedRequests";
import CloudinaryImageUpload from "../services/CloudinaryImageUpload";


function AddBrandModal({setToggleModal,setListChange,editBrand}:forBrandModalProp) {

    const [brandName,setBrandName]=useState<string>(editBrand?.brandName || "");
    const [brandThumbnail,setBrandThumbnail]=useState<string>(editBrand?.brandThumbnail|| "");
    const [uploadedFileName,setUploadedFileName]=useState<string>("");
  
    const data={
     brandName:brandName,
     brandThumbnail:brandThumbnail
    }
  
  
    const handleSubmit=async()=>{
        console.log("Respnse of adding post")
        let response;
        if(editBrand){
          response=await makeAuthorizedPatchRequest("/brands",{editBrand:editBrand.brandID,...data});
  
        }
        else{
          response=await makeAuthorizedPostRequest("/brands",data);
        }
        console.log(response,"Respnse of adding post")
        if (response?.data) {
          setListChange(prev=>!prev);
          setToggleModal(false);
        }
    }
  
  return (
    <div className="fixed p-6 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white z-10 w-200">
    <div className="4xl absolute right-2"><img src={crossIcon} className="w-8 h-8" onClick={()=>{setToggleModal(false)}}/></div>
    <div className="text-4xl p-6 text-center font-bold text-blue-500 ">Add a new category</div>
    <div className="text-lg text-gray-600 p-2 flex flex-col gap-6">
      <div className="flex">
        <label htmlFor="category_name" className="font-semibold text-xl w-70 ">Enter brand name</label>
        <input id="categroy_name " className="border p-2 outline-none" value={brandName} onChange={(e)=>{setBrandName(e.target.value)}}/>
      </div>
      <div className="flex">
         <label htmlFor="category_thumbnail" className="font-semibold text-xl  w-70 ">Enter brand thumbnail</label>
          <div>
            <CloudinaryImageUpload seturl={setBrandThumbnail} setName={setUploadedFileName} />
            <div>{uploadedFileName}</div>
          </div>
      </div>
      <div className="flex justify-between p-4">
        <button className="w-50 shadow-lg bg-blue-500 p-2 text-black text-2xl font-semibold cursor-pointer" 
          onClick={()=>{
            setToggleModal(false)
          }}
        >Cancel</button>
        <button className="w-50 shadow-lg bg-blue-500 p-2 text-black text-2xl font-semibold cursor-pointer" 
           onClick={(e)=>{
            e.preventDefault();
            handleSubmit();
           }}
        >
          {editBrand?"Update":"Add"}</button>
      </div>
    </div>
  </div>
  )
}

export default AddBrandModal
