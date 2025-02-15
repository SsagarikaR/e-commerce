import { Link, useNavigate } from 'react-router-dom'
import { forProductbyName } from '../interface/interface'
import { useCart } from '../context/cartContext';

function Product({product}:{product:forProductbyName}) {
  const { addToCart } = useCart();
  const navigate=useNavigate();
  // console.log("addToCart function:", addToCart);

    // console.log(product)
  const openProductDetail=async()=>{
    navigate(`/product/${product.productID}`)
  }
  return (
    <div className="flex flex-col gap-y-2 shadow-2xl p-2" onClick={()=>{openProductDetail();}}>
        <Link to="/product"><img src={product.ProductThumbnail} className='cursor-pointer h-90 w-90'/></Link>
        <Link to="/product"><div className="text-center text-lg font-semibold text-gray-700 cursor-pointer">{product.productName}</div></Link>
        <div className='text-center'>₹{product.productPrice}</div>
        <button className="btn_color w-full p-2  rounded rounded-lg "
        onClick={() => addToCart(product.productID)}
        >Add to cart</button>
    </div>
  )
}

export default Product
