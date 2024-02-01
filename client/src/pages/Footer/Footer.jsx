import React, { useEffect } from "react";
import PhoneIcon from "@mui/icons-material/Phone";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MailIcon from "@mui/icons-material/Mail";
import ArrowRightOutlinedIcon from "@mui/icons-material/ArrowRightOutlined";
import logo from "./logo.png";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import LocationOnIcon from "@mui/icons-material/LocationOn";

export default function Footer() {
  const footerdisplay =
    location.pathname === "/login" || location.pathname === "/signup";
    
  const products = useSelector((state) => state.products.products);

  useEffect(() => {
    if (location.hash) {
      const targetSection = document.querySelector(location.hash);
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  return footerdisplay ? (
    ""
  ) : (
    <footer
      id="footer"
      className="flex md:flex-col justify-left py-12 md:gap-12 bg-[#FFE5F5] w-full"
    >
      <div className="w-1/3 flex flex-col items-center md:w-full">
        <div className="flex flex-col md:items-center justify-center gap-4 w-3/5 md:w-4/5">
          <img className="w-40" src={logo} />
          <p className="text-black font-normal text-lg md:text-base md:text-center ">
            Suppliers Of Unparalleled Packaging Materials For Businesses,
            Catering To Multiple Industries Across The Globe!
          </p>
        </div>
      </div>
      <ul className="text-black flex flex-col custom-width-15 gap-2.5 font-normal md:w-full md:items-center">
        <p className="text-2xl md:text-xl font-medium text-[#F01089] my-4 uppercase">
          Company
        </p>
        <li className="md:text-center">
          <Link to="/#about">About Us</Link>
        </li>
        <li className="md:text-center">
          <Link to="/#contact">Contact us</Link>
        </li>{" "}
        <li className="md:text-center">
          <Link to="/account">Track Your Order</Link>
        </li>
        <li className="md:text-center">
          <Link to="/#">FAQ</Link>
        </li>
      </ul>
      <ul className="text-black flex flex-col custom-width-15 gap-2.5 font-normal md:w-full md:items-center">
        <p className="text-2xl md:text-xl font-medium text-[#F01089] my-4 uppercase">
          Categories
        </p>
        <li className="md:text-center">
          <a href="">Flipkart</a>
        </li>
        <li className="md:text-center">
          <a href="">Meesho</a>
        </li>{" "}
        <li className="md:text-center">
          <a href="">Snapdeal</a>
        </li>
        <li className="md:text-center">
          <a href="">Labels</a>
        </li>
      </ul>{" "}
      <ul className="text-black flex flex-col custom-width-15 gap-2.5 font-normal md:w-full md:items-center">
        <p className="text-2xl md:text-xl font-medium text-[#F01089] my-4 uppercase">
          Our Policies
        </p>
        <li className="md:text-center">
          <Link to="/privacy-policy">Privacy Policy</Link>
        </li>
        <li className="md:text-center">
          <Link to="/shipping-policy">Shipping Policy</Link>
        </li>{" "}
        <li className="md:text-center">
          <Link to="/return&refund">Return & Refund</Link>
        </li>
      </ul>{" "}
      <ul className="text-black flex flex-col custom-width-15 gap-2.5 font-normal md:w-full md:items-center">
        <p className="text-2xl md:text-xl font-medium text-[#F01089] my-4 uppercase">
          Get in touch
        </p>
        <li className="md:text-center">
          <a href="tel:7414534534">
            <PhoneIcon />
            +91 7414534534
          </a>{" "}
        </li>
        <li className="md:text-center">
          <a href="">
            <LocationOnIcon />
            #234, Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            Optio, voluptas.
          </a>
        </li>{" "}
      </ul>
    </footer>
  );
}
