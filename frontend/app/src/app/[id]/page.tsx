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

const fetchBooking = async (id: string | string[]) => {
	const response = await fetch(`http://host.docker.internal:5000/api/bookings/${id}`, { cache: 'no-store' });
	if (!response.ok) {
		throw new Error('Failed to fetch booking');
	}

	const data = await response.json();
	return data;
};

const BookingPage: React.FC = () => {
	const router = useRouter();
	const { id } = useParams();

	const [booking, setBooking] = useState<Booking>(null);

	const handleBack = () => {
		router.back();
	};

	useEffect(() => {
		if (id) {
			fetchBooking(id).then(res => {
				setBooking(res);
			})
		}
	}, [id]);

	return (
		<>
			{booking ? (
				<div className="h-[90vh] w-[100%] flex items-center justify-center p-4">
					<div className="space-y-2 p-8 bg-slate-50 border border-opacity-60 border-slate-500 rounded">
						<h1 className="text-2xl my-4">Booking Details</h1>
						<p>Doctor: <b>{booking.doctor_name}</b></p>
						<p>Service: <b>{booking.service}</b></p>
						<p>Start Time: <b>{booking.start_time}</b></p>
						<p>End Time: <b>{booking.end_time}</b></p>
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