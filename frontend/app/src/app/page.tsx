"use client";

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from "next/link";

import BookingList from '../components/BookingList';

async function getBookings() {
	const res = await fetch('http://host.docker.internal:5000/api/bookings', { cache: 'no-store' })

	if (!res.ok) {
		throw new Error('Failed to fetch data')
	}

	return res.json()
}

const Home: React.FC = () => {
	const router = useRouter();

	const [bookings, setBookings] = useState(null);

	useEffect(() => {
		getBookings().then(result => {
			setBookings(result);
		})
	}, [])

	return (
		<>
			{bookings ? (
				<div className='h-[90vh] w-[100%] flex items-center justify-center'>
					<BookingList bookings={bookings} />

					<Link
						href={{ pathname: '/book' }}
						className="fixed top-12 right-24 bg-green-900 text-white p-4 rounded hover:bg-green-800 cursor-pointer transition-all duration-150"
					>
						New Booking
					</Link>
				</div>
			) : (
				<div className='h-[90vh] w-[100%] flex items-center justify-center'>
					Loading...
				</div>
			)}

		</>
	);
};

export default Home;
