'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import ComparisonTable from '@/components/ComparisonTable';
import Search from '@/components/Search';
import '@/styles/globals.css';

const ComparePage = () => {
	const [mushrooms, setMushrooms] = useState([]); // List of all mushrooms
	const [mushroom1Data, setMushroom1Data] = useState(null); // Data for first mushroom to compare
	const [mushroom2Data, setMushroom2Data] = useState(null); // Data for second mushroom to compare

	useEffect(() => {
		const fetchMushrooms = async () => {
			const data = await import('@/data/mushroom');
			setMushrooms(data.default);
		};
		fetchMushrooms();
	}, []);

	const handleMushroomSelect = (mushroom, index) => {
		if (index === 1) {
			setMushroom1Data(mushroom);
		} else if (index === 2) {
			setMushroom2Data(mushroom);
		}
	};

	return (
		<div className="comparison-page">
			<header className="comparison-header">
				{/* Back Button with < symbol */}
				<div className="back-button">
					<Link href="/">❮</Link>
				</div>
			</header>

			{/* Mushroom Selection */}
			<div className="mushroom-selection">
				<h2>Select Mushrooms for Comparison</h2>
				<div className="flex">
					<div className="mushroom-list">
						<h3>Mushroom 1</h3>
						<Search mushrooms={mushrooms} onSelect={(mushroom) => handleMushroomSelect(mushroom, 1)} />
					</div>
					<div className="mushroom-list">
						<h3>Mushroom 2</h3>
						<Search mushrooms={mushrooms} onSelect={(mushroom) => handleMushroomSelect(mushroom, 2)} />
					</div>
				</div>
			</div>

			{/* Display the comparison table when both mushrooms are selected */}
			{mushroom1Data && mushroom2Data && (
				<ComparisonTable
					mushroom1Data={mushroom1Data}
					mushroom2Data={mushroom2Data}
				/>
			)}

			{/* Back Link */}
			<div className="back-link">
				<Link href="/">Back to Mushroom List</Link>
			</div>
		</div>
	);
};

export default ComparePage;

