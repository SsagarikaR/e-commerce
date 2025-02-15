import { forCategories } from "../interface/interface"
import editIcon from "../assets/edit.png";
import deleteIcon from "../assets/delete.png";

function CategoryList({data}:{data:forCategories[]}) {
  return (
    <table className="w-full border-collapse border border-gray-400 text-lg text-gray-700">
    <thead>
      <tr>
        <th className="border border-gray-400 p-5">Product Name</th>
        <th className="border border-gray-400 p-5">Action</th>
      </tr>
    </thead>
    <tbody>
      {data?.map((d) => (
        <tr key={d.categoryID}>
          <td className="border border-gray-400 p-2">
            <div className="flex items-center space-x-2">
              <img src={d.categoryThumbnail} className="w-15 h-15 shadow-lg " />
              <span>{d.categoryName}</span>
            </div>
          </td>
          <td className="border border-gray-400 p-2">
            <div className="flex space-x-2">
              <img src={editIcon} className="w-10 h-10 p-1" />
              <img src={deleteIcon} className="w-10 h-10 p-1" />
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
  )
}

export default CategoryList
