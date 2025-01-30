import { ArrowDown } from "lucide-react";
import React from "react";

export function Hero() {
  return (
    <section className="text-center mt-12 md:mt-32 px-6">
      <h1 className="text-4xl font-extrabold leading-[1.15] sm:text-6xl">
        Secret Santa Generator
      </h1>
      <p className="mt-5 text-gray-600 sm:text-xl">
        Automate secret santa matchmaking,{" "}
        <span className="text-[#01BB84]">in seconds.</span>
      </p>
      <p className="flex items-center justify-center gap-x-2 text-pink font-semibold my-6 text-sm px-16">
        <ArrowDown className="text-[#16B0E1] opacity-40" />
        Explore below
        <ArrowDown className="text-[#16B0E1] opacity-40" />
      </p>
    </section>
  );
}
