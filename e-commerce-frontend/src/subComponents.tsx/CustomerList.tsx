import { CUSTOMER_LIST_HEADING } from "../constants/adminListTablesConst"
import { makeAuthorizedPostRequest } from "../services/authorizedRequests"
import rightIcon from "../assets/right.png";
import addIcon from "../assets/Add.png";

function CustomerList({data,setListChange}:forCustomerListProp) {

  const addNewAdmin=async(userID:number)=>{
      const response=await makeAuthorizedPostRequest("/admins",{userID:userID});
      if(response?.data){
        setListChange(prev=>!prev);
      }
  }

  return (
    <table className="w-full border-collapse border border-gray-400 text-lg text-gray-700">
    <thead>
      <tr>
        <th className="border border-gray-400 p-5">{CUSTOMER_LIST_HEADING.customer_name}</th>
        <th className="border border-gray-400 p-5">{CUSTOMER_LIST_HEADING.email}</th>
        <th className="border border-gray-400 p-5">{CUSTOMER_LIST_HEADING.contactNo}</th>
        <th className="border border-gray-400 p-5">{CUSTOMER_LIST_HEADING.role}</th>
        <th className="border border-gray-400 p-5">{CUSTOMER_LIST_HEADING.add_admin}</th>
      </tr>
    </thead>
    <tbody>
      {data?.map((item) => (
        <tr key={item.userID}>
          <td className="border border-gray-400 p-2">
            {item.name}
          </td>
          <td className="border border-gray-400 p-2">
            {item.email}
          </td>
          <td className="border border-gray-400 p-2">
            {item.contactNo}
          </td>
          <td className="border border-gray-400 p-2">
            {item.role}
          </td>
          <td className="border border-gray-400 p-2">
            {
              item.role==="Admin"?
              <img src={rightIcon} className="w-10 h-10"/>:
              <img src={addIcon} className="w-10 h-10" onClick={()=>{addNewAdmin(item.userID)}}/>
            }
          </td>
        </tr>
      ))}
    </tbody>
  </table>
  )
}

export default CustomerList
