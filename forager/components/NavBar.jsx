'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaHome, FaSearch } from 'react-icons/fa';
import { TbMushroom } from "react-icons/tb";
import styles from '../styles/NavBar.module.css'; // Import the styles for the NavBar

export default function NavBar() {
	const pathname = usePathname(); // Get current route

	return (
		<div className={styles.navbar}>
			<Link href="/compare" passHref>
				<div className={`${styles.navItem} ${pathname === '/compare' ? styles.active : ''}`}>
					<TbMushroom />
				</div>
			</Link>
			<Link href="/dashboard" passHref>
				<div className={`${styles.navItem} ${pathname === '/dashboard' ? styles.active : ''}`}>
					<FaHome />
				</div>
			</Link>
			<Link href="/photosearch" passHref>
				<div className={`${styles.navItem} ${pathname === '/photosearch' ? styles.active : ''}`}>
					<FaSearch />
				</div>
			</Link>
		</div>
	);
}
