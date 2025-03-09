'use client';
import React from 'react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import FilteredMushrooms from './FilteredMushrooms';

const MushroomList = ({ searchQuery, selectedFilters }) => {
	const [mushrooms, setMushrooms] = useState([]);

	useEffect(() => {
		const fetchMushrooms = async () => {
			const data = await import('../data/mushroom');
			setMushrooms(data.default);
		};

		fetchMushrooms();
	}, []);

	return (
		<div className="my-collection-section px-[1.25em] py-[1.5em]">
			<h2 className="text-[1.5em] font-semibold text-[#579076] mb-4">Similar Mushrooms</h2>
			<FilteredMushrooms
				mushrooms={mushrooms}
				searchQuery={searchQuery}
				selectedFilters={selectedFilters}
			/>
		</div>
	);
};

export default MushroomList;


