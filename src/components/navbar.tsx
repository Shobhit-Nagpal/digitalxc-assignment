import React from "react";
import { Button } from "./ui/button";
import { Github } from "lucide-react";
import { Repository } from "@/consts";
import { useRouter } from "next/navigation";

export function Navbar() {
  const router = useRouter();
  return (
    <nav className="w-full flex items-center justify-between mx-auto px-6 py-3 shadow-lg">
      <div>
        <p className="font-bold text-lg">DigitalXC</p>
      </div>
      <div>
        <Button
          onClick={() => router.push(Repository.Link)}
          className="bg-[#16B0E1] font-semibold"
        >
          <Github className="h-6 w-6 mr-1" />
          Repo
        </Button>
      </div>
    </nav>
  );
}
