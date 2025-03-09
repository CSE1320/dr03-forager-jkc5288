'use client';
import { useState, useEffect } from 'react';
import NavBar from '../../components/NavBar';
import { FaSearch, FaFilter, FaTimes } from 'react-icons/fa';
import FilterSetting from '../../components/FilterSetting';
import MushroomList from '../../components/MushroomList'; // Import the new component
import '../../styles/globals.css';

export default function DashboardPage() {
	const [searchQuery, setSearchQuery] = useState('');
	const [selectedFilters, setSelectedFilters] = useState([]);
	const [showFilter, setShowFilter] = useState(false);
	const [isScrolling, setIsScrolling] = useState(false);
	const userName = 'Chantelle';

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolling(window.scrollY > 50);
		};

		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	const handleSearch = (e) => {
		setSearchQuery(e.target.value.toLowerCase());
	};

	const handleSelectFilter = (option) => {
		const newFilter = option.type === 'boolean'
			? {
				key: option.key,
				value: option.value ?? true,
				label: option.value ? option.label : `${option.label}`, // Set label properly
			}
			: {
				key: option.key,
				value: option.label,
				label: option.label,
			};

		setSelectedFilters((prevFilters) => {
			const exists = prevFilters.some(
				(f) => f.key === newFilter.key && f.value === newFilter.value
			);
			return exists ? prevFilters : [...prevFilters, newFilter];
		});
	};

	const removeFilter = (filter) => {
		setSelectedFilters(selectedFilters.filter((f) => f.key !== filter.key || f.value !== filter.value));
	};

	return (
		<div className={`page flex flex-col min-h-screen transition-colors duration-300 ${isScrolling ? 'bg-gray-200' : 'bg-white'}`}>
			{/* Greeting */}
			<div className="greeting-section py-[1.5em] px-[1.25em] bg-gray-100">
				<h1 className="text-[2em] font-semibold">Hi, <br />{userName}!</h1>
			</div>

			{/* Search & Filter */}
			<div className="searchbar-container flex items-center gap-4 px-[1.25em] py-[1em]">
				<div className="flex items-center border border-gray-300 rounded-lg px-4 py-2 w-full">
					<FaSearch className="text-gray-500 mr-3" />
					<input
						type="text"
						placeholder="Search mushrooms..."
						value={searchQuery}
						onChange={handleSearch}
						className="w-full outline-none"
					/>
				</div>
				<button
					className="filter-button rounded-full w-12 h-12 flex justify-center items-center border-2 border-[#579076]"
					onClick={() => setShowFilter(true)}
				>
					<FaFilter className="text-[#579076]" />
				</button>
			</div>

			{/* Filter Pills */}
			{selectedFilters.length > 0 && (
				<div className="filter-pills flex flex-wrap gap-2 px-[1.25em] py-2">
					{selectedFilters.map((filter, index) => (
						<div
							key={`${filter.key || index}`}
							className="flex items-center bg-[#579076] text-white px-3 py-1 rounded-full text-sm"
						>
							{filter.label || 'Unknown'}
							<button
								onClick={() => removeFilter(filter)}
								className="ml-2 text-white"
							>
								<FaTimes size={12} />
							</button>
						</div>
					))}
				</div>
			)}

			{/* Filter Settings */}
			{showFilter && (
				<FilterSetting
					onClose={() => setShowFilter(false)}
					onSelect={handleSelectFilter}
					selectedFilters={selectedFilters}
				/>
			)}

			{/* Mushroom List */}
			<MushroomList
				searchQuery={searchQuery}
				selectedFilters={selectedFilters}
			/>

			<NavBar />
		</div>
	);
}

