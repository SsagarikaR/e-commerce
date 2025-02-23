import React from 'react'
import { Link } from 'react-router-dom'

function PrefernceCard({item}:{item:prefernce}) {
  return (
    <Link to={`/product/${item.productID}`}>
        <div key={item.preferenceID} className=" flex flex-col items-center justify-center rounded-lg p-2 shadow-md transition-transform duration-300 hover:scale-95">
            <img 
              src={item.productThumbnail} 
              alt={item.productName} 
              className="  object-cover h-75 w-75 rounded-md" 
            />
            <div className="mt-2 ">
              <h2 className="text-lg font-semibold">{item.productName}</h2>
              <p className="text-lg font-semibold">₹{item.productPrice}</p>
            </div>
        </div></Link>
  )
}

export default PrefernceCard
