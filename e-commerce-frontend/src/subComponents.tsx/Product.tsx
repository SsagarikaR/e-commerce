import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/cartContext';
import { ADD_TO_CART_BTN } from '../constants/btnConst';
import { useEffect, useState } from 'react';
import favIcon from "../assets/fav.png";
import notFavIcon from "../assets/nFav.png";
import { makeAuthorizedDeleteRequest, makeAuthorizedGetRequest, makeAuthorizedPostRequest } from '../services/authorizedRequests';

function Product({product,setModalOpen}:forProductProp) {
  const [WishList,setWishList]=useState<wishList[]|undefined>();
  const [toggleWishList,setToggleWishList]=useState(false);
  const { addToCart } = useCart();
  const navigate=useNavigate();

  //open product detail
  const openProductDetail=async()=>{
    navigate(`/product/${product.productID}`)
  }

  //check whether product is in the wish list
  const fetchWishList=async()=>{
    const response=await makeAuthorizedGetRequest(`/wishlist/${product.productID}`);
    console.log(response,"response");
    if(response?.data){
     setWishList(response.data);
    }
    else{
      setWishList(undefined);
    }
  }

  //add item to wishList 
  const addToWishList=async()=>{
    let response
    if(WishList){
      response=await makeAuthorizedDeleteRequest("/wishlist",{wishListID:WishList[0].wishListID});
    }
    else{
      response=await makeAuthorizedPostRequest("/wishlist",{productID:product.productID});
    }
    if(response?.data){
      setToggleWishList(!toggleWishList);
    }
  }

  useEffect(()=>{
    fetchWishList();
  },[toggleWishList])
  
  return (
    <div className="flex flex-col gap-y-2 shadow-2xl p-2 relative transition-transform duration-300 hover:scale-95" >
        <div className='absolute m-2 cursor-pointer ' onClick={()=>{addToWishList()}}>
          {WishList?<img src={favIcon} className='w-10 h-10 '/>
            :<img src={notFavIcon} className='w-10 h-10'/>
          }
        </div>
        <div className='gap-y-2 flex flex-col' onClick={()=>{openProductDetail();}}>{/**open products detail page on clicking over a product card */}
          <img src={product.ProductThumbnail} className='cursor-pointer h-90 w-90' />
          <div className='flex items-center justify-center gap-x-2'>
            <div className="text-center text-lg font-semibold text-gray-700 cursor-pointer">{product.productName}</div>
            <img
            src={product.brandThumbnail}
            alt={product.brandName}
            className="h-8 w-8 rounded-full border"
            />
          </div>          
          <div className='text-center' >₹{product.productPrice}</div>
          <div className="flex items-center justify-center gap-2 mt-2">
        </div>
        </div>
        <button className="btn_color w-full p-2  rounded rounded-lg cursor-pointer"
        onClick={() =>{
           addToCart(product.productID); 
           setModalOpen(true)}}
        >{ADD_TO_CART_BTN}</button>
    </div>
  )
}

export default Product
