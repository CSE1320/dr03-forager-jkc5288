import { promises as fs } from 'fs';
import path from 'path';

export async function POST(req) {
	try {
		// Parse incoming request data
		const { mushroomId, isFavorite } = await req.json();
		console.log('Received data:', { mushroomId, isFavorite });

		// Load and parse the JSON file
		const filePath = path.join(process.cwd(), 'data', 'mushroom.json');
		console.log('Reading file at:', filePath);

		const fileContents = await fs.readFile(filePath, 'utf8');
		let mushrooms = JSON.parse(fileContents);
		console.log('Before update:', mushrooms);

		// Ensure mushroomId is a number (in case it's coming as a string)
		const parsedMushroomId = typeof mushroomId === 'string' ? parseInt(mushroomId) : mushroomId;

		// Find and update the mushroom's favorite status
		let found = false;
		mushrooms = mushrooms.map((mushroom) => {
			if (mushroom.id === parsedMushroomId) {
				console.log(`Updating mushroom with id ${mushroom.id}: setting is_favorite to ${isFavorite}`);
				found = true;
				return {
					...mushroom,
					features: {
						...mushroom.features,
						is_favorite: isFavorite,  // Update the is_favorite flag here
					},
				};
			}
			return mushroom;
		});

		if (!found) {
			console.log('No mushroom found with id:', parsedMushroomId);
		}

		// Save the updated JSON file
		console.log('After update:', mushrooms);
		await fs.writeFile(filePath, JSON.stringify(mushrooms, null, 2));
		console.log('File updated successfully.');

		return new Response(JSON.stringify({ success: true }), { status: 200 });
	} catch (error) {
		console.error('Error updating favorite status:', error);
		return new Response(JSON.stringify({ error: 'Failed to update favorite status' }), { status: 500 });
	}
}

