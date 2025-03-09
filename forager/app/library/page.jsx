import Link from 'next/link';
import NavBar from '../../components/NavBar';
import PolaroidCard from '../../components/PolaroidCard';

export default function MushroomPage({ mushroom = {} }) {
	const placeholderImage = '/images/placeholder.png';

	return (
		<div className="page">
			{/* Green header with back button */}
			<header className="bg-[#579076] text-white p-4 rounded-b-lg flex items-center">
				<Link href="/dashboard" className="text-white text-lg font-medium">← Back</Link>
			</header>

			{/* Polaroid card section encapsulated in a box with a Compare button */}
			<section className="bg-white p-4 shadow-md rounded-lg m-4 relative">
				<Link href="/comparison">
					<button className="absolute top-4 right-4 bg-[#579076] text-white py-1 px-3 rounded-lg text-sm">Compare</button>
				</Link>
				<div className="flex justify-center py-6">
					<PolaroidCard mushroom={mushroom} />
				</div>
			</section>

			{/* More information section */}
			<section className="more-info-section bg-white p-4 shadow-md rounded-lg m-4">
				<h3 className="text-2xl font-semibold mb-2">More Information</h3>
				<p><strong>Toxic:</strong> {mushroom.features?.is_toxic || 'Unknown'}</p>
				<p><strong>Favorite:</strong> {mushroom.features?.is_favorite || 'No'}</p>
				<p><strong>Region:</strong> {mushroom.region || 'Unknown'}</p>
				<p><strong>Description:</strong> {mushroom.description || 'No description available.'}</p>
			</section>

			<NavBar />
		</div>
	);
}


