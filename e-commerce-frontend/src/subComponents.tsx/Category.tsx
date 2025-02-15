import { Link } from "react-router-dom"
import { forCategories } from "../interface/interface"

function Category({category}:{category:forCategories}) {
  return (
    <Link to={`/products?categoryID=${category.categoryID}`}><div className='flex flex-col cursor-pointer' >
        <div><img src={category.categoryThumbnail} className='w-75'/></div>
        <div className='text-gray-800 text-center font text-xl'>{category.categoryName}</div>
    </div>
    </Link>
  )
}

export default Category
