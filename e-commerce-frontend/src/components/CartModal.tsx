import { useCart } from "../context/cartContext"
import crossIcon from "../assets/cross.png"
import { useNavigate } from "react-router-dom";

function CartModal({setModalOpen}:{setModalOpen:(value:boolean)=>void}) {
    const {cart,updateQuantity,removeFromCart}=useCart();
    const navigate=useNavigate();

    const openProductDetail=async(productID:number)=>{
        navigate(`/product/${productID}`)
      }

    return (
        <div className="h-240 bg-white w-100 absolute z-10 right-0 top-0">
            <div className="text-4xl text-center underline font-bold text-blue-500">Cart</div>
            <img src={crossIcon} className="w-8 h-8 absolute right-2 top-2 cursor-pointer" onClick={()=>{setModalOpen(false)}}/>
             <div className="grid gap-4 w-4/5 top-10 absolute">
                                {cart.map((item: forCartItem) => (
                                    <div key={item.productID} className="shadow-xl p-4 shadow-md flex items-center gap-4">
                                        <img src={item.productThumbnail} className="w-20 h-20 object-cover shadow-lg cursor-pointer" onClick={()=>{openProductDetail(item.productID)}}/>
                                        <div>
                                            <p className="font-semibold">{item.productName}</p>
                                            <p>₹{item.productPrice}</p>
                                            <div className="flex items-center gap-2">
                                                {item.quantity>1&&(<button 
                                                    className="px-2 py-1 bg-gray-300 rounded" 
                                                    onClick={() => updateQuantity(item.cartItemID, (item.quantity ?? 1) - 1)}
                                                >
                                                    -
                                                </button>)}
                                                <p className="text-lg">{item.quantity ?? 1}</p>
                                                <button 
                                                    className="px-2 py-1 bg-gray-300 rounded" 
                                                    onClick={() => updateQuantity(item.cartItemID, (item.quantity ?? 1) + 1)}
                                                >
                                                    +
                                                </button>
                                            </div>
                                            <button 
                                                className="mt-2 px-3 py-1 bg-red-500 text-white rounded"
                                                onClick={() => removeFromCart(item.cartItemID)}
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                ))}
                                </div>
        </div>
    )
}

export default CartModal
