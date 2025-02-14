import { Link } from 'react-router-dom'
import { forProductbyName } from '../interface/interface'

function Product({product}:{product:forProductbyName}) {
    console.log(product)
  return (
    <div className="flex flex-col gap-y-2 shadow-2xl p-2">
        <Link to="/product"><img src={product.ProductThumbnail} className='cursor-pointer h-90 w-90'/></Link>
        <Link to="/product"><div className="text-center text-lg font-semibold text-gray-700 cursor-pointer">{product.productName}</div></Link>
        <div className='text-center'>₹{product.productPrice}</div>
        <button className="btn_color w-full p-2  rounded rounded-lg ">Add to cart</button>
    </div>
  )
}

export default Product
