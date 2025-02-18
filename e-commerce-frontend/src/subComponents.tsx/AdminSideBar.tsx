import productIcons from "../assets/product.png"
import customerIcon from "../assets/customers.png";
import Cookies from "js-cookie";
import logoIcon from "../assets/logo.png";
import brandIcon from "../assets/brand.png";
import { useNavigate } from "react-router-dom";

function AdminSideBar({setPage,page}:forSideBarProp) {
  const navigate=useNavigate();

  return (
    <div className="flex flex-col w-60 p-2 items-center text-xl font-medium text-gray-600 h-screen shadow-2xl gap-8 justify-between">
      <div>
    <div className="flex  items-center  pb-10 pt-2">
      <img src={logoIcon} className="w-8"/>
      <div className="text-3xl font-semibold text-blue-500">ShopCart</div>
    </div>
    <div className="flex flex-col gap-6 w-full ">
        <ul className="flex flex-col gap-2 ">
          <li className="flex  gap-x-1 ">
            <img src={productIcons} className="w-7 h-7"/> Products
          </li>
          <li className={`pl-10 ${page==="products"&& "bg-blue-200"} cursor-pointer`} onClick={()=>{setPage("products")}}>Product list</li>
          <li className={`pl-10 ${page==="categories"&& "bg-blue-200"} cursor-pointer`}  onClick={()=>{setPage("categories")}}>Category list</li>
        </ul>
        <div className={`flex gap-1   ${page==="brands"&& "bg-blue-200"} cursor-pointer`} onClick={()=>{setPage("brands")}}><img src={brandIcon} className="w-7 h-7"/>Brands</div>
        <div className={`flex gap-1  ${page==="users"&& "bg-blue-200"} cursor-pointer`} onClick={()=>{setPage("users")}}><img src={customerIcon} className="w-7 h-7"/>Customers</div>

    </div>
    </div>
    <div className="pb-10 text-2xl text-blue-600 cursor-pointer font-semibold underline" onClick={()=>{Cookies.remove("token"); navigate("/signin")}}>Log out</div>
    </div>
  )
}

export default AdminSideBar
