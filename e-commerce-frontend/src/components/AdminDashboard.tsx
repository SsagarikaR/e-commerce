import { useEffect, useState } from "react";
import AdminSideBar from "../subComponents.tsx/AdminSideBar";
import { makeUnAuthorizedGetRequest } from "../services/unAuthorizedRequest";
import { forCategories, forProductbyName } from "../interface/interface";
import ProductList from "../subComponents.tsx/ProductList";
import CategoryList from "../subComponents.tsx/CategoryList";

function AdminDashboard() {
  const [page, setPage] = useState("products");
  const [productData, setProductData] = useState<forProductbyName[]>();
  const [categoriesData,setCategoriesData]=useState<forCategories[]>();

  const getData = async (page:string) => {
    const response = await makeUnAuthorizedGetRequest(`/${page}`);
    console.log(response,"Admin page change")
    if (response && response?.data) {
      if(page==="products"){
        setProductData(response.data)
      } 
      else{
        setCategoriesData(response.data)
      }
      console.log(response);
    }
  };
  useEffect(() => {
    getData(page);
  },[page]);

  return (
    <div className="min-h-screen  flex w-full bg_color  ">
      <AdminSideBar setPage={setPage} page={page} />
      <div className="flex flex-col w-full  ">
        <div className="shadow-lg h-20  px-10 items-center flex justify-between">
          <div className="font-semibold text-3xl text-blue-500">{page}</div>
          {(page==="products"|| page==="categories" )&&
          <div className="flexgap-2">
            <button className="shadow-xl bg-blue-400 w-40 p-2 text-lg">+ Add</button>
          </div>}
        </div>
        <div className="flex flex-col w-300  mx-auto px-5 my-2 py-5 bg-white ">
          <div className="text-3xl pb-3 font-semibold text-gray-600">Product list</div>
          {page==="products"?<ProductList data={productData!} />:<CategoryList data={categoriesData!}/>}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
