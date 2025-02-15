import Container from './Container'
import "../styles/categories.css";
import Category from '../subComponents.tsx/Category';
import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { makeAuthorizedGetRequest } from '../services/authorizedRequests';
import { forCategories } from '../interface/interface';

function Categories() {
  const [categories,setCategories]=useState<forCategories[]|undefined>();
  const [searchParams] = useSearchParams(); 
  const categoryName = searchParams.get("name"); 

   const getData = async () => {
    let endpoint = "/categories";
    if (categoryName) {
      endpoint += `?name=${categoryName}`;
    }
    const response = await makeAuthorizedGetRequest(endpoint);
    
    if (response) {
      setCategories(response.data);
    }
  };

  useEffect(()=>{
    getData();
  },[categoryName])

  return (
    <Container>
    <div className='p-10 flex-col flex w-full '>
      <h1 className='text-center text-4xl font-bold font '>Choose a category</h1>
      <div className='grid grid-cols-5 gap-x-5 pt-4 justify-center'>
        {categories && categories.map((category)=>{
          return <Category category={category} key={category.categoryID}/>
        })}
      </div>
    </div>
    </Container>
  )
}

export default Categories
