import "../styles/signup.css";
import Input from "../subComponents.tsx/Input";
import {  useState } from "react";
import Cookies from 'js-cookie';
import {makeUnAuthorizedPostRequest,} from "../services/unAuthorizedRequest";
import { useNavigate ,Link} from "react-router-dom";
import { validateInput } from "../utils/validations/validateInputs";

function Signin() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [password_error, setPasswordError] = useState<string>("");
  const navigate =useNavigate();


  const inputField = [
    {
      id: "email",
      field: "Email",
      type: "text",
      value: email,
      setValue: setEmail,
      error: emailError,
      setError: setEmailError,
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
        email:email,
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
    isValid = validateInput("email", email, setEmailError) && isValid;
    isValid = validateInput("password", password, setPasswordError) && isValid;

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

