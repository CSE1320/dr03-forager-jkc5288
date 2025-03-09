import React from 'react';
import '@/styles/ToxicBadge.css'

export default function ToxicBadge({ isToxic }) {
	if (!isToxic) return null;

	return (
		<div className="toxic-badge-container">
			<img
				src="/icons/icon_warning.svg"
				alt="Toxic warning"
			/>
		</div>
	);
}

