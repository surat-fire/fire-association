// components/LogoSlider.js
import React from "react";
import Image from "next/image";

const LogoSlider = () => {
  // Original slide data
  const slides = [
    {
      id: 1,
      image: "/img/lenovo.webp",
      name: "lenovo",
    },
    {
      id: 2,
      image: "/img/paupal.webp",
      name: "paupal",
    },
    {
      id: 3,
      image: "/img/shopify.webp",
      name: "shopify",
    },
    {
      id: 4,
      image: "/img/spotify.webp",
      name: "spotify",
    },
    {
      id: 5,
      image: "/img/amazon.webp",
      name: "amazon",
    },
    {
      id: 6,
      image: "/img/google.webp",
      name: "google",
    },
  ];

  const extendedSlides = [...slides, ...slides, ...slides];

  return (
    <section className="w-full relative sm:py-14 py-10">
      <div className="marquee-container overflow-hidden">
        <div className="marquee-wrapper overflow-hidden w-full relative">
          <div className="marquee-track flex items-start w-fit md:gap-20 sm:gap-10 gap-8 track-right-to-left">
            {extendedSlides.map((slide, index) => (
              <div key={`${slide.id}-${index}`} className="marquee-slide">
                <div className="">
                  <div className="w-[120px] h-10 opacity-70 hover:opacity-100 transition-all duration-300">
                    <Image
                      alt={slide.name}
                      src={slide.image}
                      width={120}
                      height={40}
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LogoSlider;
