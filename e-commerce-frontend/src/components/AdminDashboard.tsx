import { useEffect, useState } from "react";
import AdminSideBar from "../subComponents.tsx/AdminSideBar";
import { makeUnAuthorizedGetRequest } from "../services/unAuthorizedRequest";
import ProductList from "../subComponents.tsx/ProductList";
import CategoryList from "../subComponents.tsx/CategoryList";
import AddProductModal from "./AddProductModal";
import AddCategoriesModal from "./AddCategoriesModal";
import CustomerList from "../subComponents.tsx/CustomerList";
import { makeAuthorizedGetRequest } from "../services/authorizedRequests";

function AdminDashboard() {
  const [page, setPage] = useState("products");
  const [productData, setProductData] = useState<forProductbyName[]>();
  const [categoriesData, setCategoriesData] = useState<forCategories[]>();
  const [userData, setUserData] = useState<forUser[]>();
  const [toggleModal, setToggleModal] = useState(false);
  const [listChange, setListChange] = useState(false);
  const [editProduct, setEditProduct] = useState<forProductbyName>();
  const [editCategory, setEditCategory] = useState<forCategories>();

  const getData = async (page: string) => {
    let response;
    if(page==="users"){
     response = await makeAuthorizedGetRequest(`/${page}`);
    }
    else{
      response = await makeUnAuthorizedGetRequest(`/${page}`);
    }
    console.log(response, "Admin page change");
    if (response && response?.data) {
      if (page === "products") {
        setProductData(response.data);
      } else if (page === "categories") {
        setCategoriesData(response.data);
      } else {
        setUserData(response.data);
      }
      console.log(response);
    }
  };

  useEffect(() => {
    getData(page);
  }, [page, listChange]);

  return (
    <div className="min-h-screen  flex w-full  bg_color  ">
      <AdminSideBar setPage={setPage} page={page} />
      <div
        className={`flex flex-col w-full  ${toggleModal && "opacity-25"}`}
        // onClick={()=>{if(toggleModal){
        // setToggleModal(false)}}}
      >
        <div className="shadow-lg h-20  px-10 items-center flex justify-between">
          <div className="font-semibold text-3xl text-blue-500">{page}</div>
          {(page === "products" || page === "categories") && (
            <div className="flexgap-2">
              <button
                className="shadow-xl bg-blue-400 w-40 p-2 text-lg cursor-pointer"
                onClick={() => {
                  setToggleModal(true);
                  // console.log(toggleModal);
                }}
              >
                + Add
              </button>
            </div>
          )}
        </div>
        <div className="flex flex-col w-300  mx-auto px-5 my-2 py-5 bg-white ">
          <div className="text-3xl pb-3 font-semibold text-gray-600">
            Product list
          </div>
          {page === "products" ? (
            <ProductList
              data={productData!}
              setListChange={setListChange}
              listChange={listChange}
              setEditProduct={setEditProduct}
              setToggleModal={setToggleModal}
            />
          ) : page === "categories" ? (
            <CategoryList
              data={categoriesData!}
              setListChange={setListChange}
              listChange={listChange}
              setEditCategory={setEditCategory}
              setToggleModal={setToggleModal}
            />
          ) : (
            <CustomerList data={userData!} />
          )}
        </div>
      </div>
      {toggleModal &&
        (page === "products" ? (
          <AddProductModal
            setToggleModal={setToggleModal}
            setListChange={setListChange}
            listChange={listChange}
            editProduct={editProduct!}
          />
        ) : (
          <AddCategoriesModal
            setToggleModal={setToggleModal}
            setListChange={setListChange}
            listChange={listChange}
            editCategory={editCategory!}
          />
        ))}
    </div>
  );
}

export default AdminDashboard;
