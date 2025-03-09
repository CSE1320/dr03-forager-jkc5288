'use client';
import '@/styles/comparison.css'; // Import the CSS for the ComparisonTable component
import ToxicBadge from './ToxicBadge'; // Import the ToxicBadge component

const ComparisonTable = ({ mushroom1Data, mushroom2Data }) => {
	// Render placeholder data if no mushroom data is passed
	const renderPlaceholder = () => ({
		name: 'Loading...',
		scientific_name: 'Loading...',
		features: { is_toxic: false },
		region: 'Loading...',
		image: '/images/placeholder.jpg',
		characteristics: {
			diameter: { value: 'Loading...', is_filterable: false },
			gill_color: { value: 'Loading...', is_filterable: false },
			cap_shape: { value: 'Loading...', is_filterable: false },
			cap_texture: { value: 'Loading...', is_filterable: false },
			spore_print: { value: 'Loading...', is_filterable: false },
		},
	});

	const data1 = mushroom1Data || renderPlaceholder();
	const data2 = mushroom2Data || renderPlaceholder();

	// Function to render toxicity correctly
	const renderToxicity = (features) => {
		return features && features.is_toxic ? 'Toxic' : 'Non-Toxic';
	};

	// Function to render the new characteristics
	const renderCharacteristic = (mushroom, characteristic) => {
		return mushroom.characteristics[characteristic]?.value || 'Unknown';
	};

	return (
		<div className="comparison-table">
			<table>
				<thead>
					<tr>
						<th className="relative">
							<img src={data1.image} alt={data1.name} className="mushroom-image" />
							<ToxicBadge isToxic={data1.features.is_toxic} />
						</th>
						<th>Attribute</th>
						<th className="relative">
							<img src={data2.image} alt={data2.name} className="mushroom-image" />
							<ToxicBadge isToxic={data2.features.is_toxic} />
						</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>{data1.name}</td>
						<td>Name</td>
						<td>{data2.name}</td>
					</tr>
					<tr>
						<td>{data1.scientific_name}</td>
						<td>Scientific Name</td>
						<td>{data2.scientific_name}</td>
					</tr>
					<tr>
						<td>{renderToxicity(data1.features)}</td>
						<td>Toxicity</td>
						<td>{renderToxicity(data2.features)}</td>
					</tr>
					<tr>
						<td>{data1.region}</td>
						<td>Region</td>
						<td>{data2.region}</td>
					</tr>

					{/* Add rows for each characteristic */}
					<tr>
						<td>{renderCharacteristic(data1, 'diameter')}</td>
						<td>Diameter</td>
						<td>{renderCharacteristic(data2, 'diameter')}</td>
					</tr>
					<tr>
						<td>{renderCharacteristic(data1, 'gill_color')}</td>
						<td>Gill Color</td>
						<td>{renderCharacteristic(data2, 'gill_color')}</td>
					</tr>
					<tr>
						<td>{renderCharacteristic(data1, 'cap_shape')}</td>
						<td>Cap Shape</td>
						<td>{renderCharacteristic(data2, 'cap_shape')}</td>
					</tr>
					<tr>
						<td>{renderCharacteristic(data1, 'cap_texture')}</td>
						<td>Cap Texture</td>
						<td>{renderCharacteristic(data2, 'cap_texture')}</td>
					</tr>
					<tr>
						<td>{renderCharacteristic(data1, 'spore_print')}</td>
						<td>Spore Print</td>
						<td>{renderCharacteristic(data2, 'spore_print')}</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
};

export default ComparisonTable;

