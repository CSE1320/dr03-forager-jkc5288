import React from 'react';
import ToxicBadge from './ToxicBadge';
import Link from 'next/link';

export default function PolaroidCard({ mushroom }) {
	const placeholderImage = '/images/placeholder.jpg';

	const query = new URLSearchParams({
		id: mushroom.id,
		name: mushroom.name,
		scientific_name: mushroom.scientific_name || '',
		image: mushroom.image || placeholderImage,
		is_toxic: mushroom.features?.is_toxic ? 'true' : 'false',
		is_favorite: mushroom.features?.is_favorite ? 'true' : 'false',
		region: mushroom.region || 'Unknown',
		description: mushroom.description || 'No description available.',
	}).toString();

	return (
		<Link key={mushroom.id} href={`/mushroom?${query}`}>
			<div className="relative bg-white text-black rounded-lg shadow-md p-6 flex flex-col items-center cursor-pointer">
				{mushroom.features?.is_toxic && <ToxicBadge isToxic={mushroom.features.is_toxic} />}
				<img
					src={mushroom.image || placeholderImage}
					alt={mushroom.name}
					className="w-full rounded-lg h-48 object-cover mb-4"
				/>
				<h2 className="text-xl font-semibold">{mushroom.name}</h2>
				<p className="text-sm text-gray-500">{mushroom.scientific_name}</p>
			</div>
		</Link>
	);
}

