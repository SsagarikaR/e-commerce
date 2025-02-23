import deleteIcon from "../assets/delete.png";
import { useNavigate } from "react-router-dom";
import { makeAuthorizedDeleteRequest } from "../services/authorizedRequests";

function WishListCard({item,setToggleWishList}:wishListProp) {
    const navigate=useNavigate();

    //open product detail
    const openProductDetail=async()=>{
      navigate(`/product/${item.productID}`)
    }

    //delete from wishlist
    const deleteItem=async()=>{
        const response=await makeAuthorizedDeleteRequest("/wishlist",{wishListID:item.wishListID});
        if(response?.data){
            setToggleWishList(prev=>!prev);
        }
        
    }
    // console.log(item.brandThumbnail);

  return (
    <div className="flex w-full  shadow-lg   items-center p-2 ">
    <div className="flex w-4/5 items-center">
      <div className="cursor-pointer" onClick={()=>{openProductDetail();}}>
        <img src={item.productThumbnail} className="w-30 h-30 shadow-xl m-2"/>
      </div>
      <div>
        <div className="flex gap-x-2">
          <div className="text-xl font-medium text-gray-600 dark:text-white cursor-pointer"
           onClick={()=>{
            openProductDetail();
           }}>
            {item.productName}</div>
            <img 
                            src={item.brandThumbnail} 
                            alt="Brand" 
                            className="w-6 h-6 border rounded-full"
                           
                        />
        </div>
        <div className="text-lg font-medium text-gray-600 dark:text-white">₹{item.productPrice}</div>
      </div>
    </div>
    <div className="w-1/5 flex items-end justify-end ">
      <img src={deleteIcon} className="w-7 h-7 cursor-pointer"
         onClick={()=>{
            deleteItem();
         }}
      />
    </div>
  </div>
  )
}

export default WishListCard
