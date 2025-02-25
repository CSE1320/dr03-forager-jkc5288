import React from 'react';

export default function ToxicBadge({ isToxic }) {
	if (!isToxic) return null;

	return (
		<div className="absolute top-2 left-2 bg-red-500 rounded-lg p-1 w-10 h-10 flex items-center justify-center shadow-md">
			<img
				src="/icons/icon_warning.svg"
				alt="Toxic warning"
				className="w-8 h-8"
			/>
		</div>
	);
}

