import React from "react";
import SectionTitle from "../common/SectionTitle";

export type WhyJoinCard = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

interface WhyJoinSectionProps {
  subtitle?: string;
  title?: string;
  cards: WhyJoinCard[];
  className?: string;
}

const WhyJoinSection: React.FC<WhyJoinSectionProps> = ({
  subtitle = "Why Join",
  title = "Connect With Industry Safety Leaders",
  cards,
  className = "",
}) => {
  return (
    <section className={`w-full relative sm:py-14 py-10 ${className}`}>
      <div className="ct-container">
        <SectionTitle
          subtitle={subtitle}
          title={title}
          align="center"
          titleClass="max-w-[440px] w-full mx-auto"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:mt-10 mt-5">
          {cards.map((card, index) => (
            <div
              key={index}
              className="bg-[rgba(221,40,40,0.08)] transition-all duration-300 rounded-[20px] sm:p-6 p-5 text-[var(--primary)] hover:text-white hover:bg-[var(--primary)] [&:hover_.text-white-hover]:!text-white [&:hover_.bg-white-hover]:!bg-white flex items-center justify-center sm:min-h-[430px] flex-col main-join-card-block"
            >
              <div className="flex items-center justify-center md:mb-20 sm:mb-14 mb-6 icon-img transition-all duration-300">
                {card.icon}
              </div>
              <span className="block text-[13px] leading-5 m-0 font-semibold text-center max-w-[240px] w-full mx-auto">
                {card.description}
              </span>
              <SectionTitle
                title={card.title}
                align="left"
                titleClass="text-white-hover transition-all duration-300 text-center mx-auto mt-4"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyJoinSection;
