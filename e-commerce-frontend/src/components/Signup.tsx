import "../styles/signup.css";
import Input from "../subComponents.tsx/Input";
import { useEffect, useState } from "react";
import {makeUnAuthorizedGetRequest,makeUnAuthorizedPostRequest,} from "../services/unAuthorizedRequest";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { validateInput } from "../utils/validations/validateInputs";

function Signup() {
  const [full_name, setFull_name] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [contact, setContact] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [fullNameError, setFullNameError] = useState<string>("");
  const [emailError, setEmail_Error] = useState<string>("");
  const [contactError, setContactError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const navigate=useNavigate();

  const inputField = [
    {
      id: "full_name",
      field: "Full name",
      type: "text",
      value: full_name,
      setValue: setFull_name,
      error: fullNameError,
      setError: setFullNameError,
    },
    {
      id: "email",
      field: "Email",
      type: "text",
      value: email,
      setValue: setEmail,
      error:emailError,
      setError: setEmail_Error,
    },
    {
      id: "contact",
      field: "Contact",
      type: "text",
      value: contact,
      setValue: setContact,
      error: contactError,
      setError: setContactError,
    },
    {
      id: "password",
      field: "Password",
      type: "password",
      value: password,
      setValue: setPassword,
      error: passwordError,
      setError: setPasswordError,
    },
  ];

  const createUser = async () => {
    const resposne = await makeUnAuthorizedPostRequest("/auth/signup", {
      name: full_name,
      email: email,
      contactNo: contact,
      password: password,
    });
    console.log(resposne);
    Cookies.set('token', resposne?.data, { expires: 7, secure: true });
    console.log(Cookies.get('token'),"Is token exist");
    if(Cookies.get('token') && !(Cookies.get('token')===undefined)){
      navigate("/")
    }
  };

  const getData = async () => {
    const resposnse = await makeUnAuthorizedGetRequest("/products");
    console.log(resposnse);

  };

  const checkError = (): boolean => {
    let isValid = true;

    // Validate each field using the validateInput function
    isValid = validateInput("full_name", full_name, setFullNameError) && isValid;
    isValid = validateInput("email", email, setEmail_Error) && isValid;
    isValid = validateInput("contact", contact, setContactError) && isValid;
    isValid = validateInput("password", password, setPasswordError) && isValid;

    console.log("Validation result:", isValid);
    return isValid;
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
             <button
                className="btn"
                onClick={(e) => {
                  e.preventDefault();
                  if (checkError()) {
                    createUser();
                  }
                }}
              >
               Sign up
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
