import React from "react";
import { FaSun, FaMoon } from "react-icons/fa";
import { toggleTheme } from "../slices/themeSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { Link } from "react-router-dom";

const NavBar: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const theme = useSelector((state: RootState) => state.theme.theme);

  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };

  React.useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <nav
      className={`bg-base-100 shadow-lg sticky top-0 z-50 ${
        theme === "dark" ? "navbar bg-base-300" : "navbar bg-base-200"
      }`}
    >
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        {/* Brand Logo */}
        <div className="text-2xl font-bold dark:text-white text-primary">
          <Link to="/">Ven Zone</Link>
        </div>

        {/* Toggle button for mobile view */}
        <div className="block md:hidden">
          <button
            className="text-primary dark:text-white focus:outline-none"
            onClick={() => {
              document
                .getElementById("mobile-menu")
                ?.classList.toggle("hidden");
            }}
          >
            &#9776;
          </button>
        </div>

        {/* Menu items */}
        <div className="hidden md:flex flex-1 justify-end items-center">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link
                to="create-product"
                className="bg-black mx-1 text-white p-2 rounded-md"
              >
                Create Product
              </Link>
            </li>
            <li>
              <Link
                to="edit-product"
                className="bg-black mx-1 text-white p-2 rounded-md"
              >
                Edit Product
              </Link>
            </li>
          </ul>

          {/* Theme toggle button */}
          <button
            className={`btn btn-outline ml-4 ${
              theme === "dark" ? "bg-slate-50 text-black" : "btn-primary"
            }`}
            onClick={handleToggleTheme}
            title={`Switch to ${theme === "light" ? "dark" : "light"}`}
          >
            {theme === "light" ? <FaMoon /> : <FaSun />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className=" hidden  sm:hidden   flex-col items-center justify-center"
      >
        <ul className="menu bg-base-200 rounded-box  w-40">
          <li className="py-1">
            {" "}
            <Link to="create-product" className="text-primary dark:text-white">
              Create Product
            </Link>
          </li>
          <li className="py-1">
            <Link to="edit-product" className="text-primary dark:text-white">
              Edit Product
            </Link>
          </li>
          <li className="py-1">
            {" "}
            {/* Theme toggle button for mobile */}
            <button
              className={`btn btn-outline mt-4 ${
                theme === "dark" ? "bg-slate-50 text-black" : "btn-primary"
              }`}
              onClick={handleToggleTheme}
              title={`Switch to ${theme === "light" ? "dark" : "light"}`}
            >
              {theme === "light" ? <FaMoon /> : <FaSun />}
            </button>{" "}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
