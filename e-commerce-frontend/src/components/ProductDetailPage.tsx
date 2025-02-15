import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { forProductbyName } from "../interface/interface";
import { makeUnAuthorizedGetRequest } from "../services/unAuthorizedRequest";
import { useCart } from "../context/cartContext";
import Container from "./Container";

function ProductDetailPage() {
    const [product,setProduct]=useState<forProductbyName[]>();
    const {id}=useParams();
    const {addToCart}=useCart();

    const fetchData=async()=>{
        const response=await makeUnAuthorizedGetRequest(`/products?id=${id}`);
        if(response?.data){
            setProduct(response.data)
        }
    }

    useEffect(()=>{
        fetchData();
    },[id])

    return (
        <Container>
        <div className="flex items-center justify-center">
            {product?
                <div className="flex p-20 gap-x-10">
                    <div className="">
                        <img src={product[0].ProductThumbnail} className="shadow-[0_0_15px_5px_rgba(0,0,0,0.3)] w-150 h-150"/>
                    </div>
                    <div className="w-150 text-gray-600 gap-y-9 flex flex-col">
                        <div className="flex gap-y-2 flex-col ">
                            <div className="text-4xl font-semibold">{product[0].productName}</div>
                            <div className="text-2xl font-normal">{product[0].productPrice}</div>
                            <div className=" border-b  w-150 "></div>
                        </div>
                        <div className="text-justify text-lg">{product[0].productDescription}</div>
                        <button className="bg-blue-300 hover:bg-blue-500 text-black p-3 text-xl font-semibold rounded-lg w-100 mx-auto" 
                        onClick={()=>{
                            addToCart(product[0].productID)
                        }}>ADD TO CART</button>
                    </div>
                </div>
            :<div>No product found</div>}
        </div>
        </Container>
    )
}

export default ProductDetailPage
