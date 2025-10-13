import React from 'react'

const SectionTitle = ({ text }: { text: string }) => {
	return (
		<p className="font-medium mb-2">• {text}</p>
	)
}

export default SectionTitle