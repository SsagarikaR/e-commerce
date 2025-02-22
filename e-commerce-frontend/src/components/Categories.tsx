import "../styles/categories.css";
import Category from '../subComponents.tsx/Category';
import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { makeAuthorizedGetRequest } from '../services/authorizedRequests';


function Categories() {
  const [categories,setCategories]=useState<forCategories[]|undefined>();
  const [searchParams] = useSearchParams(); 
  const categoryName = searchParams.get("name"); 

    /**
     * Function to fetch category data from the API
     */
   const getData = async () => {
    let endpoint = "/categories";
    if (categoryName) {//add the query params if the categoryName has selected in the navbar
      endpoint += `?name=${categoryName}`; 
    }
    const response = await makeAuthorizedGetRequest(endpoint);
    
    //if the response is valid update the categories 
    if (response) {
      setCategories(response.data);
    }
  };

  //fetch data in the render or in the categoryName change
  useEffect(()=>{
    getData();
  },[categoryName])

  return (
      <div>
        <h1 className=' text-3xl  font-bold font-serif text-center md:text-start'>Choose a category</h1>
        {categories && categories?.length>0?<div className='grid grid-cols-1 xl:grid-cols-5 margin-auto self-center sm:grid-cols-2 lg:grid-cols-4 gap-x-5 pt-4 justify-center md:grid-cols-3'>
          {categories && categories.map((category)=>{
            return <Category category={category} key={category.categoryID}/>
          })}
        </div>:<div className='text-center mt-6 text-2xl font-medium text-red-800'>No item found</div>}
      </div>
  )
}

export default Categories
