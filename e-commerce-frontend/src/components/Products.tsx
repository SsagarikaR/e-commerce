import Product from "../subComponents.tsx/Product";
import Container from "./Container";
import { useEffect, useState } from "react";
import { makeUnAuthorizedGetRequest } from "../services/unAuthorizedRequest";
import {  useSearchParams } from "react-router-dom";
import { forProductbyName } from "../interface/interface";

function Products() {
    // const [Name,setName]=useState<string>();
    const [products,setProducts]=useState<forProductbyName[]|undefined>();
    const [price,setPrice]=useState("");
    const [searchParams] = useSearchParams();
    const name=searchParams.get("name");
    const categoryID=searchParams.get("categoryID");

    const getData = async () => {
        // console.log(name)
      if(categoryID && price!==""){
        const resposnse = await makeUnAuthorizedGetRequest(`/products?categoryID=${categoryID}&price=${price}`);
        // console.log(resposnse,"product by name and price");
        setProducts(resposnse?.data)
      }
      else if(categoryID ){
        const resposnse = await makeUnAuthorizedGetRequest(`/products?categoryID=${categoryID}`);
        // console.log(resposnse,"product by name and price");
        setProducts(resposnse?.data)
      }
      if(name && price!==""){
        const resposnse = await makeUnAuthorizedGetRequest(`/products?name=${name}&price=${price}`);
        // console.log(resposnse,"product by name and price");
        setProducts(resposnse?.data)
      }
      else if(name){
        // console.log(name);
        const resposnse = await makeUnAuthorizedGetRequest(`/products?name=${name}`);
        // console.log(resposnse,"product by product name");
        setProducts(resposnse?.data)
      }
      else{
        const resposnse = await makeUnAuthorizedGetRequest(`/products`);
        // console.log(resposnse,"product");
        setProducts(resposnse?.data)
      }
    };
    
    useEffect(() => {
      getData();
      console.log(price)
    }, [name,price]);
    
  return (
    <Container>
      <div className="flex ">
        <div className="p-2 shadow-l ">
          <div className="text-lg p-2 border-b" >
            <select className="outline-none" value={price} onChange={(e)=>{setPrice(e.target.value);}}>
              <option value="" disabled selected className="text-gray-500 hover:bg-gray-500">Sort by price:</option>
              <option value="low-to-high ">Low-to-high</option>
              <option value="high-to-low">High-to-low</option>
            </select>
          </div>
         
        </div>
        <div className="flex flex-col p-5">
            <div className="grid grid-cols-4 gap-10">
                {products&& products.map((product)=>{
                    console.log(product.ProductThumbnail,"product thumbnail");
                    return <Product product={product} key={product.productID}/>
                })}
          </div>
        </div>
    </div>
    </Container>
  );
}

export default Products;
