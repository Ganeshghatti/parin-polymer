import React from "react";

export default function Hero() {
  return (
    <section
      id="Hero"
      className="h-screen w-screen md:h-auto flex md:flex-col justify-center items-center"
    >
      <div className="custom-width-55 md:w-full flex items-center justify-center">
        <div className="w-11/12 flex items-center justify-center flex-col gap-4 mt-10">
          <h1 className="text-6xl md:text-5xl text-black font-medium">
            <span className="text-8xl md:text-6xl font-extrabold my-2">
              COURIER <span className="text-pink">BAGS</span>
            </span>
            <br />
            CUSTOM PRINTING FROM
          </h1>
          <button className="button-filled text-4xl py-4 px-14 rounded-3xl">Rs.490</button>
        </div>
      </div>
      <div className="flex custom-width-45 md:w-full items-center justify-center">
        <img src="./assets/Home/Hero.png" className="w-full" />
      </div>
    </section>
  );
}
