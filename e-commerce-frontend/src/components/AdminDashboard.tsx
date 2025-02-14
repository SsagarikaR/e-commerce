import { useEffect, useState } from "react"
import AdminSideBar from "../subComponents.tsx/AdminSideBar"
import { makeUnAuthorizedGetRequest } from "../services/unAuthorizedRequest"
import { forProductbyName } from "../interface/interface"

function AdminDashboard() {
  const [page,setPage]=useState("products")
  const [data,setData]=useState<forProductbyName[]>();

  const getData=async()=>{
    const response=await makeUnAuthorizedGetRequest(`/${page}`)
    if(response && response?.data){
      setData(response.data);
      console.log(response)
    }
  }
  useEffect(()=>{
  getData();
},[])

  return (
    <div className='min-h-screen  flex w-full bg_color  '>
      <AdminSideBar setPage={setPage} page={page}/>
      <div className="flex flex-col">
        <div> {page}</div>
        <div className="flex flex-col">
          <div>Product list</div>
          <table>
            <thead>
              <tr>
              <th>Product Name</th>
              <th>Category</th>
              <th>Price</th>
              </tr>
            </thead>

          </table>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
