import React, { useEffect, useState } from 'react';
import PolaroidCard from './PolaroidCard';
import mushroomsData from '../data/mushroom.json';

export default function FilteredMushrooms({ searchQuery, selectedFilters }) {
	const [filteredMushrooms, setFilteredMushrooms] = useState([]);

	useEffect(() => {
		let result = mushroomsData;

		console.log('Selected Filters:', selectedFilters);

		// Apply dynamic filters
		selectedFilters.forEach((filter) => {
			const { key, value = true } = filter;

			if (typeof key !== 'string') {
				console.warn('Invalid filter key:', key);
				return;
			}

			const keys = key.split('.');
			console.log('Filtering by:', key, 'with value:', value);

			result = result.filter((mushroom) => {
				let field = mushroom;
				for (let k of keys) {
					field = field?.[k];
					if (field === undefined) break;
				}
				console.log('Field value:', field);
				return field === value;
			});
		});

		// Filter by search query
		if (searchQuery) {
			result = result.filter((mushroom) =>
				mushroom.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
				mushroom.scientific_name?.toLowerCase().includes(searchQuery.toLowerCase())
			);
		}

		console.log('Filtered result:', result);
		setFilteredMushrooms(result);
	}, [searchQuery, selectedFilters]);

	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
			{filteredMushrooms.length > 0 ? (
				filteredMushrooms.map((mushroom) => (
					<PolaroidCard key={mushroom.id} mushroom={mushroom} />
				))
			) : (
				<p className="text-center text-gray-500 col-span-full">No mushrooms found.</p>
			)}
		</div>
	);
}

