import { useCart } from "../context/cartContext";

const Cart = () => {
    const { cart, updateQuantity, removeFromCart } = useCart();

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
                            <img src={item.productThumbnail} className="w-20 h-20 object-cover shadow-lg"/>
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
                    <div className="bg-white h-40 w-1/5 rounded-2xl ">
                        <div className="text-2xl font-semibold text-blue-500 p-5 text-center [word-spacing:5px]">Total Price={cart[cart.length-1].totalPrice}</div>
                    </div>
                </div>
            )}
        </div>
    );
};


export default Cart;
