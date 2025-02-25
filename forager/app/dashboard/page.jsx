'use client';
import { useState, useEffect } from 'react';
import PolaroidCard from '../../components/PolaroidCard';
import FilterOverlay from '../../components/FilterOverlay';
import NavBar from '../../components/NavBar';
import { FaSearch, FaFilter, FaTimes } from 'react-icons/fa';
import { filters } from '../../data/development';

export default function DashboardPage() {
	const [allMushrooms, setAllMushrooms] = useState([]);
	const [searchQuery, setSearchQuery] = useState('');
	const [activeFilters, setActiveFilters] = useState([]);
	const [isFilterOverlayOpen, setIsFilterOverlayOpen] = useState(false);
	const userName = 'Chantelle';

	useEffect(() => {
		const fetchMushrooms = async () => {
			try {
				const response = await fetch('/mushroom.json');
				const data = await response.json();

				const processedData = data.map((mushroom) => ({
					...mushroom,
					features: {
						...mushroom.features,
						is_toxic: mushroom.features.is_toxic === true || mushroom.features.is_toxic === 'Yes',
					},
				}));

				setAllMushrooms(processedData);
			} catch (error) {
				console.error('Error fetching mushrooms:', error);
			}
		};

		fetchMushrooms();
	}, []);

	const handleSearch = (e) => {
		setSearchQuery(e.target.value.toLowerCase());
	};

	const toggleFilter = (filterId) => {
		setActiveFilters((prevFilters) =>
			prevFilters.includes(filterId)
				? prevFilters.filter((id) => id !== filterId)
				: [...prevFilters, filterId]
		);
	};

	const removeFilter = (filterId) => {
		setActiveFilters((prevFilters) => prevFilters.filter((id) => id !== filterId));
	};

	const filteredMushrooms = allMushrooms.filter((mushroom) => {
		const matchesSearch =
			mushroom.name.toLowerCase().includes(searchQuery) ||
			mushroom.scientific_name.toLowerCase().includes(searchQuery) ||
			mushroom.description.toLowerCase().includes(searchQuery) ||
			mushroom.region.toLowerCase().includes(searchQuery);

		const matchesFilter =
			activeFilters.length === 0 ||
			(activeFilters.includes('favorites') && mushroom.features.is_favorite) ||
			(activeFilters.includes('recent') && mushroom.features.is_recent) ||
			(activeFilters.includes('toxic') && mushroom.features.is_toxic) ||
			(activeFilters.includes('non-toxic') && !mushroom.features.is_toxic);

		return matchesSearch && matchesFilter;
	});

	const getFilterLabel = (filterId) => {
		const filter = filters.find((f) => f.id === filterId);
		return filter ? filter.label : '';
	};

	return (
		<div className="page flex flex-col min-h-screen">
			<div className="greeting-section py-[1.5em] px-[1.25em] bg-gray-100">
				<h1 className="text-[2em] font-semibold">Hi, <br />{userName}!</h1>
			</div>

			<div className="searchbar-section flex items-center gap-4 px-[1.25em] py-[1.5em] bg-white">
				<div className="flex flex-1 items-center border rounded-full p-3 shadow-md">
					<FaSearch className="text-gray-500 mr-3" />
					<input
						type="text"
						placeholder="Search mushrooms..."
						className="flex-1 bg-transparent outline-none text-gray-800"
						value={searchQuery}
						onChange={handleSearch}
					/>
				</div>
				<button
					className="p-3 rounded-full bg-[#579076] text-white flex items-center justify-center shadow-md hover:bg-[#4a7f63] transition"
					onClick={() => setIsFilterOverlayOpen(true)}
					aria-label="Open filter options"
				>
					<FaFilter size={20} />
				</button>
			</div>

			<div className="my-collection-section px-[1.25em] py-[1.5em]">
				<h2 className="text-[1.5em] font-semibold text-[#579076] mb-4">My Collection</h2>

				{activeFilters.length > 0 && (
					<div className="flex flex-wrap gap-2 mb-4">
						{activeFilters.map((filterId) => (
							<div
								key={filterId}
								className="flex items-center bg-[#579076] text-white text-sm px-3 py-1 rounded-full"
							>
								{getFilterLabel(filterId)}
								<button onClick={() => removeFilter(filterId)} className="ml-2">
									<FaTimes size={14} />
								</button>
							</div>
						))}
					</div>
				)}

				{filteredMushrooms.length > 0 ? (
					<div className="grid grid-cols-3 gap-4">
						{filteredMushrooms.map((mushroom, index) => (
							<PolaroidCard key={index} mushroom={mushroom} />
						))}
					</div>
				) : (
					<p className="text-center text-gray-500">No mushrooms found.</p>
				)}
			</div>

			{isFilterOverlayOpen && (
				<FilterOverlay
					activeFilters={activeFilters}
					onToggleFilter={toggleFilter}
					onClose={() => setIsFilterOverlayOpen(false)}
				/>
			)}

			<NavBar />
		</div>
	);
}
