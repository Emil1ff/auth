import React, { useState } from "react";
import Navigation from "./Navigation";

const MenuIcon = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="relative flex h-6 w-7 items-center justify-center cursor-pointer ml-3 z-60 "
        style={{
          position: isOpen ? "fixed" : "static",
        
        }}
      >
        <span
          className={`absolute h-0.5 w-[30px] bg-white transition-all duration-300 ease-in-out 
          ${isOpen ? "rotate-45" : "-translate-y-2"}`}
        />

        <span
          className={`absolute h-0.5 w-[30px] bg-white transition-all duration-300 ease-in-out
          ${isOpen ? "opacity-0" : ""}`}
        />

        <span
          className={`absolute h-0.5 w-[30px] bg-white transition-all duration-300 ease-in-out
          ${isOpen ? "-rotate-45" : "translate-y-2"}`}
        />
      </div>

      <Navigation isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

export default MenuIcon;
