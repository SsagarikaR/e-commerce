import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { 
    makeAuthorizedGetRequest, 
    makeAuthorizedPostRequest, 
    makeAuthorizedPatchRequest, 
    makeAuthorizedDeleteRequest 
} from "../services/authorizedRequests";

const CartContext = createContext<cartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cart, setCart] = useState<cartItem[]>([]);

    const fetchCart = async () => {
        const response = await makeAuthorizedGetRequest(`/cart`);
        // console.log(response);
        if (response?.data) {
            setCart(response.data);
        }
        console.log(cart,"response of cart item")
    };

    useEffect(() => {
        fetchCart();
    }, []);

    const addToCart = async (productID:number) => {
        const response = await makeAuthorizedPostRequest("/cart", {
            productID: productID,
            quantity: 1,
        });
        // console.log(response);
        if (response?.data) {
            fetchCart();
        }
    };
    
    const removeFromCart = async (cartItemID: number) => {
        const response = await makeAuthorizedDeleteRequest(`/cart`, {cartItemID:cartItemID});
        if (response?.data ) {
            fetchCart();
        }
    };

    const updateQuantity = async (cartItemID: number, quantity: number) => {
        const response = await makeAuthorizedPatchRequest(`/cart`, { cartItemID:cartItemID,quantity:quantity });
        if (response?.data) {
            fetchCart();
        }
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, fetchCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
};
