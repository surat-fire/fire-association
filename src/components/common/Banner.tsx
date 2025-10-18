import React from "react";

interface BannerProps {
  title: string;
  backgroundImage: string;
}

const Banner: React.FC<BannerProps> = ({ title, backgroundImage }) => {
  return (
    <section className="relative w-full pt-5">
      <div className="ct-container">
        <div
          className="w-full sm:min-h-[500px] min-h-[300px] bg-cover bg-center bg-no-repeat sm:rounded-[20px] rounded-2xl relative flex items-center justify-center overflow-hidden"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        >
          <div className="w-full h-full absolute top-0 left-0 bg-[rgba(0,0,0,0.5)] z-0"></div>
          <h3 className="relative z-10 text-center font-bold sm:text-[32px] text-2xl text-white">
            {title}
          </h3>
        </div>
      </div>
    </section>
  );
};

export default Banner;
