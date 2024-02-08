import React, { useEffect } from "react";
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
import AdminDashboard from "./pages/Admin/Dashboard/Dashboard";
import AdminProducts from "./pages/Admin/Products/Products";
import AdminProtectedRoute from "./Components/ProtectedRoute";
import { useDispatch } from "react-redux";
import { saveuser } from "./features/User";
import AdminSales from "./pages/Admin/Sales/Sales";
import AdminForm from "./pages/Admin/Form/AdminForm";
import Account from "./pages/Account/Account";
import { saveuserDetails } from "./features/UserDetails";
import FetchUserDetails from "./routes/FetchUserDetails";
import { FetchProductDetails } from "./routes/FetchProductDetails";
import Products from "./pages/Products/Products";
import { allproducts } from "./features/Products";

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const storedUserDataJSON = localStorage.getItem("user");
    if (storedUserDataJSON) {
      const storedUserData = JSON.parse(storedUserDataJSON);
      dispatch(
        saveuser({
          email: storedUserData.email,
          token: storedUserData.token,
          username: storedUserData.username,
          isAdmin: storedUserData.isAdmin,
        })
      );
    }
  }, []);

  useEffect(() => {
    const storedUserDataJSON = localStorage.getItem("userDetails");
    if (storedUserDataJSON) {
      const storedUserData = JSON.parse(storedUserDataJSON);
      dispatch(
        saveuserDetails({
          email: storedUserData.email,
          token: storedUserData.token,
          username: storedUserData.username,
          phone: storedUserData.phone,
          primary_address: storedUserData.primary_address,
          secondary_address: storedUserData.secondary_address,
          pincode: storedUserData.pincode,
        })
      );
    }
  }, []);

  useEffect(() => {
    const storedUserDataJSON = localStorage.getItem("products");
    if (storedUserDataJSON) {
      const storedUserData = JSON.parse(storedUserDataJSON);
      dispatch(allproducts(storedUserData));
    }
  }, []);

  FetchUserDetails();
  FetchProductDetails();

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/account" element={<Account />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:productId" element={<ProductPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/return&refund" element={<ReturnAndRefund />} />
        <Route path="/shipping-policy" element={<ShippingPolicy />} />
        <Route path="*" element={<PageNotFound />} />

        {/* Admin Routes */}
        <Route
          path="/admin/dashboard"
          element={
            <AdminProtectedRoute>
              <AdminDashboard />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/admin/products"
          element={
            <AdminProtectedRoute>
              <AdminProducts />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/admin/sales"
          element={
            <AdminProtectedRoute>
              <AdminSales />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/admin/form"
          element={
            <AdminProtectedRoute>
              <AdminForm />
            </AdminProtectedRoute>
          }
        />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
