"use client"

import React from "react";
import SectionTitle from "../common/SectionTitle";
import Image from "next/image";
import useGetUsers from "@/hooks/users/useGetUsers";

const FounderProfile = () => {

  const { data: teamMembers } = useGetUsers()

  return (
    <>
      <section className="relative w-full sm:py-14 py-10">
        <div className="ct-container">
          <SectionTitle
            subtitle="Founder Profile"
            title="Meet our expert leadership & innovators"
            align="center"
            titleClass="max-w-[440px] w-full mx-auto"
          />
          <div className="w-full sm:mt-10 mt-8 grid md:grid-cols-3 gap-4">
            {teamMembers.map((member, index) => (
              <div key={index} className="w-full">
                <div className="w-full md:h-[650px] sm:h-[500px] h-[300px] overflow-hidden sm:rounded-[20px] rounded-2xl relative [&:hover_.img-overlay]:opacity-100 [&:hover_.image-content]:translate-y-0">
                  <Image
                    src={member.imageFile}
                    width={500}
                    height={600}
                    alt={member.name}
                    className="object-cover w-full h-full object-top"
                  />
                  <div
                    className="w-full h-full absolute top-0 bottom-0 left-0 z-10 img-overlay transition-all duration-300 opacity-0"
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(0, 0, 0, 0) -70.2%, #000000 100%)",
                    }}
                  ></div>
                  <div className="absolute sm:bottom-8 bottom-4 sm:left-8 left-4 w-full z-20 transition-all duration-300 image-content translate-y-[200%]">
                    <h4 className="text-base font-medium text-white mb-0.5">
                      {member.name}
                    </h4>
                    <span className="text-xs font-medium text-[rgba(209,209,209,1)]">
                      {member.role}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default FounderProfile;
