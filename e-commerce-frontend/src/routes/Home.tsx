import {Routes,Route} from "react-router-dom";
import Signup from "../components/Signup";
import Signin from "../components/Signin";
import Categories from "../components/Categories";

function Home() {
  return (
    <>
        <Routes>
            <Route path="/signup" element={<Signup/>}/>
            <Route path="/signin" element={<Signin/>}/>
            <Route path="/" element={<Categories/>}/>
        </Routes>
    </>
  )
}

export default Home
