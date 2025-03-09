import { useRef, useEffect } from 'react';
import CameraButton from './CameraButton';  // Import the new CameraButton component

export default function PhotoCamera({ isVideoActive, setPhoto, setIsVideoActive }) {
	const videoRef = useRef(null);
	const canvasRef = useRef(null);
	const streamRef = useRef(null); // Store the video stream to stop it later

	useEffect(() => {
		const startCamera = () => {
			if (videoRef.current) {
				navigator.mediaDevices
					.getUserMedia({ video: true })
					.then((stream) => {
						streamRef.current = stream; // Save the stream reference
						videoRef.current.srcObject = stream;
					})
					.catch((error) => {
						console.error('Error starting camera: ', error);
					});
			}
		};

		if (isVideoActive) {
			startCamera();
		} else {
			stopCamera();
		}

		return () => {
			stopCamera();
		};
	}, [isVideoActive]);

	const stopCamera = () => {
		// Stop all tracks of the video stream to turn off the camera feed
		if (streamRef.current) {
			streamRef.current.getTracks().forEach((track) => {
				track.stop();
			});
		}
	};

	const takePhoto = () => {
		if (videoRef.current && canvasRef.current) {
			const context = canvasRef.current.getContext('2d');
			// Set canvas size to match the video size
			canvasRef.current.width = videoRef.current.videoWidth;
			canvasRef.current.height = videoRef.current.videoHeight;
			// Draw the current frame from the video stream onto the canvas
			context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
			// Get the photo as a data URL
			const imageUrl = canvasRef.current.toDataURL('image/jpeg');
			setPhoto(imageUrl); // Store the photo in state
			setIsVideoActive(false); // Hide video after taking the photo
		}
	};

	return (
		<div>
			{/* Show the video feed if it's active */}
			{isVideoActive && <video ref={videoRef} autoPlay muted width="100%" height="auto" />}

			{/* Conditionally render the focus overlay with active class when the camera is on */}
			{isVideoActive && <div className="focusOverlay active"></div>}

			{/* Camera Button component */}
			<CameraButton
				isVideoActive={isVideoActive}
				setIsVideoActive={setIsVideoActive}
				takePhoto={takePhoto}
			/>

			{/* Hidden canvas used for capturing the photo */}
			<canvas ref={canvasRef} style={{ display: 'none' }} />
		</div>
	);
}

