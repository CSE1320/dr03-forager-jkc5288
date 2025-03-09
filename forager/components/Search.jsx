import { useState } from 'react';

const Search = ({ mushrooms, onSelect }) => {
	const [searchTerm, setSearchTerm] = useState('');
	const [filteredMushrooms, setFilteredMushrooms] = useState([]);

	const handleSearch = (e) => {
		const query = e.target.value;
		setSearchTerm(query);

		if (query.length > 0) {
			const filtered = mushrooms.filter(mushroom =>
				mushroom.name.toLowerCase().includes(query.toLowerCase())
			);
			setFilteredMushrooms(filtered);
		} else {
			setFilteredMushrooms([]);
		}
	};

	const handleSelect = (mushroom) => {
		setSearchTerm(mushroom.name); // autofill the input with the selected name
		onSelect(mushroom); // pass the mushroom data to the parent component
		setFilteredMushrooms([]); // clear dropdown
	};

	return (
		<div className="relative w-full max-w-md">
			<input
				type="text"
				placeholder="Search mushrooms..."
				value={searchTerm}
				onChange={handleSearch}
				className="w-full p-2 border rounded-md"
			/>
			{filteredMushrooms.length > 0 && (
				<ul className="absolute w-full bg-white border rounded-md mt-1 max-h-60 overflow-y-auto">
					{filteredMushrooms.map((mushroom) => (
						<li
							key={mushroom.id}
							onClick={() => handleSelect(mushroom)}
							className="p-2 hover:bg-gray-100 cursor-pointer"
						>
							{mushroom.name}
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default Search;

