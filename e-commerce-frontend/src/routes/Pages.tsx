import {Routes,Route,Navigate} from "react-router-dom";
import Signup from "../components/Signup";
import Signin from "../components/Signin";
// import Categories from "../components/Categories";
// import Landing from "../components/Landing";
import Cookies from "js-cookie";
import Products from "../components/Products";
import AdminDashboard from "../components/AdminDashboard";
import Cart from "../components/Cart";
import ProductDetailPage from "../components/ProductDetailPage";
import WishList from "../components/WishList";
import Home from "../components/Home";
import MakeOrderPage from "../components/MakeOrder";
import OrderDetailsPage from "../components/OrderDetailsPage";

function Pages() {
  // console.log(document.cookie);
  const token=Cookies.get("token");
  console.log(token);
  return (
    <>
        {
          token ?
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/categories" element={<Home/>}/>
            <Route path="/products" element={<Products/>}/>
            <Route path="/product/:id" element={<ProductDetailPage/>}/>
            <Route path="/dashboard" element={<AdminDashboard/>}/>
            <Route path="/cart" element={<Cart/>}/>
            <Route path="/signup" element={<Signup/>}/>
            <Route path="/signin" element={<Signin/>}/>
            <Route path="/wishlist" element={<WishList/>}/>
            <Route path="/checkout/:id" element={<MakeOrderPage/>}/>
            <Route path="/checkout" element={<MakeOrderPage/>}/>
            <Route path="/orders" element={<OrderDetailsPage/>}/>
          </Routes>:
          <Routes> 
            <Route path="*" element={<Navigate to="/" replace/>}/> 
            <Route path="/" element={<Home/>}/>
            <Route path="/categories" element={<Home/>}/>
            <Route path="/products" element={<Products/>}/>
            <Route path="/product/:id" element={<ProductDetailPage/>}/>
            <Route path="/signup" element={<Signup/>}/>
            <Route path="/signin" element={<Signin/>}/>
          </Routes>
            
        }
            
    </>
  )
}

export default Pages
