"use client";

import { Hero } from "@/components/hero";
import { Navbar } from "@/components/navbar";
import { SecretSanta } from "@/components/secret-santa";

export default function Home() {
  return (
    <>
      <div className="w-screen min-h-screen fixed z-0 flex justify-center px-6 py-40 pointer-events-none">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-25" />
        <img
          src="/mesh.svg"
          alt="Mesh"
          className="opacity-20 absolute top-0 h-[600px] z-10"
        />
        <div className="bg-radial from-transparent via-transparent to-white absolute inset-0 z-20" />
      </div>

      <main className="relative z-20">
        <Navbar />
        <Hero />
        <SecretSanta />
      </main>
    </>
  );
}
