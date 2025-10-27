import React from "react";
import WhyJoinSection, { WhyJoinCard } from "@/components/common/WhyJoin";
import Image from "next/image";

const GetInTouch = () => {
  const cards: WhyJoinCard[] = [
    {
      icon: (
        <Image
          src="/img/awareness-first.webp"
          width={100}
          height={100}
          className="object-contain sm:w-[100px] sm:h-[100px] w-16 h-16"
          alt="Our Office"
        />
      ),
      title: "Our Office",
      description:
        "123 Trade Center Business District New York, NY 10001 United States",
    },
    {
      icon: (
        <Image
          src="/img/prepared-action.webp"
          width={100}
          height={100}
          className="object-contain sm:w-[100px] sm:h-[100px] w-16 h-16"
          alt="Phone Numbers"
        />
      ),
      title: "Phone Numbers",
      description:
        "Main: +1-234-567-8900\nSales: +1-234-567-8901",
    },
    {
      icon: (
        <Image
          src="/img/unified-effort.webp"
          width={100}
          height={100}
          className="object-contain sm:w-[100px] sm:h-[100px] w-16 h-16"
          alt="Email Addresses"
        />
      ),
      title: "Email Addresses",
      description:
        "General: info@globalagroexports.com\nSales: sales@globalagroexports.com",
    },
  ];

  return (
    <WhyJoinSection
      subtitle="Get in Touch"
      title="Connect with us for all trade support needs."
      cards={cards}
    />
  );
};

export default GetInTouch;
