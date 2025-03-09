'use client';
import { useState } from 'react';

const FavoriteButton = ({ mushroomId, initialFavorite, onFavoriteToggle }) => {
	const [isFavorite, setIsFavorite] = useState(initialFavorite);

	const handleFavoriteClick = async () => {
		if (!mushroomId) {
			console.error('Missing mushroomId');
			return;
		}

		const newFavoriteStatus = !isFavorite;
		setIsFavorite(newFavoriteStatus);

		try {
			const response = await fetch('/api/update-favorite', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ mushroomId, isFavorite: newFavoriteStatus }),
			});

			if (!response.ok) {
				throw new Error('Failed to update favorite status.');
			}

			// Notify the parent component (if needed) about the change
			if (onFavoriteToggle) {
				onFavoriteToggle(mushroomId, newFavoriteStatus);
			}
		} catch (error) {
			console.error('Error updating favorite status:', error);
			// Revert the favorite status back on error
			setIsFavorite(!newFavoriteStatus);
		}
	};

	return (
		<button
			className={`favorite-button ${isFavorite ? 'favorite-active' : ''}`}
			onClick={handleFavoriteClick}
			aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
		>
			{isFavorite ? '− Remove from Favorites' : '+ Add to Favorites'}
		</button>
	);
};

export default FavoriteButton;

