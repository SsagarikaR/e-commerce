import { useEffect, useState } from "react";
import AdminSideBar from "../subComponents.tsx/AdminSideBar";
import { makeUnAuthorizedGetRequest } from "../services/unAuthorizedRequest";
import ProductList from "../subComponents.tsx/ProductList";
import CategoryList from "../subComponents.tsx/CategoryList";
import AddProductModal from "./AddProductModal";
import AddCategoriesModal from "./AddCategoriesModal";
import CustomerList from "../subComponents.tsx/CustomerList";
import { makeAuthorizedGetRequest, makeAuthorizedDeleteRequest } from "../services/authorizedRequests";
import BrandList from "../subComponents.tsx/BrandList";
import AddBrandModal from "./AddBrandModal";

function AdminDashboard() {
  // State variables to manage the current page, data, and modal states
  const [page, setPage] = useState("products");
  const [productData, setProductData] = useState<forProductbyName[]>();
  const [categoriesData, setCategoriesData] = useState<forCategories[]>();
  const [userData, setUserData] = useState<forUser[]>();
  const [brandData, setBrandData] = useState<forBrand[]>();
  const [toggleModal, setToggleModal] = useState(false);
  const [listChange, setListChange] = useState<boolean>(false);
  const [editProduct, setEditProduct] = useState<forProductbyName>();
  const [editCategory, setEditCategory] = useState<forCategories>();
  const [editBrand, setEditBrand] = useState<forBrand>();
  const [isDelete, setIsDelete] = useState(false);
  const [deleteProductID, setDeleteProductID] = useState<number>();
  const [deleteCategoryID, setDeleteCategoryID] = useState<number>();
  const [deleteBrandID, setDeleteBrandID] = useState<number>();

  // Function to delete a product by ID
  const deleteProduct = async (productID: number) => {
    console.log(productID);
    const response = await makeAuthorizedDeleteRequest(`/products`, { productID: productID });
    if (response?.data) {
      setListChange(!listChange); // Toggle list change to refresh the data
    }
  }

  // Function to delete a category by ID
  const deleteCategories = async (categoryID: number) => {
    const response = await makeAuthorizedDeleteRequest(`/categories`, { categoryID: categoryID });
    if (response?.data) {
      setListChange(!listChange); // Toggle list change to refresh the data
    }
  }

  // Function to delete a brand by ID
  const deleteBrand = async (brandID: number) => {
    const response = await makeAuthorizedDeleteRequest(`/brands`, { brandID: brandID });
    if (response) {
      setListChange(!listChange); // Toggle list change to refresh the data
    }
  }

  // Function to fetch data based on the current page
  const getData = async (page: string) => {
    let response;
    if (page === "users") {
      response = await makeAuthorizedGetRequest(`/${page}`);
    } else {
      response = await makeUnAuthorizedGetRequest(`/${page}`);
    }
    console.log(response, "Admin page change");
    if (response && response?.data) {
      if (page === "products") {
        setProductData(response.data);
      } else if (page === "categories") {
        setCategoriesData(response.data);
      } else if (page === "brands") {
        setBrandData(response.data);
      } else {
        setUserData(response.data);
      }
      console.log(response);
    }
  };

  // useEffect to fetch data when the page or listChange state changes
  useEffect(() => {
    getData(page);
  }, [page, listChange]);

  return (
    <div className="min-h-screen flex w-full bg_color">
      <AdminSideBar setPage={setPage} page={page} />
      <div className={`flex flex-col w-full ${(toggleModal || isDelete) && "opacity-25"} overflow-auto`}>
        <div className="shadow-lg h-20 px-10 items-center flex justify-between">
          <div className="font-semibold text-3xl text-blue-500">{page}</div>
          {(page === "products" || page === "categories" || page === "brands") && (
            <div className="flex gap-2">
              <button
                className="shadow-xl bg-blue-400 w-40 p-2 text-lg cursor-pointer"
                onClick={() => {
                  setToggleModal(true);
                }}
              >
                + Add
              </button>
            </div>
          )}
        </div>
        <div className="flex flex-col w-300 mx-auto px-5 my-2 py-5 bg-white overflow-auto max-h-215">
          {page === "products" ? (
            <div>
              <div className="text-3xl pb-3 font-semibold text-gray-600">Product list</div>
              <ProductList
                data={productData!}
                setDeleteProductID={setDeleteProductID}
                setEditProduct={setEditProduct}
                setToggleModal={setToggleModal}
                setIsDelete={setIsDelete}
              />
            </div>
          ) : page === "categories" ? (
            <div>
              <div className="text-3xl pb-3 font-semibold text-gray-600">Category list</div>
              <CategoryList
                data={categoriesData!}
                setDeleteCatgeoryID={setDeleteCategoryID}
                setEditCategory={setEditCategory}
                setToggleModal={setToggleModal}
                setIsDelete={setIsDelete}
              />
            </div>
          ) : (page === "users" ?
            <div>
              <div className="text-3xl pb-3 font-semibold text-gray-600">Customer list</div>
              <CustomerList data={userData!} />
            </div>
            :
            <div>
              <div className="text-3xl pb-3 font-semibold text-gray-600">Brand list</div>
              <BrandList
                data={brandData!}
                setDeleteBrandID={setDeleteBrandID}
                setEditBrand={setEditBrand}
                setToggleModal={setToggleModal}
                setIsDelete={setIsDelete}
              />
            </div>
          )}
        </div>
      </div>
      {isDelete &&
        <div className="fixed bg-white w-100 h-60 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-6 p-6">
          <div className="text-2xl text-center font-bold">Are you sure?</div>
          <div className="text-center font-medium text-lg">Do you really want to delete this record? This process can't be undone.</div>
          <div className="flex justify-between">
            <button className="bg-blue-400 p-2 w-30 font-semibold cursor-pointer" onClick={() => { setIsDelete(false) }}>Cancel</button>
            <button className="bg-red-400 p-2 w-30 font-semibold cursor-pointer" onClick={() => {
              if (page === "products") {
                deleteProduct(deleteProductID!);
              } else if (page === "categories") {
                deleteCategories(deleteCategoryID!);
              } else if (page === "brands") {
                deleteBrand(deleteBrandID!);
              }
              setIsDelete(false);
            }}>Delete</button>
          </div>
        </div>}
      {toggleModal &&
        (page === "products" ? (
          <AddProductModal
            setToggleModal={setToggleModal}
            setListChange={setListChange}
            editProduct={editProduct!}
          />
        ) :
          (page === "categories" ?
            <AddCategoriesModal
              setToggleModal={setToggleModal}
              setListChange={setListChange}
              editCategory={editCategory!}
            /> :
            <AddBrandModal
              setToggleModal={setToggleModal}
              setListChange={setListChange}
              editBrand={editBrand!}
            />)
        )
      }
    </div>
  );
}

export default AdminDashboard;

