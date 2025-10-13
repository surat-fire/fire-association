import React from 'react'
import SectionTitle from '../common/SectionTitle'
import FeatureSection from '../common/FeaturesSection'

const WhyJoinSection = () => {
	const WhyJoin = [
		{
			icon: "/img/training-discount.webp",
			title: "Training Discounts",
			description: "Reduced fees for members on workshops and certifications."
		},
		{
			icon: "/img/network-access.webp",
			title: "Network Access",
			description: "Connect with departments, experts and safety leaders."
		},
		{
			icon: "/img/priority-updates.webp",
			title: "Priority Updates",
			description: "Receive timely alerts and supply advisories."
		},
	]
	return (
		<section className="py-16 px-4 bg-white">
			<div className="max-w-7xl mx-auto">
				<div className="text-center">
					<SectionTitle text='Why Join' />
					<h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
						Connect With Industry Safety Leaders
					</h2>
				</div>
			</div>
			<FeatureSection features={WhyJoin} />
		</section>
	)
}

export default WhyJoinSection