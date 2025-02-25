'use client';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import NavBar from '../../components/NavBar';
import PolaroidCard from '../../components/PolaroidCard';
import WarningBanner from '../../components/WarningBanner';
import ToxicAlertOverlay from '../../components/ToxicAlertOverlay';

export default function MushroomPage() {
	const searchParams = useSearchParams();
	const [mushroom, setMushroom] = useState(null);
	const [error, setError] = useState(null);
	const [showAlert, setShowAlert] = useState(false);
	const placeholderImage = '/images/placeholder.png';

	useEffect(() => {
		const fetchMushrooms = async () => {
			try {
				const response = await fetch('/mushroom.json');
				const data = await response.json();
				const mushroomName = searchParams.get('name');

				const foundMushroom = data.find((m) => m.name === mushroomName);
				if (foundMushroom) {
					setMushroom(foundMushroom);
					if (foundMushroom.features?.is_toxic && !localStorage.getItem('toxicWarningAcknowledged')) {
						setShowAlert(true);
					}
				} else {
					setError('Mushroom not found.');
				}
			} catch (err) {
				setError('Failed to load mushroom data.');
			}
		};

		if (searchParams.get('name')) {
			fetchMushrooms();
		}
	}, [searchParams]);

	const handleCloseAlert = () => {
		localStorage.setItem('toxicWarningAcknowledged', 'true');
		setShowAlert(false);
	};

	if (error) {
		return <div className="p-6 text-red-600">{error}</div>;
	}

	if (!mushroom) {
		return <div className="p-6">Loading...</div>;
	}

	return (
		<div className="page">
			{/* Toxic alert overlay */}
			{showAlert && <ToxicAlertOverlay onClose={handleCloseAlert} />}

			{/* Green header with back button */}
			<header className="bg-[#579076] text-white p-4 rounded-b-lg flex items-center">
				<Link href="/dashboard" className="text-white text-lg font-medium">← Back</Link>
			</header>

			{/* Warning banner */}
			<div className="p-4">
				<WarningBanner isToxic={mushroom.features?.is_toxic} />
			</div>

			{/* Polaroid card section with Compare button */}
			<section className="bg-white p-4 shadow-md rounded-lg m-4 relative">
				<Link href="/comparison">
					<button className="absolute top-4 right-4 bg-[#579076] text-white py-1 px-3 rounded-lg text-sm">
						Compare
					</button>
				</Link>
				<div className="flex justify-center py-6">
					<PolaroidCard mushroom={mushroom} />
				</div>
			</section>

			{/* More information section */}
			<section className="more-info-section bg-white p-4 shadow-md rounded-lg m-4">
				<h3 className="text-2xl font-semibold mb-2">More Information</h3>
				<p><strong>Toxic:</strong> {mushroom.features?.is_toxic ? 'Yes' : 'No'}</p>
				<p><strong>Favorite:</strong> {mushroom.features?.is_favorite ? 'Yes' : 'No'}</p>
				<p><strong>Region:</strong> {mushroom.region || 'Unknown'}</p>
				<p><strong>Description:</strong> {mushroom.description || 'No description available.'}</p>
			</section>

			<NavBar />
		</div>
	);
}