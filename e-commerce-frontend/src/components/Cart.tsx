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
                <div className=" flex md:static flex-col md:flex-row gap-4 ">
                    <div className="flex flex-col gap-4 xl:w-4/5 md:w-3/5 justify-center itemc-center overflow-auto">
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
                    <div className="flex md:flex-col md:static fixed bottom-4 left-0 right-0 p-6 bg_color md:p-0 gap-x-10 xl:w-1/5 md:w-2/5 gap-y-2 ">
                        <div className="bg-gray-900 h-15 w-full rounded-lg flex items-center ">
                            <div className=" text-lg md:text-xl font-semibold text-white p-5 text-center [word-spacing:5px]">Total Price= ₹{cart[cart.length-1].totalPrice}</div>
                        </div>
                        <div className="w-full bg-orange-400 h-15 rounded-xl text-lg md:text-2xl font-semibold hover:bg-orange-500 flex justify-center items-center gap-x-2 cursor-pointer">
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
