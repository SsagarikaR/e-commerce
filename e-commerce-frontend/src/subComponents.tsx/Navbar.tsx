import { useEffect, useState } from "react";
import { makeAuthorizedGetRequest } from "../services/authorizedRequests";
import logoIcon from "../assets/logo.png";
import searchIcon from "../assets/search.png";
import profileIcon from "../assets/account.png";
import cartIcon from "../assets/cart.png";
import crossIcon from "../assets/cross.png";
import { Link, useNavigate } from "react-router-dom";
import { makeUnAuthorizedGetRequest } from "../services/unAuthorizedRequest";
import { useCart } from "../context/cartContext";
import Cookies from "js-cookie";

function Navbar() {
    const { cart } = useCart();
    const [user, setUser] = useState<forUser | undefined>();
    const [search, setSearch] = useState<string>();
    const [categories, setCategories] = useState<forCategories[]>();
    const [openProfile, setOpenProfile] = useState(false);
    const navigate = useNavigate();

    // Search products based on the name
    const searchProduct = async () => {
        navigate(`/products?name=${search}`);
    };

    // Navigate to the category's page
    const handleCategoryChange = (category: string) => {
        navigate(`/categories?name=${category}`);
    };

    // Fetch user details
    const getUser = async () => {
        const response = await makeAuthorizedGetRequest("/user");
        console.log(response);
        if (response && response.data) {
            setUser(response.data);
        }
    };

    // Fetch available categories
    const getCategories = async () => {
        const response = await makeUnAuthorizedGetRequest("/categories");
        if (response && response.data) {
            setCategories(response.data);
        }
    };

    // Use effect to fetch data when the component is mounted
    useEffect(() => {
        getCategories();
        getUser();
    }, []);

    return (
        <div className="flex fixed bg_color shadow w-full h-20 gap-x-15 items-center justify-center md:gap-x-0 md:justify-between px-24 xl:px-24 p-0 sm:p-0 md:px-10 text-2xl lg:text-2xl md:text-xl font-semibold items-center">
            <div className="flex items-center justify-center gap-x-1">
                <Link to="/">
                    <img src={logoIcon} className="w-10 h-10 " />
                </Link>
                <div className="text-blue-500 hidden lg:inline-block sm:hidden">ShopCart</div>
            </div>

            {/* Dropdown for Categories */}
            <div className="hidden md:inline-block">
                <select
                    className="outline-none"
                    onChange={(e) => { handleCategoryChange(e.target.value); }}
                >
                    <option value="" disabled selected className="text-gray-500 hover:bg-gray-500">Categories</option>
                    {categories && categories.map((category) => (
                        <option key={category.categoryName}>{category.categoryName}</option>
                    ))}
                </select>
            </div>

            {/* Search bar */}
            <div className="border-2 h-10 border-gray-500 rounded-lg flex items-center px-8  sm:p-2">
                <input
                    className="outline-none text-sm md:text-lg font-normal"
                    placeholder="Search by product name."
                    onChange={(e) => { setSearch(e.target.value); }}
                />
                <img src={searchIcon} className="w-6 h-6 md:w-8 md:h-8 cursor-pointer" onClick={searchProduct} />
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

            {/* User profile (conditional render for admin or regular user) */}
            {user && ( user.role==="Admin"? 
                // Admin view, with dashboard link
                <Link to="/dashboard">
                    <div className="flex items-center gap-1 cursor-pointer">
                        <img src={profileIcon} className="w-8 h-8" />
                        <div className="hidden lg:inline-block sm:hidden">{user.name}</div>
                    </div>
                </Link> : 
                // Regular user view with logout options
                <div className="flex flex-col relative cursor-pointer">
                    <div className="flex items-center gap-1" onClick={() => { setOpenProfile(true); }}>
                        <img src={profileIcon} className="w-8 h-8" />
                        <div>{user.name}</div>
                    </div>
                    {openProfile && (
                        <div className="absolute left-0 top-full mt-2 bg-white text-blue-500 shadow-md rounded-lg px-4 py-2 cursor-pointer w-40 underline h-23 flex justify-center items-end">
                            <div
                                className="pb-3"
                                onClick={() => {
                                    Cookies.remove("token");
                                    navigate("/signin");
                                }}
                            >
                                Log Out
                            </div>
                            <img src={crossIcon} className="w-9 h-9 absolute top-0 right-0 p-2" onClick={() => { setOpenProfile(false); }} />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default Navbar;
