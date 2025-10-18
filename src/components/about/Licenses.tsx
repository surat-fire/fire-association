import React from "react";
import SectionTitle from "../common/SectionTitle";
import Image from "next/image";

const Licenses = () => {
  const licenseImages = [
    { src: "/img/certifications-img-1.webp", alt: "Licenses img 1" },
    { src: "/img/certifications-img-2.webp", alt: "Licenses img 2" },
  ];

  return (
    <>
      <section className="relative w-full sm:py-14 py-10">
        <div className="ct-container">
          <SectionTitle
            subtitle="Certifications & Licenses"
            title="Certified Commitment To Safety Standards"
            align="center"
            titleClass="max-w-[440px] w-full mx-auto"
          />
          <div className="w-full grid md:grid-cols-2 gap-6 mt-10">
            {licenseImages.map((img, index) => (
              <div key={index} className="w-full">
                <Image
                  src={img.src}
                  width={600}
                  height={500}
                  alt={img.alt}
                  className="object-cover w-full h-full"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Licenses;
