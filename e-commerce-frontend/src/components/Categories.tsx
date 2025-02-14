import Container from './Container'
import "../styles/categories.css";
import Category from '../subComponents.tsx/Category';
import { useEffect, useState } from 'react';
import { makeAuthorizedGetRequest } from '../services/authorizedRequests';
import { forCategories } from '../interface/interface';

function Categories() {
  const [categories,setCategories]=useState<forCategories[]|undefined>();

  const getData=async()=>{
    const response=await makeAuthorizedGetRequest("/categories");
    console.log(response);
    if(response){
      setCategories(response.data);
    }
  }
  useEffect(()=>{
    getData();
  },[])

  return (
    <Container>
    <div className='p-10 flex-col flex w-full '>
      <h1 className='text-center text-4xl font-bold font '>Choose a category</h1>
      <div className='grid grid-cols-5 gap-x-5 pt-4 justify-center'>
        {categories && categories.map((category)=>{
          return <Category category={category}/>
        })}
      </div>
    </div>
    </Container>
  )
}

export default Categories
