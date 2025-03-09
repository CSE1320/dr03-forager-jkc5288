import React, { useState } from 'react';

const PillComponent = ({ label, onSelect }) => {
	const [isSelected, setIsSelected] = useState(false);

	const handleClick = () => {
		setIsSelected(!isSelected);
		onSelect();
	};

	return (
		<button
			className={`pill ${isSelected ? 'selected' : ''}`}
			onClick={handleClick}
		>
			{label}
		</button>
	);
};

export default PillComponent;

