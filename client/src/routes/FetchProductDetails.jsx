import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { allproducts } from "../features/Products";
import axios from "axios";

export const FetchProductDetails = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(
          "https://parin-polymer-server.vercel.app/user/get-all-products"
        );

        localStorage.setItem("products", JSON.stringify(response.data.products));
        console.log(response.data.products)
        dispatch(allproducts(response.data.products));
      } catch (error) {
        console.log(error);
      }
    };

    fetchProductDetails();
  }, []);
};
