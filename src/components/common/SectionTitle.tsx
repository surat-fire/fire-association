import React from "react";

interface SectionTitleProps {
  subtitle?: string;
  title?: string;
  tagline?: string;
  align?: "left" | "center" | "right";
  className?: string;
  titleClass?: string;
  subtitleClass?: string;
  taglineClass?: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({
  subtitle,
  title,
  tagline,
  align = "center",
  className = "",
  titleClass = "",
  subtitleClass = "",
  taglineClass = "",
}) => {
  const alignment =
    {
      left: "text-left",
      center: "text-center",
      right: "text-right",
    }[align] || "text-center";

  return (
    <div className={`${alignment} ${className}`}>
      <div className="w-full">
        {subtitle && (
          <div
            className={`flex items-center gap-2 w-fit justify-center mb-4 mx-auto ${alignment}`}
          >
            <span className="block w-1.5 h-1.5 rounded-md bg-[var(--primary)] font-normal"></span>
            <p
              className={`text-base text-[var(--primary)] mb-0 !font-bold ${subtitleClass}`}
            >
              {subtitle}
            </p>
          </div>
        )}

        {title && (
          <h2
            className={`font-bold text-2xl text-[var(--primary)] ${titleClass}`}
          >
            {title}
          </h2>
        )}

        {tagline && (
          <p
            className={`font-medium text-base text-[var(--primary)] mb-0 ${taglineClass}`}
          >
            {tagline}
          </p>
        )}
      </div>
    </div>
  );
};

export default SectionTitle;
