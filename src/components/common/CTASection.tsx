
// components/CTASection.js
import React from "react";
import Link from "next/link";
import { Button } from "../ui/Button";

interface IProps {
	label: string
	title: string
	description: string
	buttonText: string
	buttonLink: string
}

const CTASection = ({
	label = "Contact",
	title = "Get Involved",
	description = "Tell us your interest and we'll reach out.",
	buttonText = "Contact Us",
	buttonLink = "/contact"
}: IProps) => {
	return (
		<section className="py-16 px-4 bg-white">
			<div className="max-w-4xl mx-auto text-center">
				<p className="text-gray-900 font-medium mb-4">• {label}</p>
				<h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
					{title}
				</h2>
				<p className="text-lg text-gray-700 mb-8">
					{description}
				</p>

				<Link href={buttonLink}>
					<Button>
						{buttonText}
					</Button>
				</Link>
			</div>
		</section>
	);
};

export default CTASection;