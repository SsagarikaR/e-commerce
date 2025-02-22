import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/cartContext";  // Custom hook to manage cart
import { makeAuthorizedPostRequest } from "../services/authorizedRequests";  // API call to create order
import { makeUnAuthorizedGetRequest } from "../services/unAuthorizedRequest";
import  useToast  from "../utils/useToast";  // Import toast functions

function MakeOrderPage() {
    const { id } = useParams(); // Product ID from URL if it's a single product order
    const { cart } = useCart();  // Get cart items from context
    const [product, setProduct] = useState<product[]>();
    const [address, setAddress] = useState("");
    const [totalPrice, setTotalPrice] = useState(0);
    const [isConfirmationVisible, setConfirmationVisible] = useState(false);
    const navigate = useNavigate(); // Hook for navigation
    const { success, error } = useToast; // Destructure the toast functions

    useEffect(() => {
        // If the user is ordering a single product, fetch it by ID
        if (id) {
            const fetchProductDetails = async () => {
                const response = await makeUnAuthorizedGetRequest(`/products?id=${id}`);
                if (response?.data) {
                    setProduct(response.data);
                    setTotalPrice(response.data.productPrice);  // Assuming price is set like this
                }
            };
            fetchProductDetails();
        } else {
            // If the user is ordering from the cart, calculate the total price from the cart
            if (cart && cart.length > 0) {
                const total = cart.reduce((acc, item) => acc + (item.productPrice * item.quantity), 0);
                setTotalPrice(total);
            } else {
                setTotalPrice(0);  // Set totalPrice to 0 if cart is empty
            }
        }
    }, [id, cart]);

    // Handle the "Confirm Order" button click
    const handleConfirmOrder = async () => {
        if (!address) {
            error("Please enter address.");
            // Show error toast if address is empty
            return;
        }

        // Show the confirmation popup
        setConfirmationVisible(true);
    };

    // Submit the order and navigate to order summary page
    const handleSubmitOrder = async () => {
        let items = [];

        if (id) {
            // Single product order
            if (product) {
                items.push({
                    productId: product[0].productID,
                    quantity: 1,
                    price: product[0].productPrice,
                });
            }
        } else {
            // Multiple products from cart
            items = cart.map(item => ({
                productId: item.productID,
                quantity: item.quantity,
                price: item.productPrice,
            }));
        }

        const totalAmount = totalPrice;

        // Send the request to create the order
        const response = await makeAuthorizedPostRequest("/orders", {
            totalAmount,
            items,
            address,
        });

        if (response?.data) {
            success("Order confirmed successfully!"); // Show success toast when order is confirmed

            // Redirect based on the type of order
            if (id) {
                // Redirect to the product detail page (assuming 'id' is product ID)
                navigate(`/product-detail/${id}`);
            } else {
                // Redirect to the cart page if multiple items were ordered
                navigate(`/cart`);
            }
        } else {
            error("There was an issue with confirming your order. Please try again."); // Show error toast if there's an issue
        }
    };

    return (
        <div className="min-w-screen min-h-screen flex justify-center items-center bg_color shadow-lg">
            <div className={` container p-6 max-w-4xl bg-white ${isConfirmationVisible&&"opacity-25"}`}>
            <h2 className="text-2xl font-semibold mb-6">{id ? "Order Product" : "Order from Cart"}</h2>

            {/* Display single product or cart items */}
            {id && product ? (
                // Single Product Order
                <div className="flex flex-col sm:flex-row sm:gap-6 mb-6">
                    <div className="flex-shrink-0 w-full sm:w-1/3">
                        <img
                            src={product[0].productThumbnail}
                            alt={product[0].productName}
                            className="w-full h-64 object-cover rounded-lg shadow-lg"
                        />
                    </div>
                    <div className="flex-grow">
                        <h3 className="text-xl font-semibold">{product[0].productName}</h3>
                        <p className="text-lg text-gray-700">Price: ₹{product[0].productPrice}</p>
                        <p className="text-lg text-gray-700 mt-2">Total Price: ₹{totalPrice}</p>
                    </div>
                </div>
            ) : (
                // Multiple Products Order
                <div className="mb-6">
                    <h3 className="text-xl font-semibold mb-4">Items in your Cart:</h3>
                    {cart && cart.length > 0 ? (
                        cart.map((item, index) => (
                            <div key={index} className="flex items-center gap-4 mb-4">
                                <img src={item.productThumbnail} alt={item.productName} className="w-24 h-24 object-cover rounded-lg" />
                                <div className="flex-grow">
                                    <p className="text-lg font-semibold">{item.productName}</p>
                                    <p className="text-gray-700">Price: ₹{item.productPrice}</p>
                                    <p className="text-gray-700">Quantity: {item.quantity}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>Your cart is empty.</p>
                    )}
                    <div className="text-right">
                        <h3 className="text-lg font-semibold text-gray-900">Total Price: ₹{totalPrice}</h3>
                    </div>
                </div>
            )}

            {/* Address Input */}
            <div className="mb-6">
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">Enter Shipping Address:</label>
                <textarea
                    id="address"
                    value={address}
                    onChange={(event) => setAddress(event.target.value)}
                    rows={4}
                    className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your address"
                ></textarea>
            </div>

            <div className="flex justify-center mb-6">
                <button
                    className="px-6 py-3 bg-orange-500 cursor-pointer text-white text-lg font-semibold rounded-lg shadow-md hover:bg-orange-400 focus:outline-none"
                    onClick={handleConfirmOrder}
                >
                    Confirm Order
                </button>
            </div>
            </div>

            {/* Confirmation Popup */}
            {isConfirmationVisible && (
                <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 sm:w-1/3">
                        <h3 className="text-2xl font-semibold text-center mb-4">Confirm Your Order</h3>
                        <p className="text-lg text-center mb-4">Do you want to confirm the order with the address:</p>
                        <p className="text-lg text-center font-medium">{address}</p>
                        <div className="flex justify-center gap-15 mt-6">
                            <button
                                className="px-6 py-3 bg-red-500 cursor-pointer text-white font-semibold rounded-lg hover:bg-red-400 focus:outline-none"
                                onClick={() => setConfirmationVisible(false)}
                            >
                                No, Cancel
                            </button>
                            <button
                                className="px-6 py-3 bg-blue-500 cursor-pointer text-white font-semibold rounded-lg hover:bg-blue-400 focus:outline-none"
                                onClick={handleSubmitOrder}
                            >
                                Yes, Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default MakeOrderPage;
