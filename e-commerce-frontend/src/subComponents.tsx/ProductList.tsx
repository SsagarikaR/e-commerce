import editIcon from "../assets/edit.png";
import deleteIcon from "../assets/delete.png";
import { PRODUCT_LIST_HEADING } from "../constants/adminListTablesConst";

function ProductList({data,setEditProduct,setToggleModal,setIsDelete,setDeleteProductID}:forProductListProp) {
  
  return (
    <table className="w-full border-collapse border border-gray-400 text-lg text-gray-700 ">
            <thead>
              <tr>
                <th className="border border-gray-400 p-5">{PRODUCT_LIST_HEADING.product_name}</th>
                <th className="border border-gray-400 p-5">{PRODUCT_LIST_HEADING.category}</th>
                <th className="border border-gray-400 p-5">{PRODUCT_LIST_HEADING.price}</th>
                <th className="border border-gray-400 p-5">{PRODUCT_LIST_HEADING.stock}</th>
                <th className="border border-gray-400 p-5">{PRODUCT_LIST_HEADING.brand}</th>
                <th className="border border-gray-400 p-5">{PRODUCT_LIST_HEADING.action}</th>
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
                  ₹{d.productPrice}
                  </td>
                  <td className="border border-gray-400 p-2">
                  {d.stock}
                  </td>
                  <td className="border border-gray-400 p-2">
                    <div className="flex items-center space-x-2">
                      <img src={d.brandThumbnail} className="w-10 h-10 shadow-lg rounded-full border" />
                      <span>{d.brandName}</span>
                    </div>
                  </td>
                  <td className="border border-gray-400 p-2">
                    <div className="flex space-x-2">
                      <img src={editIcon} className="w-10 h-10 p-1 cursor-pointer" onClick={()=>{setEditProduct(d); setToggleModal(true)}}/>
                      <img src={deleteIcon} className="w-10 h-10 p-1 cursor-pointer" onClick={()=>{setDeleteProductID(d.productID); setIsDelete(true);}}/>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
  )
}

export default ProductList
