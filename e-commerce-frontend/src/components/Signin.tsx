import Input from "../subComponents.tsx/Input";
import { useState } from "react";
import Cookies from "js-cookie";
import { makeUnAuthorizedPostRequest } from "../services/unAuthorizedRequest";
import { useNavigate, Link } from "react-router-dom";
import { validateInput } from "../utils/validations/validateInputs";
import { SIGN_IN_BTN, SIGN_UP_BTN } from "../constants/btnConst";

function Signin() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [password_error, setPasswordError] = useState<string>("");
  const navigate = useNavigate();

  // Input field configuration for email and password
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

  // Function to login the user
  const loginUser = async () => {
    const resposne = await makeUnAuthorizedPostRequest("/auth/login", {
      email: email,
      password: password,
    });

    if (resposne && resposne.data) {
      Cookies.set("token", resposne?.data.token, { expires: 7, secure: true });
      navigate("/"); // Redirect to home on success
    }
  };

  // Function to validate inputs
  const checkError = (): boolean => {
    let isValid = true;
    isValid = validateInput("email", email, setEmailError) && isValid;
    isValid = validateInput("password", password, setPasswordError) && isValid;

    return isValid;
  };

  return (
    <div className="flex min-h-screen min-w-full justify-center items-center bg-gradient-to-r from-gray-200 to-blue-200">
      <div className="relative w-[900px] h-[580px] bg-white rounded-3xl shadow-lg overflow-hidden">
        <div className="absolute top-0 right-0 w-[55%] h-full bg-white flex flex-col items-center text-gray-800 text-center z-10 p-10">
          <h1 className="text-4xl mb-4">Sign in</h1>
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
                    loginUser(); // Proceed with login if no errors
                  }
                }}
              >
                {SIGN_IN_BTN}
              </button>
            </div>
          </form>
        </div>
        <div className="absolute top-0 left-0 w-full h-full z-0 before:absolute before:w-[300%] before:left-[-250%] before:h-full before:bg-blue-400 before:rounded-full before:z-10">
          <div className="absolute w-[50%] h-full flex flex-col justify-center items-center text-white z-20 p-6">
            <h1 className="text-4xl mb-4">Hello, welcome!</h1>
            <p className="mb-4">Don't have an account?</p>
            <Link to="/signup">
              <button className="w-[160px] h-[46px] border-2 border-white bg-transparent text-white font-medium">
                {SIGN_UP_BTN}
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signin;
