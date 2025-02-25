'use client';
import { useEffect, useState } from 'react';

export default function ToxicAlert({ isToxic }) {
	const [showAlert, setShowAlert] = useState(false);

	useEffect(() => {
		if (isToxic && !localStorage.getItem('toxicWarningAcknowledged')) {
			setShowAlert(true);
		}
	}, [isToxic]);

	if (!showAlert) return null;

	return (
		<div className="bg-red-100 text-red-800 p-4 rounded-md border-l-4 border-red-600 mb-4">
			<strong>Warning:</strong> This mushroom is toxic. Please proceed with caution.
		</div>
	);
}

