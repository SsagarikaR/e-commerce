import { useNavigate } from 'react-router-dom'
import { forProductProp } from '../interface/interface'
import { useCart } from '../context/cartContext';

function Product({product,setModalOpen}:forProductProp) {
  const { addToCart } = useCart();
  const navigate=useNavigate();
  // console.log("addToCart function:", addToCart);

    // console.log(product)
  const openProductDetail=async()=>{
    navigate(`/product/${product.productID}`)
  }
  
  return (
    <div className="flex flex-col gap-y-2 shadow-2xl p-2" >
        <div className='gap-y-2 flex flex-col' onClick={()=>{openProductDetail();}}>
          <img src={product.ProductThumbnail} className='cursor-pointer h-90 w-90' />
          <div className="text-center text-lg font-semibold text-gray-700 cursor-pointer">{product.productName}</div>
          <div className='text-center' >₹{product.productPrice}</div>
        </div>
        <button className="btn_color w-full p-2  rounded rounded-lg "
        onClick={() =>{
           addToCart(product.productID); 
           setModalOpen(true)}}
        >Add to cart</button>
    </div>
  )
}

export default Product
