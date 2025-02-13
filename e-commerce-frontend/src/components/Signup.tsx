// import React from 'react'
import {Link} from "react-router-dom"
import "../styles/signup.css"
import Input from "../subComponents.tsx/Input";
import { useEffect, useState } from "react"
import { makeUnAuthorizedGetRequest, makeUnAuthorizedPostRequest } from "../services/unAuthorizedRequest";

function Signup() {
  const [full_name,setFull_name]=useState<string>("");
  const [email,setEmail]=useState<string>("");
  const [contact,setContact]=useState<string>("");
  const [role,setRole]=useState<string>("");
  const [password,setPassword]=useState<string>("");
  const [full_name_error, setFullNameError] = useState<string>("");
  const [email_error, setEmail_Error] = useState<string>("");
  const [contact_error, setContactError] = useState<string>("");
  const [password_error, setPasswordError] = useState<string>("");

  const inputField=[
    {
      id:"full_name",
      field:"full_name",
      type:"text",
      value:full_name,
      setValue:setFull_name,
      error:full_name_error,
      setError:setFullNameError
    },
    {
      id:"email",
      field:"email",
      type:"text",
      value:email,
      setValue:setEmail,
      error:email_error,
      setError:setEmail_Error
    },
    {
      id:"contact",
      field:"contact",
      type:"text",
      value:contact,
      setValue:setContact,
      error:contact_error,
      setError:setContactError
    },
    {
      id:"password",
      field:"password",
      type:"password",
      value:password,
      setValue:setPassword,
      error:password_error,
      setError:setPasswordError
    },
  ]

  const createUser=async()=>{
    const resposne=await makeUnAuthorizedPostRequest("/auth/signup",{
      name:full_name,
      email:email,
      contactNo:contact,
      role:role,
      password:password
    });
    console.log(resposne);
  }

  const getData=async()=>{
    const resposnse=await makeUnAuthorizedGetRequest("/products");
    console.log(resposnse);
  }

  useEffect(()=>{
    getData();
  },[])

  return (
   <div className="signup font-bold flex flex-col gap-y-8 p-4">
    <div className='header flex flex-col gap-2'>
      <h1>Sign up</h1>
      <div className="text-xl font-semibold">Already have an account? <Link to="/signin">Sign in</Link></div>
    </div>
    <div className='input_container flex flex-col gap-y-2'>
    {inputField.map((input)=>{
            return <Input
                      field={input.field}
                      id={input.id}
                      type={input.type}
                      value={input.value}
                      setValue={input.setValue}
                      error={input.error}
                      setError={input.setError}
                    />
          })}
      <div className='input_box_container'>
      <label htmlFor="role">Role: <span className="required text-red-800">*</span></label>
            <select id="role" className="input_box require " value={role}  onChange={(e)=>{console.log(e.target.value,"value");  setRole(e.target.value)}}>
              <option disabled selected className="text-slate-500">-----select a option-----</option>
              <option value="Admin">Admin</option>
              <option value="User">User</option>
            </select>
      </div>
      <div className="w-full flex"><button className="m-auto submit-btn btn text-black" onClick={(e)=>{
        e.preventDefault();
        createUser();
      }}>Submit</button></div>
    </div>
   </div>
  )
}

export default Signup
