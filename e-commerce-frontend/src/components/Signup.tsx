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
    <div className="flex min-h-screen min-w-full justify-center items-center bg-gradient-to-r from-gray-200 to-blue-200">
      <div className="relative w-[900px] h-[580px] bg-white rounded-3xl shadow-lg overflow-hidden">
        <div className="absolute top-0 right-0 w-[55%] h-full bg-white flex flex-col items-center text-gray-800 text-center z-10 p-10">
          <h1 className="text-4xl mb-4">Sign up</h1>
          <form className="w-full">
            <div className="w-full">
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
                className="w-full h-[48px] bg-blue-400 rounded-lg shadow-md text-white font-semibold text-lg mt-4 cursor-pointer"
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
        <div className="absolute top-0 left-0 w-full h-full z-0 before:absolute before:w-[300%] before:left-[-250%] before:h-full before:bg-blue-400 before:rounded-full before:z-10">
          <div className="absolute w-[50%] h-full flex flex-col justify-center items-center text-white z-20 p-6">
            <h1 className="text-4xl mb-4">Welcome Back!</h1>
            <p className="mb-4">Already have an account?</p>
            <Link to="/signin">
              <button className="w-[160px] h-[46px] border-2 border-white bg-transparent text-white font-medium">
                Sign in
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;

