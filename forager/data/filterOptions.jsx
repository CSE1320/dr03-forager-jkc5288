const filters = [
	{
		category: 'Status',
		options: [
			{ id: 'favorites', label: 'Favorites', type: 'boolean', key: 'features.is_favorite' },
			{ id: 'recent', label: 'Recent', type: 'static' }
		]
	},
	{
		category: 'Toxicity',
		options: [
			{ id: 'toxic', label: 'Toxic', type: 'boolean', key: 'features.is_toxic' },
			{ id: 'non-toxic', label: 'Non-Toxic', type: 'boolean', key: 'features.is_toxic', value: false }
		]
	},
	{
		category: 'Gill Color',
		type: 'dynamic',
		key: 'characteristics.gill_color.value',
		options: [
			{ id: 'white', label: 'White' },
			{ id: 'yellow', label: 'Yellow' },
			{ id: 'gray', label: 'Gray' }
		]
	},
	{
		category: 'Region',
		type: 'dynamic',
		key: 'region',
		options: [
			{ id: 'north-america', label: 'North America' },
			{ id: 'europe', label: 'Europe' },
			{ id: 'asia', label: 'Asia' },
			{ id: 'worldwide', label: 'Worldwide' }
		]
	}
];

export default filters;

