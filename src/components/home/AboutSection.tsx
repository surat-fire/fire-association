import React from "react";
import Image from "next/image";
import SectionTitle from "../common/SectionTitle";

type AboutCard = {
  type?: "image"; // If type is "image", it will render differently
  label?: string;
  title?: string;
  paragraphs?: string[];
  tags?: string[];
  image?: string;
  alt?: string;
};

const AboutSection: React.FC = () => {
  const aboutCards: AboutCard[] = [
    {
      label: "OUR MISSION",
      title: "Building a Safer Surat Together",
      paragraphs: [
        "We’re dedicated to strengthening Surat’s fire safety culture through awareness, education, and collaboration.",
        "Our mission is to empower every citizen and organization to act with confidence during emergencies.",
      ],
      tags: ["FireSafety", "CommunityAwareness"],
    },
    {
      type: "image",
      image: "/img/event-img.webp",
      alt: "Firefighter in action",
    },
    {
      label: "OUR VISION",
      title: "Creating a Fire-Ready Future",
      paragraphs: [
        "By uniting industries, authorities, and people, we aim to build a future where fire risks are minimized, and safety becomes a shared responsibility.",
        "Together, we can make Surat a model city for fire prevention.",
      ],
      tags: ["SafetyFirst", "SuratStrong"],
    },
  ];

  return (
    <section className="w-full relative">
      <div className="ct-container">
        <SectionTitle
          subtitle="About Us"
          title="Empowering Global Trade Through Trust and Innovation"
          align="center"
          titleClass="max-w-[440px] w-full mx-auto"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:mt-[30px] mt-5">
          {aboutCards.map((item, index) =>
            item.type === "image" ? (
              <div
                key={index}
                className="relative h-full rounded-xl overflow-hidden min-h-[400px] [&:hover_img]:scale-[1.05]"
              >
                <Image
                  src={item.image ?? ""}
                  alt={item.alt ?? "About image"}
                  fill
                  className="object-cover h-full w-full transition-all duration-300"
                />
              </div>
            ) : (
              <div
                key={index}
                className="bg-[rgba(221,40,40,0.08)] transition-all duration-300 rounded-xl sm:p-6 p-5 text-[var(--primary)] hover:text-white hover:bg-[var(--primary)] [&:hover_.text-white-hover]:!text-white [&:hover_.bg-white-hover]:!bg-white lg:last:col-span-1 md:last:col-span-2 col-span-1"
              >
                <div className="mb-2.5">
                  <p className="text-[10px] leading-4 mb-2.5 uppercase mt-0 font-normal">
                    {item.label}
                  </p>
                  <div className="sm:mb-[150px] mb-10">
                    <SectionTitle
                      title={item.title ?? ""}
                      align="left"
                      titleClass="max-w-[260px] w-full p-0 m-0 text-white-hover transition-all duration-300"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-6">
                  {item.paragraphs?.map((para, pIndex) => (
                    <p
                      key={pIndex}
                      className="text-[13px] leading-5 m-0 mt-0 font-semibold"
                    >
                      {para}
                    </p>
                  ))}
                </div>

                <div className="flex flex-wrap gap-3 sm:mt-6 mt-5">
                  {item.tags?.map((tag, tIndex) => (
                    <span
                      key={tIndex}
                      className="bg-[rgba(221,40,40,0.08)] backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2 bg-white-hover text-[var(--primary)]"
                    >
                      <span className="w-1.5 h-1.5 bg-[var(--primary)] rounded-full inline-block"></span>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
