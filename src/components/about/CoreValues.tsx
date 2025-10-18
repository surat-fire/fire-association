import React from "react";
import WhyJoinSection, { WhyJoinCard } from "@/components/common/WhyJoin";
import Image from "next/image";

const CoreValues = () => {
  const cards: WhyJoinCard[] = [
    {
      icon: (
        <Image
          src="/img/awareness-first.webp"
          width={100}
          height={100}
          className="object-contain sm:w-[100px] sm:h-[100px] w-16 h-16"
          alt="Awareness First"
        />
      ),
      title: "Awareness First",
      description:
        "Spreading knowledge saves lives and strengthens community fire readiness.",
    },
    {
      icon: (
        <Image
          src="/img/prepared-action.webp"
          width={100}
          height={100}
          className="object-contain sm:w-[100px] sm:h-[100px] w-16 h-16"
          alt="Prepared Action"
        />
      ),
      title: "Prepared Action",
      description:
        "Training ensures calm, confident, and quick emergency responses always.",
    },
    {
      icon: (
        <Image
          src="/img/unified-effort.webp"
          width={100}
          height={100}
          className="object-contain sm:w-[100px] sm:h-[100px] w-16 h-16"
          alt="Unified Effort"
        />
      ),
      title: "Unified Effort",
      description:
        "Collaboration builds resilience and safer environments for everyone daily.",
    },
  ];

  return (
    <WhyJoinSection
      subtitle="Core Values"
      title="Our Foundation Of Safety Commitment"
      cards={cards}
    />
  );
};

export default CoreValues;
