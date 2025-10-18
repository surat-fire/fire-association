import React from "react";
import WhyJoinSection, { WhyJoinCard } from "@/components/common/WhyJoin";
import Image from "next/image";

const WhyJoinPage = () => {
  const cards: WhyJoinCard[] = [
    {
      icon: (
        <Image
          src="/img/training-discounts.webp"
          width={100}
          height={100}
          className="object-contain sm:w-[100px] sm:h-[100px] w-16 h-16"
          alt="Training Discounts"
        />
      ),
      title: "Training Discounts",
      description: "Reduced fees for members on workshops and certifications.",
    },
    {
      icon: (
        <Image
          src="/img/network-access.webp"
          width={100}
          height={100}
          className="object-contain sm:w-[100px] sm:h-[100px] w-16 h-16"
          alt="Network Access"
        />
      ),
      title: "Network Access",
      description: "Connect with departments, experts and safety leaders.",
    },
    {
      icon: (
        <Image
          src="/img/priority-updates.webp"
          width={100}
          height={100}
          className="object-contain sm:w-[100px] sm:h-[100px] w-16 h-16"
          alt="Priority Updates"
        />
      ),
      title: "Priority Updates",
      description: "Receive timely alerts and supply advisories.",
    },
  ];

  return (
    <>
      <WhyJoinSection
        subtitle="Why Join Us"
        title="Build Connections That Matter"
        cards={cards}
      />
    </>
  );
};

export default WhyJoinPage;
