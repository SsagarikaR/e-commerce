import { useEffect, useState } from "react";
import { makeAuthorizedGetRequest } from "../services/authorizedRequests";
import logoIcon from "../assets/logo.png";
import searchIcon from "../assets/search.png";
import profileIcon from "../assets/account.png";
import cartIcon from "../assets/cart.png";
import favIcon from "../assets/fav.png";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/cartContext";
import Cookies from "js-cookie";
import { SIGN_IN_BTN } from "../constants/btnConst";

function Navbar() {
  const { cart } = useCart();
  const [user, setUser] = useState<user | undefined>();
  const [search, setSearch] = useState<string>();
  const navigate = useNavigate();
  const cookie=Cookies.get("token");

  // Search products based on the name
  const searchProduct = async () => {
    navigate(`/products?name=${search}`);
  };

  // Fetch user details
  const getUser = async () => {
    const response = await makeAuthorizedGetRequest("/user");
    console.log(response);
    if (response && response.data) {
      setUser(response.data);
    }
  };


  // Use effect to fetch data when the component is mounted
  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="flex fixed bg_color shadow w-full h-20 lg:gap-x-15 gap-x-8 z-10 justify-center md:gap-x-0 md:justify-between px-24 xl:px-24 p-0 sm:p-0 md:px-10 text-lg lg:text-2xl md:text-xl font-semibold items-center">
      <div className="flex items-center justify-center gap-x-1">
        <Link to="/">
          <img src={logoIcon} className="w-10 h-10 " />
        </Link>
        <div className="text-blue-500 hidden lg:inline-block sm:hidden">
          ShopCart
        </div>
      </div>

      <div className="flex items-center justify-center gap-x-1">
        <Link to="/">
        <div className=" hidden lg:inline-block sm:hidden">
          Categories
        </div>
        </Link>
      </div>

      {/* Dropdown for Categories */}
      {/* <div className="hidden md:inline-block">
        <select
          className="outline-none"
          onChange={(e) => {
            handleCategoryChange(e.target.value);
          }}
        >
          <option
            value=""
            disabled
            selected
            className="text-gray-500 hover:bg-gray-500"
          >
            Categories
          </option>
          {categories &&
            categories.map((category) => (
              <option key={category.categoryName}>
                {category.categoryName}
              </option>
            ))}
        </select>
      </div> */}

      {/* Search bar */}
      <div className="border-2 h-10 border-gray-500 rounded-lg flex items-center px-8  sm:p-2">
        <input
          className="outline-none text-sm md:text-lg font-normal"
          placeholder="Search by product name."
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
        <img
          src={searchIcon}
          className="w-6 h-6 md:w-8 md:h-8 cursor-pointer"
          onClick={searchProduct}
        />
      </div>

      {/* Cart icon with item count */}
      <Link to="/cart">
        <div className="relative">
          <img src={cartIcon} className="w-10 h-10" />
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
            {cart.length}
          </span>
        </div>
      </Link>

      {cookie ?(user && (
        <div className="relative group">
          <div className="flex cursor-pointer">
            <img src={profileIcon} className="w-8 h-8" />
            {user.name}
          </div>

          {/* Dropdown content */}
          <div className="absolute left-0 hidden group-hover:block text-lg group-focus-within:block bg-white w-35 text-center text-black p-2 shadow-lg">
            <Link
              to={user.role === "Admin" ? "/dashboard" : "#"}
              className="block p-2 hover:bg-gray-300"
            >
              <img src={profileIcon} className="w-7 h-7 m-auto" />
            </Link>
            <Link to="/wishlist" className=" py-2 flex gap-x-1 items-center justify-center hover:bg-gray-300">
              <img src={favIcon} className="w-4 h-4 " />
              <div>Wishlist</div>
            </Link>
            <Link to="/orders" className="py-2 hover:bg-gray-300">
              <div className="hover:bg-gray-300">Orders</div>
            </Link>
            <Link to="#" className="block p-1 underline py-2 hover:bg-gray-300" onClick={()=>{Cookies.remove("token")}}>
              Log out
            </Link>
          </div>
        </div>
      )):
      <Link to="/signin">
        <div className="bg-blue-400 p-2 rounded-sm md:px-6 md:text-lg text-sm">{SIGN_IN_BTN}</div>
      </Link>}
    </div>
  );
}

export default Navbar;
