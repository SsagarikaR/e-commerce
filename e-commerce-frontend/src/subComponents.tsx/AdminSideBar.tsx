import productIcons from "../assets/product.png";
import customerIcon from "../assets/customers.png";
import Cookies from "js-cookie";
import logoIcon from "../assets/logo.png";
import brandIcon from "../assets/brand.png";
import menuIcon from "../assets/menu.png"
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { SIDEBAR_TEXTS } from "../constants/adminSideBarConst";
import { useState } from "react";

function AdminSideBar({ setPage, page }: forSideBarProp) {
  const navigate = useNavigate();
  const [toggleBar,setToggleBar]=useState(false);

  return (
    <div className="">
      <div  className="inline-block xl:hidden fixed left-2 1 top-6 z-10">
        <img src={menuIcon} className="w-8 h-8 cursor-pointer" 
        onClick={()=>{setToggleBar(!toggleBar)}}/>
      </div>
      <div className={`${toggleBar?"fixed flex justify-between":"hidden "}xl:flex bg_color flex-col w-60 p-2 items-center text-xl font-medium text-gray-600 h-screen shadow-2xl gap-8 justify-between`}>
      <div>
        <div className="flex  items-center  pb-10 pt-2">
          <Link to="/">
            <img src={logoIcon} className="w-8" />
          </Link>
          <div className="text-3xl font-semibold text-blue-500">
            {SIDEBAR_TEXTS.brand_name}
          </div>
        </div>
        <div className="flex flex-col gap-6 w-full ">
          <ul className="flex flex-col gap-2 ">
            <li className="flex  gap-x-1 ">
              <img src={productIcons} className="w-7 h-7" />{" "}
              {SIDEBAR_TEXTS.products}
            </li>
            <li
              className={`pl-10 ${
                page === "products" && "bg-blue-200"
              } cursor-pointer`}
              onClick={() => {
                setPage("products");
              }}
            >
              {SIDEBAR_TEXTS.producut_list}
            </li>
            <li
              className={`pl-10 ${
                page === "categories" && "bg-blue-200"
              } cursor-pointer`}
              onClick={() => {
                setPage("categories");
              }}
            >
              {SIDEBAR_TEXTS.category_list}
            </li>
          </ul>
          <div
            className={`flex gap-1   ${
              page === "brands" && "bg-blue-200"
            } cursor-pointer`}
            onClick={() => {
              setPage("brands");
            }}
          >
            <img src={brandIcon} className="w-7 h-7" />
            {SIDEBAR_TEXTS.brands}
          </div>
          <div
            className={`flex gap-1  ${
              page === "users" && "bg-blue-200"
            } cursor-pointer`}
            onClick={() => {
              setPage("users");
            }}
          >
            <img src={customerIcon} className="w-7 h-7" />
            {SIDEBAR_TEXTS.customers}
          </div>
        </div>
      </div>
      <div
        className="pb-10 text-2xl text-blue-600 cursor-pointer font-semibold underline"
        onClick={() => {
          Cookies.remove("token");
          navigate("/signin");
        }}
      >
        {SIDEBAR_TEXTS.log_out}
      </div>
      </div>
    </div>
  );
}

export default AdminSideBar;
