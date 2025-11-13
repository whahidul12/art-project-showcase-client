import React, { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import { motion } from "motion/react";
import logo from "../..//assets/images/logo.png";
import { ThemeContext } from "../../Context/ThemeProvider";
import "./Navbar.css";
import { AuthContext } from "../../Context/AuthProvider";
import { button } from "motion/react-client";
import { IoSunny } from "react-icons/io5";
import { LuSunMoon } from "react-icons/lu";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logOutUser } = useContext(AuthContext);
  const { isDark, setDark } = useContext(ThemeContext);

  const handleTheme = () => {
    setDark(!isDark);
  };

  const handleLogOut = () => {
    logOutUser()
      .then(() => {
        // Sign-out successful.
        // console.log("log out Successfully");
        navigate("/");
      })
      .catch((error) => {
        // An error happened.
        console.log("Log Out Error:", error);
      });
  };
  const links = (
    <>
      <li>
        <NavLink
          to={"/"}
          className="text-primary-dark dark:text-primary-light text-lg font-semibold"
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to={"/explore-artworks"}
          className="text-primary-dark dark:text-primary-light text-lg font-semibold"
        >
          ExploreArtworks
        </NavLink>
      </li>
      {user && (
        <>
          <li>
            <NavLink
              to={"/add-artwork"}
              className="text-primary-dark dark:text-primary-light text-lg font-semibold"
            >
              AddArtwork
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/my-favorites"}
              className="text-primary-dark dark:text-primary-light text-lg font-semibold"
            >
              MyFavorites
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/my-gallery"}
              className="text-primary-dark dark:text-primary-light text-lg font-semibold"
            >
              MyGallery
            </NavLink>
          </li>
        </>
      )}
    </>
  );

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="navbar bg-primary-light/50 dark:bg-primary-dark/50 sticky top-0 z-50 px-4 shadow-lg backdrop-blur-xs lg:px-8"
    >
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>
        <Link
          to={"/"}
          className="text-primary-dark dark:text-primary-light flex items-center gap-2 text-2xl font-extrabold"
        >
          <img src={logo} alt="logo" className="w-10" />
          ArtFolio
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>
      <div className="navbar-end flex gap-2">
        <button onClick={handleTheme} className="">
          {isDark ? (
            <IoSunny className="text-primary-light text-4xl hover:cursor-pointer" />
          ) : (
            <LuSunMoon className="text-primary-dark text-4xl hover:cursor-pointer" />
          )}
        </button>
        {user ? (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="ring-primary ring-offset-base-100 w-10 rounded-full ring ring-offset-2">
                <img alt={user?.displayName || "User"} src={user?.photoURL} />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-200 rounded-box z-1 mt-3 w-52 p-2 shadow-xl"
            >
              <li className="menu-title">
                <span className="text-base font-semibold">
                  {user?.name || "User"}
                </span>
              </li>
              <li>
                <button onClick={handleLogOut} className="text-error">
                  Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <>
            <Link to={"/auth/login"} className="btn">
              LogIn
            </Link>
            <Link to={"/auth/register"} className="btn hidden sm:flex">
              Register
            </Link>
          </>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;
