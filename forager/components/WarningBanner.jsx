export default function WarningBanner({ isToxic }) {
	if (!isToxic) return null;

	return (
		<div className="flex justify-center">
			<div className="bg-[#FF5050] text-white p-4 rounded-lg inline-flex flex-col">
				<div className="flex items-center space-x-4">
					<img src="/icons/icon_warning.svg" alt="Warning icon" className="w-12 h-12" />
					<h2 className="text-4xl">WARNING</h2>
				</div>
				<p className="text-sm mt-2 text-center font-bold">
					This is a toxic species, proceed with caution.
				</p>
			</div>
		</div>
	);
}

