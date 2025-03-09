import React from 'react';
import PillList from './PillList';
import { FaTimes } from 'react-icons/fa';

const FilterSetting = ({ onClose, onSelect = () => { }, selectedFilters = [] }) => {
	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
			<div className="bg-white rounded-lg p-6 w-96 max-h-[80vh] overflow-y-auto shadow-lg">
				{/* Header */}
				<div className="flex justify-between items-center mb-4">
					<h2 className="text-xl font-bold">Filter Settings</h2>
					<button onClick={onClose} className="text-gray-500 hover:text-gray-700">
						<FaTimes size={20} />
					</button>
				</div>

				{/* Pill List */}
				<PillList onSelect={onSelect} selectedFilters={selectedFilters} />
			</div>
		</div>
	);
};

export default FilterSetting;

