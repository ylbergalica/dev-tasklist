"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Booking {
	id: string;
	date: Date;
	start_time: string;
	doctor_name: string;
	service: string;
	end_time: string;
}

const BookingPage: React.FC = () => {
	const router = useRouter();
	const { id } = useParams();

	const [booking, setBooking] = useState<Booking>(null);

	const handleBack = () => {
		router.back();
	};

	useEffect(() => {
		const fetchBooking = async () => {
			const response = await fetch(`/api/bookings/${id}`);
			if (!response.ok) {
				throw new Error('Failed to fetch booking');
			}

			const data = await response.json();
			setBooking(data);
		};

		if (id) {
			fetchBooking();
		}
	}, [id]);

	return (
		<>
			{booking ? (
				<div className="h-[90vh] w-[100%] flex items-center justify-center p-4">
					<div>
						<h1>Booking Details</h1>
						<p>Doctor: {booking.doctor_name}</p>
						<p>Service: {booking.service}</p>
						<p>End Time: {booking.end_time}</p>
					</div>

					<button onClick={handleBack} className="fixed top-12 left-24 bg-blue-950 text-white p-4 rounded hover:bg-blue-900 cursor-pointer">
						Go Back
					</button>
				</div>
			) : (
				<div>Loading...</div>
			)}
		</>
	);
};

export default BookingPage;