import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/cartContext';
import { ADD_TO_CART_BTN } from '../constants/btnConst';

function Product({product,setModalOpen}:forProductProp) {
  const { addToCart } = useCart();
  const navigate=useNavigate();

  //open product detail
  const openProductDetail=async()=>{
    navigate(`/product/${product.productID}`)
  }
  
  return (
    <div className="flex flex-col gap-y-2 shadow-2xl p-2" >
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
          <div className="text-sm text-gray-600">{product.brandName}</div>
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
