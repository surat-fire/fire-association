"use client";

import { IUser } from "@/models/User";
import Image from "next/image";
import { useState } from "react";

const TeamMemberCard = ({ member, key }: { member: IUser; key: string }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      key={key}
      className="w-full sm:h-[430px] h-[320px] overflow-hidden sm:rounded-[20px] rounded-2xl relative [&:hover_.img-overlay]:opacity-100 [&:hover_.image-content]:translate-y-0"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ aspectRatio: "3/4" }}
    >
      <Image
        src={member.imageFile}
        alt={member.name}
        width={400}
        height={400}
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
  );
};

export default TeamMemberCard;
