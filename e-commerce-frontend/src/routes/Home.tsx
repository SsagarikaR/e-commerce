import {Routes,Route} from "react-router-dom";
import Signup from "../components/Signup";
import Signin from "../components/Signin";
import Categories from "../components/Categories";
import Landing from "../components/Landing";
import Cookies from "js-cookie";
import Products from "../components/Products";
import AdminDashboard from "../components/AdminDashboard";

function Home() {
  // console.log(document.cookie);
  const token=Cookies.get("token");
  console.log(token);
  return (
    <>
        
          {
            // token ?
            <Routes>
              <Route path="/categories" element={<Categories/>}/>
              <Route path="/categories/:name" element={<Products/>}/>
              <Route path="/products/:name" element={<Products/>}/>
              <Route path="/dashboard" element={<AdminDashboard/>}/>
            {/* </Routes>: */}
            {/* <Routes> */}
              {/* <Route path="*" element={<Landing/>}/> */}
              <Route path="/" element={<Landing/>}/>
              <Route path="/signup" element={<Signup/>}/>
              <Route path="/signin" element={<Signin/>}/>
            </Routes>
            
          }
            
    </>
  )
}

export default Home
