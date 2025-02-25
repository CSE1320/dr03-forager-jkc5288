'use client';
export default function ToxicAlertOverlay({ onClose }) {
	return (
		<div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
			<div className="bg-red-500 p-6 rounded-lg shadow-lg max-w-sm relative">
				{/* Close button */}
				<button
					onClick={onClose}
					className="absolute top-2 right-2 text-white text-2xl font-bold"
					aria-label="Close"
				>
					&times;
				</button>

				<div className="flex items-center space-x-4 mb-4">
					<img src="/icons/icon_warning.svg" alt="Warning icon" className="w-12 h-12" />
					<h2 className="text-4xl font-bold text-white">Attention</h2>
				</div>

				<p className="text-white mb-4 text-justify font-bold">
					Our system can make mistakes! Remember to verify important information and use your own judgment to determine if any mushroom is safe. Be sure to use the "Report Error" button if you suspect a mistake.
				</p>
			</div>
		</div>
	);
}

