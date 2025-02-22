import { Link } from "react-router-dom"

function Category({category}:{category:forCategories}) {
  return (
    <Link to={`/products?categoryID=${category.categoryID}`}><div className='flex flex-col cursor-pointer transition-transform duration-300 hover:scale-95' >
        <div className="m-auto"><img src={category.categoryThumbnail} className='w-75 h-75'/></div>
        <div className='text-gray-800 text-center font text-xl'>{category.categoryName}</div>
    </div>
    </Link>
  )
}

export default Category
