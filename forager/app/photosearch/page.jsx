'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import CameraButton from '../../components/CameraButton';  // Import the CameraButton component
import PhotoCamera from '../../components/PhotoCamera';  // Import the PhotoCamera component
import styles from '../../styles/photosearchpage.module.css';  // Import the CSS Module

export default function PhotoSearchPage() {
	const [hasCameraPermission, setHasCameraPermission] = useState(false);
	const [photo, setPhoto] = useState(null);
	const [isVideoActive, setIsVideoActive] = useState(false);  // Start with video off to control it

	useEffect(() => {
		// Check if the browser supports getUserMedia and request camera access
		const checkCameraPermission = async () => {
			try {
				await navigator.mediaDevices.getUserMedia({ video: true });
				setHasCameraPermission(true);
				setIsVideoActive(true); // Turn on the video feed once permission is granted
			} catch (error) {
				console.error('Error accessing camera: ', error);
				setHasCameraPermission(false);
			}
		};

		checkCameraPermission();
	}, []);  // Run only once on component mount

	const resetPhoto = () => {
		setPhoto(null);
		setIsVideoActive(true); // Show video feed again after resetting photo
	};

	return (
		<div className={styles.page}>
			<header className={styles.header}>
				{/* Back Button with < symbol */}
				<div className={styles.backButton}>
					<Link href="/" className={styles.backButtonLink}>
						❮
					</Link>
				</div>
			</header>

			{/* Check if camera is accessible */}
			{!hasCameraPermission ? (
				<p>We couldn't access your camera. Please check your browser's permissions.</p>
			) : (
				<div className={styles.cameraContainer}>
					{/* Camera Component */}
					<PhotoCamera
						isVideoActive={isVideoActive}
						setPhoto={setPhoto}
						setIsVideoActive={setIsVideoActive}
					/>

					{/* Focus Overlay - Only visible when video is active */}
					{isVideoActive && (
						<div className={`${styles.focusOverlay} ${isVideoActive ? styles.active : ''}`}></div>
					)}

					{/* Show the captured photo */}
					{photo && (
						<div className={styles.photoPreview}>
							<img src={photo} alt="Captured Mushroom" className={styles.photo} />
							<button onClick={resetPhoto} className={styles.resetPhotoButton}>
								Reset Photo
							</button>
						</div>
					)}
				</div>
			)}
		</div>
	);
}

