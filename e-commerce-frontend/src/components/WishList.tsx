import { useEffect, useState } from "react";
import { makeAuthorizedGetRequest } from "../services/authorizedRequests"
import WishListCard from "../subComponents.tsx/WishListCard";

function WishList() {
  const [wishlist,setWishList]=useState<wishListDetails[]|undefined>()
  const [toggleWishList,setToggleWishList]=useState(false);

  const fetchData=async()=>{
      const response=await makeAuthorizedGetRequest("/wishlist");
      console.log(response);
      if(response?.data){
        setWishList(response.data);
      }
  }

  useEffect(()=>{
    fetchData();
  },[toggleWishList]);

  return (
    <div className="w-screen flex h-screen justify-center bg_color">
      <div className="flex flex-col   w-3/5 items-center h-full gap-2">
        <div className="w-full p-2 text-xl font-medium text-gray-700">My WishList({wishlist?.length || 0})</div>
        {
          wishlist&& wishlist?.length>0?
          (
            wishlist.map((item)=>(
              <WishListCard 
               item={item}
               setToggleWishList={setToggleWishList} 
               key={item.wishListID}
              />
            ))
          )
          :<div>No item found</div>
        }
      </div>
    </div>
  )
}

export default WishList
