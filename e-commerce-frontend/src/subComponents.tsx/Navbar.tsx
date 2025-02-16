import { useEffect, useState } from "react"
import { makeAuthorizedGetRequest } from "../services/authorizedRequests"
import { forCategories, forUser } from "../interface/interface";
import trolleyIcon from "../assets/trolley.png";
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
    const [user,setUser]=useState<forUser|undefined>();
    const [search,setSearch]=useState<string>();
    const [categories,setCategories]=useState<forCategories[]>();
    const [openProfile,setOpenProfile]=useState(false);
    const navigate=useNavigate();

    const searchProduct=async()=>{
        navigate(`/products?name=${search}`)
    }

    const handleCategoryChange = (category: string) => {
        navigate(`/categories?name=${category}`);
    };

    const getUser=async()=>{
        const response= await makeAuthorizedGetRequest("/users/id");
        if(response && response.data){
         setUser(response.data);
        }
    }

    const getCategories=async()=>{
        const response=await makeUnAuthorizedGetRequest("/categories");
        if(response && response.data){
            setCategories(response.data);
        }
    }

    useEffect(()=>{
        getCategories();
        getUser();
    },[])

    
  return (
    <div className='flex shadow w-full h-20 justify-between px-24 text-2xl font-semibold items-center'>
        <div className="flex items-center justify-center gap-x-1">
            <img src={trolleyIcon} className="w-10 h-10"/>
            <div className="text-blue-500">ShopCart</div>
        </div>
        <div>
            <select className="outline-none" onChange={(e) =>{ handleCategoryChange(e.target.value); console.log(e.target.value)}} >
                <option value="" disabled selected className="text-gray-500 hover:bg-gray-500 ">Categories</option>
                {
                    categories &&  categories.map((category)=>(
                        <option>{category.categoryName}</option>
                    ))
                }
            </select>
        </div>
        
        <div className="border-2 h-10  border-gray-500 rounded-lg flex items-center p-2">
            <input className="outline-none text-lg font-normal" placeholder="Search by product name." onChange={(e)=>{setSearch(e.target.value)}}/>
            <img src={searchIcon} className="w-8 h-8" onClick={()=>{searchProduct();}}/>
        </div>
        <Link to="/cart">
            <div className="relative">
                <img src={cartIcon} className="w-10 h-10"/>
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                        {cart.length}
                    </span>
            </div>
        </Link>
        {user &&(user.role==="Admin"?
        <Link to="/dashboard" >
            <div className="flex items-center gap-1 cursor-pointer"> 
                <img src={profileIcon} className="w-8 h-8"/><div>{user.name}</div>
            </div>
        </Link>
        :<div className="flex flex-col relative cursor-pointer" >
            <div className="flex items-center gap-1" onClick={()=>{setOpenProfile(true)}}>
                <img src={profileIcon} className="w-8 h-8"/>
                <div>{user.name}</div>
            </div>
            {openProfile && (
                <div className="absolute left-0 top-full mt-2 bg-white text-blue-500 shadow-md rounded-lg px-4 py-2 cursor-pointer w-40 underline h-23 flex justify-center items-end " >  
                    <div  className="pb-3 "
                        onClick={()=>{
                        Cookies.remove("token");
                        navigate("/signin")
                    }}>
                        Log Out
                    </div>
                    <img src={crossIcon} className="w-9 h-9 absolute top-0 right-0 p-2" onClick={()=>{setOpenProfile(false)}}/>
                </div>
            )}
        </div>)}
        
    </div>
  )
}

export default Navbar
