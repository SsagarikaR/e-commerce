import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"  
import { makeUnAuthorizedGetRequest } from "../services/unAuthorizedRequest"; import { useCart } from "../context/cartContext";  // Custom hook for cart context to manage cart actions
import Container from "../containers/Container";  
import CartModal from "./CartModal";  
import { ADD_TO_CART_BTN } from "../constants/btnConst";  
import favIcon from "../assets/fav.png";
import notFavIcon from "../assets/nFav.png";
import { makeAuthorizedGetRequest,makeAuthorizedDeleteRequest,makeAuthorizedPostRequest } from "../services/authorizedRequests";
import Review from "./Review";

function ProductDetailPage() {
   const [product, setProduct] = useState<product[]>();
   const [WishList,setWishList]=useState<wishList[]|undefined>();
   const [toggleWishList,setToggleWishList]=useState(false);
   const [isModalOpen, setModalOpen] = useState(false);
   const { id } = useParams(); 
   const { addToCart } = useCart();

    
    //  Function to fetch product data based on the product id
    const fetchData = async () => {
        // Send GET request to fetch the product details by id
        const response = await makeUnAuthorizedGetRequest(`/products?id=${id}`);
        if (response?.data) {
            setProduct(response.data);  // Update the state with the fetched product details
        }
    };

    //check whether product is in the wish list
      const fetchWishList=async()=>{
        const response=await makeAuthorizedGetRequest(`/wishlist/${id}`);
        console.log(response,"response");
        if(response?.data){
         setWishList(response.data);
        }
        else{
          setWishList(undefined);
        }
      }
    
      //add item to wishList 
      const addToWishList=async()=>{
        let response
        if(WishList){
          response=await makeAuthorizedDeleteRequest("/wishlist",{wishListID:WishList[0].wishListID});
        }
        else{
          response=await makeAuthorizedPostRequest("/wishlist",{productID:id});
        }
        if(response?.data){
          setToggleWishList(!toggleWishList);
        }
      }

      const addToPrefernces=async()=>{
        const response =await makeAuthorizedPostRequest("/prefernces",{productID:id});
        console.log(response,"product added to recomendation");
      }
    
    useEffect(()=>{
      fetchWishList();
    },[toggleWishList])

    
    //  Effect hook to fetch data whenever the product id changes (from the URL)
    useEffect(() => {
        fetchData();
        addToPrefernces();
    }, []);

    return (
        <Container>
            <div className="flex items-center justify-center ">
                {/* Render product details if product is available */}
                {product ? (
                    <div className="flex p-20 gap-10 flex-col md:flex-row ">
                        <div className='absolute m-2 cursor-pointer ' onClick={()=>{addToWishList()}}>
                            {
                                WishList?<img src={favIcon} className='w-10 h-10 '/>
                                :<img src={notFavIcon} className='w-10 h-10'/>
                            }
                        </div>
                        <div className="">
                            <img
                                src={product[0].ProductThumbnail}
                                className="shadow-[0_0_15px_5px_rgba(0,0,0,0.3)] w-150 h-150 md:w-100  md:h-100 2xl:w-150 2xl:h-150 "
                            />
                        </div>
                        <div className=" -150 md:w-100 lg:w-150 text-gray-700 gap-y-9 flex flex-col ">
                            <div className="flex gap-y-4 flex-col ">
                                <div className="flex gap-x-3">
                                    <div className="text-4xl font-semibold">{product[0].productName}</div>
                                    <img
                                        src={product[0].brandThumbnail}
                                        className="w-10 h-10 rounded-full border "
                                    />
                                </div>
                                <div className="text-2xl font-normal">₹{product[0].productPrice}</div>
                                {/* To create divider line */}
                                <div className=" border-b  w-150 md:w-100 lg:w-150"></div>
                            </div>
                            <div className="text-justify text-lg">{product[0].productDescription}</div>
                            <div className="flex flex-col gap-y-2">
                                <button
                                    className="bg-blue-400 hover:bg-blue-500 text-black p-3 text-xl font-semibold rounded-lg w-100 mx-auto"
                                    onClick={() => {
                                        addToCart(product[0].productID);  // Add the product to the cart
                                        setModalOpen(true);  // Open the cart modal
                                    }}
                                >
                                    {ADD_TO_CART_BTN}  {/* Button text from constant */}
                                </button>
                                <div className="w-100 bg-orange-400   p-3  h-14 rounded-xl text-2xl font-semibold hover:bg-orange-500 flex justify-center items-center gap-x-2 cursor-pointer mx-auto">
                                    <button >Buy Now</button>
                                </div>
                            </div>
                            <Review 
                                productID={Number(id)}
                                rating={product[0].rating}/>
                        </div>
                    </div>
                ) : (
                    <div>No product found</div> 
                )}
                
                {/* Conditionally render CartModal when it is open */}
                {isModalOpen && <CartModal setModalOpen={setModalOpen} />}
            </div>
        </Container>
    );
}

export default ProductDetailPage;  
