
import Image from "next/image";
import React from "react";

const HeroSection = () => {
  return (
    <div className="relative w-full pt-5 sm:pb-16 pb-10">
      <div className="ct-container">
        <div className="w-full rounded-[20px] sm:h-screen overflow-hidden">
          <Image
            src="/img/hero-bg.webp"
            width={1920}
            height={1080}
            alt="hero-image"
            className="object-cover w-full h-full "
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
