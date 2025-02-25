import React from 'react';
import ToxicBadge from './ToxicBadge';
import Link from 'next/link';

export default function PolaroidCard({ mushroom }) {
	const placeholderImage = '/images/placeholder.jpg';
	const isToxic = mushroom.features?.is_toxic;

	return (
		<Link href={`/mushroom?name=${encodeURIComponent(mushroom.name)}`}>
			<div className="relative bg-white rounded-lg shadow-md p-6 flex flex-col items-center cursor-pointer">
				<ToxicBadge isToxic={isToxic} />
				<img
					src={mushroom.image || placeholderImage}
					alt={mushroom.name}
					className="w-full rounded-lg h-48 object-cover mb-4"
				/>
				<h2 className="text-xl font-semibold">{mushroom.name}</h2>
				<p className="text-sm text-gray-600">{mushroom.scientific_name}</p>
			</div>
		</Link>
	);
}

