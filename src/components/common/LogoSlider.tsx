// components/LogoSlider.js
import React from "react";
import Image from "next/image";

const LogoSlider = () => {

	const logos = [
		{
			src: "/icons/spotify-logo.webp",
			alt: "spotify"
		},
		{
			src: "/icons/amazon-logo.webp",
			alt: "amazon"
		},
		{
			src: "/icons/google-logo.webp",
			alt: "google"
		},
		{
			src: "/icons/lenovo-logo.webp",
			alt: "lenovo"
		},
		{
			src: "/icons/paypal-logo.webp",
			alt: "paypal"
		},
		{
			src: "/icons/shopify-logo.webp",
			alt: "shopify"
		},
	]

	const duplicatedLogos = [...logos, ...logos];

	return (
		<section className="py-16 px-4 bg-gray-50 overflow-hidden">
			<div className="max-w-7xl mx-auto">
				<div className="relative">
					<div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-gray-50 to-transparent z-10"></div>
					<div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-gray-50 to-transparent z-10"></div>

					<div className="flex animate-scroll hover:pause-animation">
						{duplicatedLogos.map((logo, index) => (
							<div
								key={index}
								className="flex-shrink-0 mx-8 flex items-center justify-center"
								style={{ minWidth: "150px" }}
							>
								{logo.src ? (
									<Image
										src={logo.src}
										alt={logo.alt || "Logo"}
										width={120}
										height={60}
										className="object-contain grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100"
									/>
								) : (
									<div className="text-2xl font-bold text-gray-400 hover:text-gray-700 transition-colors">
										{logo.alt}
									</div>
								)}
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
};

export default LogoSlider;