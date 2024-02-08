import React from "react";
import "./Home.scss";
import Hero from "./Components/Hero";
import About from "./Components/About";
import HomeBest from "./Components/HomeBest";
import HomePackaging from "./Components/HomePackaging";
import Inquiry from "./Components/Inquiry";
import HomePackagingExcellence from "./Components/HomePackagingExcellence";
import Products from "./Components/Products";

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      <Hero />
      <About />
      <HomeBest />
      <Products />
      <HomePackaging />
      <Inquiry />
      <HomePackagingExcellence />
    </div>
  );
}
