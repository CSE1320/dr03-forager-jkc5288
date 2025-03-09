import React from 'react';
import PillComponent from './PillComponent';
import filters from '../data/filterOptions';

const PillList = ({ onSelect }) => {
	return (
		<div className="space-y-4">
			{filters.map((filter) => (
				<section key={filter.category} className="filter-section">
					<h2 className="text-lg font-semibold mb-2">{filter.category}</h2>
					<div className="flex flex-wrap gap-2">
						{filter.options?.map((option) => (
							<PillComponent
								key={option.id}
								label={option.label}
								onSelect={() => onSelect(option)} // Sends full option object
							/>
						))}
						{!filter.options && <span className="text-gray-500 text-sm">Dynamic options will be loaded...</span>}
					</div>
				</section>
			))}
		</div>
	);
};

export default PillList;

