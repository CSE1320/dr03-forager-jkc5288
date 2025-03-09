export default function CameraButton({ isVideoActive, setIsVideoActive, takePhoto, openLibrary }) {
	return (
		<div className="buttons">
			{/* Open Photo Library button */}
			<button className="photoLibraryButton" onClick={openLibrary}>
				<img src="/icons/file.svg" alt="Open Photo Library" className="cameraButtonIcon" />
			</button>

			{/* Start Camera button */}
			{!isVideoActive && (
				<button className="openCameraButton" onClick={() => setIsVideoActive(true)}>
					<img src="/icons/capture-icon.svg" alt="Start Camera" className="cameraButtonIcon" />
				</button>
			)}

			{/* Take Photo button */}
			{isVideoActive && (
				<button className="openCameraButton" onClick={takePhoto}>
					<img src="/icons/capture-icon.svg" alt="Take Photo" className="cameraButtonIcon" />
					Capture
				</button>
			)}
		</div>
	);
}

