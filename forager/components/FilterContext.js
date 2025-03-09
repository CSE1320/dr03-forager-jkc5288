import { createContext, useState, useContext } from 'react';

const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
	const [selectedFilters, setSelectedFilters] = useState([]);
	const [searchQuery, setSearchQuery] = useState('');

	return (
		<FilterContext.Provider value={{ selectedFilters, setSelectedFilters, searchQuery, setSearchQuery }}>
			{children}
		</FilterContext.Provider>
	);
};

export const useFilters = () => useContext(FilterContext);

