import Product from "../subComponents.tsx/Product";
import Container from "./Container";
import { useEffect, useState } from "react";
import { makeUnAuthorizedGetRequest } from "../services/unAuthorizedRequest";
import {  useSearchParams } from "react-router-dom";
import CartModal from "./CartModal";

function Products() {
    // const [Name,setName]=useState<string>();
    const [products,setProducts]=useState<forProductbyName[]|undefined>();
    const [price,setPrice]=useState("");
    const [searchParams] = useSearchParams();
    const [isModalOpen,setModalOpen]=useState(false);
    const name=searchParams.get("name");
    const categoryID=searchParams.get("categoryID");

    const getData = async () => {
      const queryParams = [];
    
      if (categoryID) queryParams.push(`categoryID=${categoryID}`);
      if (name) queryParams.push(`name=${name}`);
      if (price) queryParams.push(`price=${price}`);
    
      const queryString = queryParams.length ? `?${queryParams.join("&")}` : "";
      
      try {
        const response = await makeUnAuthorizedGetRequest(`/products${queryString}`);
        setProducts(response?.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    useEffect(() => {
      getData();
      console.log(price)
    }, [name,price,categoryID]);
    
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
                    return <Product product={product} key={product.productID} setModalOpen={setModalOpen}/>
                })}
          </div>
        </div>
        {isModalOpen && <CartModal setModalOpen={setModalOpen}/>}
    </div>
    </Container>
  );
}

export default Products;
