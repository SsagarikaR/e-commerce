import "../styles/signup.css";
import Input from "../subComponents.tsx/Input";
import {  useState } from "react";
import Cookies from 'js-cookie';
import {makeUnAuthorizedPostRequest,} from "../services/unAuthorizedRequest";
import { useNavigate ,Link} from "react-router-dom";
import { validations } from "../utils/validationRules";


function Signin() {
  const [full_name, setFull_name] = useState<string>("");
  const [contact, setContact] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [full_name_error, setFullNameError] = useState<string>("");
  const [contact_error, setContactError] = useState<string>("");
  const [password_error, setPasswordError] = useState<string>("");
  const navigate =useNavigate();


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

  const loginUser = async () => {
      const resposne = await makeUnAuthorizedPostRequest("/auth/login", {
        name: full_name,
        contactNo: contact,
        password: password,
      });
   
      if(resposne && resposne.data){
        console.log(resposne,"signed in");
      Cookies.set('token', resposne?.data.token, { expires: 7, secure: true });
      console.log(resposne);
        navigate("/")
      }
      
  };


  const checkError = (): boolean => {
    let isValid = true;
  
    for (const key in validations["full_name"]) {
      if (validations["full_name"][key].logic(full_name)) {
        setFullNameError(validations["full_name"][key].message);
        console.log("Full name error:", validations["full_name"][key].message);
        isValid = false;
        break;
      } else {
        setFullNameError("");
      }
    }
  
    for (const key in validations["contact"]) {
      if (validations["contact"][key].logic(contact)) {
        setContactError(validations["contact"][key].message);
        console.log("Contact error:", validations["contact"][key].message);
        isValid = false;
        break;
      } else {
        setContactError("");
      }
    }
  
    for (const key in validations["password"]) {
      if (validations["password"][key].logic(password)) {
        setPasswordError(validations["password"][key].message);
        console.log("Password error:", validations["password"][key].message);
        isValid = false;
        break;
      } else {
        setPasswordError("");
      }
    }
  
    console.log("Validation result:", isValid);
    return isValid;
  };
  
  return (
    <div className="signup">
      <div className="signup-container  ">
        <div className="form-box login">
          <form>
            <div className="header">
              <h1>Sign in</h1>
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
                    loginUser();
                  }
                }}
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
        <div className="toggle_box">
          <div className="toggle_panel toggle_left">
            <h1>Hello, welcome!</h1>
            <p>Don't have an account?</p>
            <button className="btn signin_btn"><Link to="/signup">Sign up</Link></button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signin;

