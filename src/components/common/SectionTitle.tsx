import React from "react";

const SectionTitle = ({
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
    <div className={`py-10 ${alignment} ${className}`}>
      <div className="max-w-2xl mx-auto">
        {subtitle && (
          <div className="flex items-center gap-2 w-fit justify-center mb-4">
            <span className="block w-2 h-2 rounded-md bg-[var(--primary)]"></span>
            <p
              className={`font-semibold text-base text-[var(--primary)] mb-0 ${subtitleClass}`}
            >
              {subtitle}
            </p>
          </div>
        )}

        {title && (
          <h2
            className={`font-bold text-2xl text-[var(--primary)] mb-4 ${titleClass}`}
          >
            {title}
          </h2>
        )}

        {tagline && (
          <p className={`font-medium text-base text-[var(--primary)] mb-0 ${taglineClass}`}>{tagline}</p>
        )}
      </div>
    </div>
  );
};

export default SectionTitle;
