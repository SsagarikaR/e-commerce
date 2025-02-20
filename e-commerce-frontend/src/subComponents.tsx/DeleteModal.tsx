import { makeAuthorizedDeleteRequest } from "../services/authorizedRequests";
import { MODAL_TEXTS } from "../constants/adminDashboardConst"

function DeleteModal({page,deleteID,listChange,setListChange,setIsDelete}:forDeleteModalProp) {
     
        // function to delete specific product
         const deleteProduct = async () => {
            console.log(deleteID);
           const response = await makeAuthorizedDeleteRequest(`/products`, { productID:deleteID });
            if (response?.data) {
                setListChange(!listChange);
            }
        }
    
        // function to delete specific category
        const deleteCategories = async () => {
            const response = await makeAuthorizedDeleteRequest(`/categories`, { categoryID:deleteID});
            if (response?.data) {
              setListChange(!listChange);
            }
        }
    
     
        // function to delete specific brand
        const deleteBrand = async () => {
            const response = await makeAuthorizedDeleteRequest(`/brands`, { brandID:deleteID });
            if (response) {
              setListChange(!listChange);
            }
        }
    
    return (
    <div className="fixed bg-white w-100 h-60 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-6 p-6">
        <div className="text-2xl text-center font-bold">{MODAL_TEXTS.deleteConfirmation}</div>
        <div className="text-center font-medium text-lg">{MODAL_TEXTS.deleteWarning}</div>
        <div className="flex justify-between">
            <button className="bg-blue-400 p-2 w-30 font-semibold cursor-pointer" onClick={() => setIsDelete(false)}>
              {MODAL_TEXTS.cancelButton}
            </button>
            <button className="bg-red-400 p-2 w-30 font-semibold cursor-pointer" onClick={() => {
              if (page === "products") {
                deleteProduct();
              } else if (page === "categories") {
                deleteCategories();
              } else if (page === "brands") {
                deleteBrand();
              }
              setIsDelete(false);
            }}>
              {MODAL_TEXTS.deleteButton}
            </button>
        </div>
    </div>
  )
}

export default DeleteModal
