import { useEffect, useState } from "react";
import AdminSideBar from "../subComponents.tsx/AdminSideBar";
import { makeUnAuthorizedGetRequest } from "../services/unAuthorizedRequest";
import ProductList from "../subComponents.tsx/ProductList";
import CategoryList from "../subComponents.tsx/CategoryList";
import AddProductModal from "../subComponents.tsx/AddProductModal";
import AddCategoriesModal from "../subComponents.tsx/AddCategoriesModal";
import CustomerList from "../subComponents.tsx/CustomerList";
import { makeAuthorizedGetRequest} from "../services/authorizedRequests";
import BrandList from "../subComponents.tsx/BrandList";
import AddBrandModal from "../subComponents.tsx/AddBrandModal";
import { PAGE_TITLES, BUTTON_TEXTS, LIST_TITLES } from "../constants/adminDashboardConst";
import DeleteModal from "../subComponents.tsx/DeleteModal";

function AdminDashboard() {
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

 

  /**
   * Get list of data on the basis of current page view
   * (e.g. if the current page is users then get users data)
   * */
  const getData = async (page: string) => {
    let response;
    if (page === "users") {
      //for user only make authorized request cause it's accessible by admin only
      response = await makeAuthorizedGetRequest(`/${page}`);
    } else {
      response = await makeUnAuthorizedGetRequest(`/${page}`);
    }
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
    }
  };


  /**
   *  fetch data on initial render, on page change ,
   * or on adding or deleting new data (listChange changes on data change)
   * the list data according to current page
   */
  useEffect(() => {
    getData(page);
  }, [page, listChange]);

  return (
    <div className="min-h-screen flex w-full bg_color">
      <AdminSideBar setPage={setPage} page={page} />
      <div className={`flex flex-col w-full ${(toggleModal || isDelete) && "opacity-25"} overflow-auto`}>
        <div className="shadow-lg h-20 px-10 items-center flex justify-between">
          <div className="font-semibold text-3xl text-blue-500">{PAGE_TITLES[page  as keyof typeof PAGE_TITLES]}</div>
          {(page === "products" || page === "categories" || page === "brands") && (
            <div className="flex gap-2">
              <button
                className="shadow-xl bg-blue-400 w-40 p-2 text-lg cursor-pointer"
                onClick={() => {
                    setToggleModal(true);
                    setEditBrand(undefined);
                    setEditProduct(undefined);
                    setEditCategory(undefined);
                  }
                }
              >
                {BUTTON_TEXTS.addButton}
              </button>
            </div>
          )}
        </div>
        <div className="flex flex-col w-300 mx-auto px-5 my-2 py-5 bg-white overflow-auto max-h-215">
          {page === "products" ? (
            <div>
              <div className="text-3xl pb-3 font-semibold text-gray-600">{LIST_TITLES.productList}</div>
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
              <div className="text-3xl pb-3 font-semibold text-gray-600">{LIST_TITLES.categoryList}</div>
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
              <div className="text-3xl pb-3 font-semibold text-gray-600">{LIST_TITLES.customerList}</div>
              <CustomerList 
                data={userData!} 
                setListChange={setListChange}
              />
            </div>
            :
            <div>
              <div className="text-3xl pb-3 font-semibold text-gray-600">{LIST_TITLES.brandList}</div>
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
        <DeleteModal
          page={page}
          deleteID={page==="products"?deleteProductID!
                    :(page==="categories"?deleteCategoryID!
                    :deleteBrandID!)}
          listChange={listChange}
          setListChange={setListChange}
          setIsDelete={setIsDelete}
        />
      }
      {toggleModal && //Form Modal for add or update data
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


