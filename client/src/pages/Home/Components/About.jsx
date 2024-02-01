import React from "react";

export default function About() {
  return (
    <section
      id="about"
      className="flex flex-col items-center justify-center gap-6 bg-pink py-16"
    >
      <h2 className="uppercase text-6xl md:text-5xl text-white font-medium text-center">
        About Us
      </h2>
      <p className="text-2xl md:text-xl text-center text-white w-2/3 md:w-11/12">
        Established in 2019, PARIN POLYMERS is an ISO certfied manufacturer of a
        wide range of packaging material in India. We offer a diverse range of
        customized products, including popular Tamper Proof Bags, Courier Bags,
        Packaging Envelopes, LDPE Reclosable Bags, Garment Bags, Pod Courier
        Bags, and many more.
      </p>
    </section>
  );
}
