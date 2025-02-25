import { ReactNode, useState, useEffect } from "react";
import Navbar from "../subComponents.tsx/Navbar";
import lightTheme from "../assets/theme.png";
import darkTheme from "../assets/darkTheme.png";

function Container({ children }: { children: ReactNode }) {
  const savedTheme = localStorage.getItem("theme") === "dark";
  const [toggleTheme, setToggleTheme] = useState(savedTheme);

  // Update localStorage whenever the theme changes
  useEffect(() => {
    localStorage.setItem("theme", toggleTheme ? "dark" : "light");
  }, [toggleTheme]);

  return (
    <div
      className={` ${
        toggleTheme && "dark"
      } min-h-screen  w-screen flex overflow-x-hidden flex-col bg_color dark:bg-gray-500 from-gray-300 via-blue-100 to-gray-200`}
    >
      <Navbar />
      <div
        className="fixed z-20 top-5 right-10 lg:inline-block hidden "
        onClick={() => {
          setToggleTheme(!toggleTheme);
        }}
      >
        {toggleTheme ? (
          <img src={darkTheme} className="w-10 h-10" />
        ) : (
          <img src={lightTheme} className="w-10 h-10" />
        )}
      </div>
      <div className="pt-20 overflow-x-hidden dark:bg-gray-600 dark:text-white min-h-screen">
        {children}
      </div>
    </div>
  );
}

export default Container;
