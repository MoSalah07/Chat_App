"use client";
import React from "react";
import ModeToggle from "@/components/header/ModeToggle";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

function Navbar() {
  const { push } = useRouter();
  return (
    <header className="container mx-auto p-4 h-[10vh] flex flex-col justify-center dark:bg-gray-900 bg-gray-300 dark:text-white">
      <nav className="flex justify-between items-center">
        <div>Chat App</div>
        <div>
          <button
            type="submit"
            onClick={() => {
              signOut();
              // push("/");
            }}
          >
            signOut
          </button>
          <ModeToggle />
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
