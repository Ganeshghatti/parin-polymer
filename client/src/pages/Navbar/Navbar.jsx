import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { saveuser, logout } from "../../features/User";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "./logo.png";
import {
  faBars,
  faCancel,
  faCartShopping,
  faClose,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Navbar.css";
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Dropdown } from "@mui/base/Dropdown";
import { Menu } from "@mui/base/Menu";
import { MenuButton as BaseMenuButton } from "@mui/base/MenuButton";
import { MenuItem as BaseMenuItem, menuItemClasses } from "@mui/base/MenuItem";
import Spinnerf from "../../Components/Spinnerf";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { useParams } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [menu, setmenu] = useState(false);
  const user = useSelector((state) => state.user.user);

  const logoutf = async () => {
    dispatch(logout());
    localStorage.clear();
    window.location.href = "/";
  };
  const navbardisplay =
    location.pathname === "/login" || location.pathname === "/signup";

  const menuf = () => {
    setmenu(!menu);
  };

  const isActiveTab = (path) => {
    const parts = path.split("/");
    const result = "/" + parts[1];
    const currentpath = location.pathname.split("/");
    const currentpathresult = "/" + currentpath[1];
    return currentpathresult === result;
  };

  return navbardisplay ? (
    ""
  ) : (
    <nav
      id="navbar"
      className="absolute w-screen flex flex-col justify-center md:gap-0 items-center pt-20 pb-12 z-50 md:justify-between md:overflow-x-hidden md:px-8 left-0 top-0 gap-2"
    >
      {menu ? (
        <div className="hidden md:block">
          <div
            className="fixed w-screen h-screen top-0 left-0 z-30"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.353)" }}
            onClick={menuf}
          ></div>
          <div
            className="flex flex-col w-3/4 h-screen fixed right-0 top-0 justify-center items-center z-50 gap-8 bg-white navbar-mobile-menu"
            style={{ backgroundColor: "white" }}
          >
            <ul className="list-none flex flex-col gap-10 items-center justify-center">
              <li onClick={menuf}>
                <Link
                  to="/"
                  className={`${
                    isActiveTab("/") ? "text-blue" : "text-black2"
                  } hover:text-blue`}
                >
                  Home
                </Link>
              </li>
              <li onClick={menuf}>
                <Link
                  to="/#category"
                  className={`${
                    isActiveTab("/") ? "text-black2" : "text-blue"
                  } hover:text-blue`}
                >
                  Categories
                </Link>
              </li>{" "}
              <li onClick={menuf}>
                <Link to="/#contact" className="text-black2 hover:text-blue">
                  Contact
                </Link>
              </li>
            </ul>

            {!user.token ? (
              <div className="md:flex flex-col gap-8 hidden items-center mt-10">
                <Link to="/signup">
                  <button className="button-outlined">Signup</button>
                </Link>

                <Link to="/login">
                  <button className="button-filled">Login</button>
                </Link>
              </div>
            ) : (
              <div className="md:flex flex-col gap-12 hidden items-center mt-10">
                <div className="flex flex-col items-center" onClick={menuf}>
                  <Link
                    to="/account"
                    className="hover:text-blue text-black2 flex flex-col items-center"
                  >
                    <AccountCircleIcon />
                    <p>My Account</p>
                  </Link>
                </div>
                <button className="button-outlined" onClick={logoutf}>
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        ""
      )}
      <div className="w-full flex justify-center gap-8 md:gap-0 md:justify-around items-center pb-2 mt-16">
        <Link to="/">
          <img src={logo} alt="logo" className="w-40 md:w-24" />
        </Link>
        <TextField
          variant="outlined"
          size="small"
          placeholder="Search"
          className="w-1/3"
          style={{ color: "black" }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            ),
            sx: {
              borderRadius: 25,
            },
          }}
        />
        {!user.token ? (
          <div className="flex gap-8 md:hidden items-center">
            <Link to="/signup">
              <button className="button-outlined px-10 py-2 text-lg md:text-base">
                Signup
              </button>
            </Link>

            <Link to="/login" className="md:hidden">
              <button className="button-filled px-10 py-2 text-lg md:text-base">
                Login
              </button>
            </Link>
          </div>
        ) : (
          <div className="flex gap-12 md:hidden items-center">
            <div className="flex flex-col items-center">
              <Link
                to="/account"
                className="hover:text-black text-black flex flex-col items-center"
              >
                <PermIdentityOutlinedIcon />
              </Link>
            </div>
            <button className="button-outlined" onClick={logoutf}>
              Logout
            </button>
          </div>
        )}
      </div>
      <div className="bg-darkblue w-full flex justify-around items-center py-3">
        <ul
          className="flex items-center list-none md:hidden text-white text-base"
          style={{ gap: "2.5vw" }}
        >
          <li>
            <Link to="/">HOME</Link>
          </li>
          <li>
            <Link to="/#about">ABOUT US</Link>
          </li>
          <li>
            <Link to="/#contact">SHOP</Link>
          </li>{" "}
          <li>
            <Link to="/#contact">BULK INQUIRY</Link>
          </li>{" "}
          <li>
            <Link to="/#contact">CONTACT</Link>
          </li>
        </ul>
        <p className="text-white flex cursor-pointer">
          <LocationOnIcon style={{ color: "white" }} />
          Lorem ipsum dolor sit amet
        </p>
      </div>

      <div className="hidden md:flex md:items-center">
        {menu ? (
          <FontAwesomeIcon
            icon={faClose}
            onClick={menuf}
            className="cursor-pointer text-2xl cancel-icon fixed top-10 right-6 z-50"
          />
        ) : (
          <FontAwesomeIcon
            icon={faBars}
            onClick={menuf}
            className="cursor-pointer text-2xl"
          />
        )}
      </div>
    </nav>
  );
}
