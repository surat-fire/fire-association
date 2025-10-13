// components/FeatureSection.js
import React from "react";

interface IProps {
	features: {
		icon: string
		description: string
		title: string
	}[]
}

const FeatureSection = ({ features }: IProps) => {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`
                rounded-2xl p-8 transition-all duration-300 cursor-pointer
                ${
                  index === 0
                    ? "bg-brand-800 text-white hover:from-red-800 hover:to-red-900"
                    : "bg-brand-300 hover:shadow-lg"
                }
                group
              `}
            >
              {/* Icon */}
              <div className="mb-8 flex justify-center">
                <div className="w-24 h-24 flex items-center justify-center">
                  {feature.icon ? (
                    <img
                      src={feature.icon}
                      alt={feature.title}
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <div
                      className={`
                        w-full h-full rounded-full flex items-center justify-center
                        ${
                          index === 0
                            ? "border-4 border-white"
                            : "border-4 border-brand-800"
                        }
                      `}
                    >
                      <svg
                        className="w-12 h-12"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="text-center">
                <p
                  className={`
                    text-sm mb-4 transition-colors
                    ${
                      index === 0
                        ? "text-gray-200"
                        : ""
                    }
                  `}
                >
                  {feature.description}
                </p>
                <h3 className="text-2xl font-bold">{feature.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;