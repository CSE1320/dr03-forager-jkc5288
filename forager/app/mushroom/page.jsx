'use client';
import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import FavoriteButton from '@/components/FavoriteButton';
import ToxicBadge from '@/components/ToxicBadge';
import Message from '@/components/Message';
import WarningBanner from '@/components/WarningBanner';
import SimilarMatchList from '@/components/SimilarMatchList';  // Import the new component
import '@/styles/mushroompage.css';

const MushroomPage = () => {
	const searchParams = useSearchParams();
	const router = useRouter();
	const [isFavorite, setIsFavorite] = useState(false);
	const [loading, setLoading] = useState(true);
	const [showToxicAlert, setShowToxicAlert] = useState(false);
	const [similarMushrooms, setSimilarMushrooms] = useState([]); // State to hold similar mushrooms
	const [searchQuery, setSearchQuery] = useState('');
	const [selectedFilters, setSelectedFilters] = useState([]);

	const mushroom = {
		id: searchParams.get('id'),
		name: searchParams.get('name'),
		scientific_name: searchParams.get('scientific_name'),
		image: searchParams.get('image') || '/images/placeholder.jpg',
		is_toxic: searchParams.get('is_toxic') === 'true',
		description: searchParams.get('description') || 'No description available.',
	};

	if (!mushroom.id) {
		console.error('Missing mushroomId');
		return;
	}

	useEffect(() => {
		const fetchFavoriteStatus = async () => {
			try {
				const isFavoriteFromParams = searchParams.get('is_favorite') === 'true';
				setIsFavorite(isFavoriteFromParams);
			} catch (error) {
				console.error('Failed to fetch favorite status:', error);
			} finally {
				setLoading(false);
			}
		};

		if (mushroom.id) {
			fetchFavoriteStatus();
		}
	}, [mushroom.id]);

	const handleFavoriteToggle = (mushroomId, newFavoriteStatus) => {
		if (mushroomId === mushroom.id) {
			setIsFavorite(newFavoriteStatus);
		}
	};

	useEffect(() => {
		if (mushroom.is_toxic) {
			setShowToxicAlert(true);
		}
	}, [mushroom.is_toxic]);

	return (
		<div className="mushroom-page">
			<header className="mushroom-header">
				<button onClick={() => router.back()} className="back-button">
					<Link href="/">❮</Link>
				</button>
			</header>

			<main className="mushroom-content">
				{mushroom.is_toxic && <WarningBanner isToxic={mushroom.is_toxic} />}

				<div className="relative">
					<div className="compare-container">
						<Link
							href={`/compare?currentMushroomId=${mushroom.id}&currentMushroomName=${mushroom.name}`}
							className="compare-button"
						>
							Compare
						</Link>
					</div>

					<div className="polaroid-card">
						{mushroom.is_toxic && <ToxicBadge isToxic={mushroom.is_toxic} />}
						<img src={mushroom.image} alt={mushroom.name} className="mushroom-image" />
					</div>
				</div>

				<div className="mushroom-details">
					<div className="mushroom-text">
						<h1 className="mushroom-name">{mushroom.name}</h1>
						<p className="mushroom-scientific-name">{mushroom.scientific_name}</p>
					</div>

					{!loading && (
						<FavoriteButton
							mushroomId={mushroom.id}
							initialFavorite={isFavorite}
							onFavoriteToggle={handleFavoriteToggle}
						/>
					)}
				</div>

				<div className="mushroom-description-container">
					<h2 className="description-title">Description</h2>
					<p className="mushroom-description">{mushroom.description}</p>
				</div>

				{/* Render Similar Match List */}
				<SimilarMatchList
					searchQuery={searchQuery}
					selectedFilters={selectedFilters}
				/>
			</main>
			{showToxicAlert && <Message onClose={() => setShowToxicAlert(false)} />}
		</div>
	);
};

export default MushroomPage;

