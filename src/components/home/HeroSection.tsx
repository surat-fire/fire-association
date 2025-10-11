// components/HeroSection.js
import Image from "next/image";
import React from "react";

const HeroSection = () => {
  return (
    <div className="relative w-full h-screen m-2 border rounded-md">
      <div className="absolute inset-0">
        <Image 
          src="/img/hero-image.png" 
          fill
          alt="hero-image" 
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/20"></div>
      </div>
    </div>
  );
};

export default HeroSection;