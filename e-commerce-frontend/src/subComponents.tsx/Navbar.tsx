import { useEffect, useState } from "react"
import { makeAuthorizedGetRequest } from "../services/authorizedRequests"
import { forUser } from "../interface/interface";
import trolleyIcon from "../assets/trolley.png";
import searchIcon from "../assets/search.png";
import profileIcon from "../assets/account.png";
import { useNavigate } from "react-router-dom";

function Navbar() {
    const [user,setUser]=useState<forUser|undefined>();
    const [search,setSearch]=useState<string>();
    const navigate=useNavigate();

    const searchProduct=async()=>{
        navigate(`/products/${search}`)
    }

    useEffect(()=>{
        const getUser=async()=>{
           const response= await makeAuthorizedGetRequest("/users/id");
           if(response && response.data){
            setUser(response.data);
           }
        }
        getUser();
    },[])

    
  return (
    <div className='flex shadow w-full h-20 justify-between px-24 text-2xl font-semibold items-center'>
        <div className="flex items-center justify-center gap-x-1">
            <img src={trolleyIcon} className="w-10 h-10"/>
            <div>ShopCart</div>
        </div>
        <div>Categories</div>
        <div className="border-2 h-10  border-gray-500 rounded-lg flex items-center p-2">
            <input className="outline-none text-lg font-normal" placeholder="Search by product name." onChange={(e)=>{setSearch(e.target.value)}}/>
            <img src={searchIcon} className="w-8 h-8" onClick={()=>{searchProduct();}}/>
        </div>
        {user && user.role==="Admin"?<div className="flex items-center"><img src={profileIcon} className="w-8 h-8"/>Admin Dashboard</div>:<div className="flex items-center"><img src={profileIcon} className="w-8 h-8"/>Account</div>}
        
    </div>
  )
}

export default Navbar
