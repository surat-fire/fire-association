import React from "react";

interface MissionVisionItem {
  title: string;
  description: string;
}

const data: MissionVisionItem[] = [
  {
    title: "Our Mission",
    description:
      "Our mission is to promote fire safety through education, training, and collaboration with industries and citizens. We strive to reduce fire risks, enhance emergency response, and protect lives and property across Surat.",
  },
  {
    title: "Our Vision",
    description:
      "Our vision is to create a fire-ready Surat where safety awareness, quick response, and preventive action become part of everyday life. We aim to build a community that stands strong, informed, and united against fire hazards.",
  },
];

const OurMissionVision: React.FC = () => {
  return (
    <section className="w-full sm:py-14 py-10 bg-[var(--primary)]">
      <div className="ct-container ">
        <div className="w-full flex flex-col sm:gap-10 gap-7">
          {data.map((item, index) => (
            <div key={index} className="grid md:grid-cols-2 gap-3 w-full">
              <ul className="m-0 list-disc ps-5">
                <li className="text-base font-medium text-white">
                  {item.title}
                </li>
              </ul>
              <p className="m-0 text-base font-medium text-white">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurMissionVision;
