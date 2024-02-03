import React from "react";
import "./Home.scss";
import Hero from "./Components/Hero";
import About from "./Components/About";
import HomeBest from "./Components/HomeBest";
import HomePackaging from "./Components/HomePackaging";
import Inquiry from "./Components/Inquiry";
import HomePackagingExcellence from "./Components/HomePackagingExcellence";

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      <Hero />
      <About />
      <HomeBest />
      <div className="my-20 text-center text-5xl font-bold">Products here</div>
      <HomePackaging />
      <Inquiry />
      <HomePackagingExcellence />
    </div>
  );
}
