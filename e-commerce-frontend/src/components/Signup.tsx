// import React from 'react'
// import { Link } from "react-router-dom";
import "../styles/signup.css";
import Input from "../subComponents.tsx/Input";
import { useEffect, useState } from "react";
import {makeUnAuthorizedGetRequest,makeUnAuthorizedPostRequest,} from "../services/unAuthorizedRequest";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

function Signup() {
  const [full_name, setFull_name] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [contact, setContact] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [full_name_error, setFullNameError] = useState<string>("");
  const [email_error, setEmail_Error] = useState<string>("");
  const [contact_error, setContactError] = useState<string>("");
  const [password_error, setPasswordError] = useState<string>("");
  const navigate=useNavigate();

  const inputField = [
    {
      id: "full_name",
      field: "Full name",
      type: "text",
      value: full_name,
      setValue: setFull_name,
      error: full_name_error,
      setError: setFullNameError,
    },
    {
      id: "email",
      field: "Email",
      type: "text",
      value: email,
      setValue: setEmail,
      error: email_error,
      setError: setEmail_Error,
    },
    {
      id: "contact",
      field: "Contact",
      type: "text",
      value: contact,
      setValue: setContact,
      error: contact_error,
      setError: setContactError,
    },
    {
      id: "password",
      field: "Password",
      type: "password",
      value: password,
      setValue: setPassword,
      error: password_error,
      setError: setPasswordError,
    },
  ];

  const createUser = async () => {
    const resposne = await makeUnAuthorizedPostRequest("/auth/signup", {
      name: full_name,
      email: email,
      contactNo: contact,
      role: role,
      password: password,
    });
    console.log(resposne);
    Cookies.set('token', resposne?.data, { expires: 7, secure: true });
    if(Cookies.get('token') && Cookies.get('token')!==undefined){
      navigate("/categories")
    }
  };

  const getData = async () => {
    const resposnse = await makeUnAuthorizedGetRequest("/products");
    console.log(resposnse);

  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="signup">
      <div className="signup-container  ">
        <div className="form-box login">
          <form>
            <div className="header">
              <h1>Sign up</h1>
            </div>
            <div className="input_container ">
              {inputField.map((input) => {
                return (
                  <Input
                    key={input.id}
                    field={input.field}
                    id={input.id}
                    type={input.type}
                    value={input.value}
                    setValue={input.setValue}
                    error={input.error}
                    setError={input.setError}
                  />
                );
              })}
              <div className="input_box_container">
                <select
                  id="role"
                  className="input_box require"
                  value={role || ""}
                  onChange={(e) => {
                    console.log(e.target.value, "value");
                    setRole(e.target.value);
                  }}
                >
                  <option disabled value="">
                    ----- Select a user role -----
                  </option>{" "}
                  <option value="Admin">Administrator</option>
                  <option value="User">Standard User</option>
                </select>
              </div>
             <button
                className="btn"
                onClick={(e) => {
                  e.preventDefault();
                  createUser();
                }}
              >
                <Link to="/categories">Sign up</Link>
              </button>
            </div>
          </form>
        </div>
        <div className="toggle_box">
          <div className="toggle_panel toggle_left">
            <h1>Welcome Back!</h1>
            <p>Already have an account?</p>
            <Link to="/signin"><button className="btn signin_btn">Sign in</button></Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
