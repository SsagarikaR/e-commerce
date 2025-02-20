import { useEffect } from "react";
import { makeAuthorizedGetRequest } from "../services/authorizedRequests"

function WishList() {

  const fetchData=async()=>{
    const response=await makeAuthorizedGetRequest("/wishlist");
    console.log(response);
  }

  useEffect(()=>{
    fetchData();
  },[]);

  return (
    <div>
      
    </div>
  )
}

export default WishList
