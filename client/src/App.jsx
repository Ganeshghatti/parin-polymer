import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.scss";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Home from "./pages/Home/Home";
import PrivacyPolicy from "./Components/PrivacyPolicy";
import PageNotFound from "./Components/PageNotFound";
import Navbar from "./pages/Navbar/Navbar";
import Footer from "./pages/Footer/Footer";
import ProductPage from "./pages/ProductPage/ProductPage";
import ReturnAndRefund from "./Components/ReturnAndRefund";
import ShippingPolicy from "./Components/ShippingPolicy";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />{" "}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/products:productId" element={<ProductPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/return&refund" element={<ReturnAndRefund />} />
        <Route path="/shipping-policy" element={<ShippingPolicy />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
