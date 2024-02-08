import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Products() {
  const products = useSelector((state) => state.products.products.slice(0, 8));
  console.log(products);
  return (
    products.length > 0 && (
      <section className="w-full flex flex-col gap-12 pb-16">
        <div className="bg-darkblue text-white text-5xl md:text-3xl uppercase py-12 w-full text-center">
          BEST SELLING PRODUCTS
        </div>
        <p className="text-black text-4xl md:text-2xl text-center font-medium">
          Quality Products, Quality life
        </p>
        <div className="flex justify-around items-center md:flex-col w-full flex-wrap gap-y-6">
          {products.map((product, index) => (
            <div
              className="flex flex-col gap-2 custom-width-22 md:w-full items-center"
              key={index}
            >
              {" "}
              <Link to={`products/${product.productId}`}>
                <img
                  src="./assets/Home/imgplaceholder.png"
                  className="w-full"
                />
                <div className="flex justify-between w-11/12 text-xl">
                  <p>{product.dimension}</p> |
                </div>
                <p className="text-base md:text-sm font-medium w-11/12 text-left">
                  <span className="text-darkblue text-2xl md:text-xl">
                    Rs {product.amountInINR}.00
                  </span>
                  (Inclusive of all Taxes)
                </p>{" "}
              </Link>
            </div>
          ))}
        </div>
        <Link to="/products">
          <div className="w-full text-center text-xl md:text-lg text-darkblue font-semibold">
            View All Products
          </div>
        </Link>
      </section>
    )
  );
}
