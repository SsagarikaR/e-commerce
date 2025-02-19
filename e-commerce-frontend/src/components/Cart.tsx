import { useCart } from "../context/cartContext";
import { useNavigate } from "react-router-dom";
import payPalIcon from "../assets/paypal.png";

const Cart = () => {
    const { cart, updateQuantity, removeFromCart } = useCart();
    const navigate=useNavigate();

    const openProductDetail = async (productID: number) => {
        navigate(`/product/${productID}`);
    };

    console.log(cart);
    return (
        <div className="p-5 min-w-screen min-h-screen  bg_color">
            <h2 className="text-4xl font-bold mb-4 text-center text-blue-500">Shopping Cart</h2>
            {cart.length === 0 ? (
                <p className="text-center text-lg">Your cart is empty</p>
            ) : (
                <div className="flex gap-4">
                    <div className="grid gap-4 w-4/5">
                    {cart.map((item: forCartItem) => (
                        <div key={item.productID} className="shadow-xl p-4 shadow-md flex items-center gap-4">
                            <img src={item.productThumbnail} className="w-30 h-30 object-cover shadow-lg cursor-pointer"
                                onClick={()=>{
                                    openProductDetail(item.productID)
                                }}
                            />
                            <div>
                                <div className="flex gap-x-2 items-center justify-center">
                                    <p className="font-semibold text-lg"
                                        onClick={()=>{
                                            openProductDetail(item.productID)
                                        }}
                                    >{item.productName}</p>
                                    <img src={item.brandThumbnail} className="rounded-full w-7 h-7 border"/>
                                </div>
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
                    <div className="flex flex-col w-1/5 gap-y-2">
                        <div className="bg-gray-900 h-15 w-full rounded-xl flex items-center">
                            <div className="text-xl font-semibold text-white p-5 text-center [word-spacing:5px]">Total Price= ₹{cart[cart.length-1].totalPrice}</div>
                        </div>
                        <div className="w-full bg-orange-400 h-15 rounded-xl text-2xl font-semibold hover:bg-orange-500 flex justify-center items-center gap-x-2 cursor-pointer">
                            <button >Pay with</button>
                            <img src={payPalIcon} className="w-18 h-18"/>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};


export default Cart;
