import editIcon from "../assets/edit.png";
import deleteIcon from "../assets/delete.png";
import { BRAND_LIST_HEADING } from "../constants/adminListTablesConst";

function BrandList({
  data,
  setDeleteBrandID,
  setEditBrand,
  setToggleModal,
  setIsDelete,
}: brandListProp) {
  return (
    <div>
      <table className="w-full border-collapse border border-gray-400 text-lg text-gray-700">
        <thead>
          <tr>
            <th className="border border-gray-400 p-5">
              {BRAND_LIST_HEADING.brand_name}
            </th>
            <th className="border border-gray-400 p-5">
              {BRAND_LIST_HEADING.action}
            </th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item) => (
            <tr key={item.brandID}>
              <td className="border border-gray-400 p-2">
                <div className="flex items-center space-x-2">
                  <img
                    src={item.brandThumbnail}
                    className="w-15 h-15 shadow-lg "
                  />
                  <span>{item.brandName}</span>
                </div>
              </td>
              <td className="border border-gray-400 p-2">
                <div className="flex space-x-2">
                  <img
                    src={editIcon}
                    className="w-10 h-10 p-1 cursor-pointer"
                    onClick={() => {
                      setEditBrand(item);
                      setToggleModal(true);
                    }}
                  />
                  <img
                    src={deleteIcon}
                    className="w-10 h-10 p-1 cursor-pointer"
                    onClick={() => {
                      setDeleteBrandID(item.brandID);
                      setIsDelete(true);
                    }}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default BrandList;
