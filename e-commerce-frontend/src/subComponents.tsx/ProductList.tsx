import editIcon from "../assets/edit.png";
import deleteIcon from "../assets/delete.png";
import {  forProductListProp } from "../interface/interface";
import { makeAuthorizedDeleteRequest } from "../services/authorizedRequests";

function ProductList({data,setListChange,listChange,setEditProduct,setToggleModal}:forProductListProp) {
  const deleteProduct=async(productID:number)=>{
    console.log(productID);
    const response=await makeAuthorizedDeleteRequest(`/products/`,{productID:productID})
    if(response?.data){
      setListChange(!listChange);
    }
  }
  
  return (
    <table className="w-full border-collapse border border-gray-400 text-lg text-gray-700">
            <thead>
              <tr>
                <th className="border border-gray-400 p-5">Product Name</th>
                <th className="border border-gray-400 p-5">Category</th>
                <th className="border border-gray-400 p-5">Price</th>
                <th className="border border-gray-400 p-5">Action</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((d) => (
                <tr key={d.productID}>
                  <td className="border border-gray-400 p-2">
                    <div className="flex items-center space-x-2">
                      <img src={d.ProductThumbnail} className="w-15 h-15 shadow-lg " />
                      <span>{d.productName}</span>
                    </div>
                  </td>
                  <td className="border border-gray-400 p-2">
                    {d.categoryName}
                  </td>
                  <td className="border border-gray-400 p-2">
                    {d.productPrice}
                  </td>
                  <td className="border border-gray-400 p-2">
                    <div className="flex space-x-2">
                      <img src={editIcon} className="w-10 h-10 p-1" onClick={()=>{setEditProduct(d); setToggleModal(true)}}/>
                      <img src={deleteIcon} className="w-10 h-10 p-1" onClick={()=>{deleteProduct(d.productID)}}/>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
  )
}

export default ProductList
