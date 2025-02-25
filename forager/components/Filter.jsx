import { useState } from 'react';
import { FaFilter } from 'react-icons/fa';

export default function Filter({ activeFilters, onAddFilter, onRemoveFilter }) {
	const [filterOptions] = useState(['Toxic', 'Edible', 'Rare', 'Common']);

	const handleFilterClick = (filter) => {
		if (activeFilters.includes(filter)) {
			onRemoveFilter(filter);
		} else {
			onAddFilter(filter);
		}
	};

	return (
		<div className="filter-section">
			<div className="flex items-center space-x-2">
				<FaFilter className="text-black text-xl cursor-pointer" />
				<span className="text-black">Filters</span>
			</div>
			<div className="active-filters mt-2 flex flex-wrap gap-2">
				{filterOptions.map((filter) => (
					<button
						key={filter}
						onClick={() => handleFilterClick(filter)}
						className={`px-3 py-1 rounded-lg text-sm ${activeFilters.includes(filter) ? 'bg-[#579076] text-white' : 'bg-gray-200'
							}`}
					>
						{filter}
					</button>
				))}
			</div>
		</div>
	);
}

