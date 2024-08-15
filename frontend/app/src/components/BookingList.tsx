import Link from "next/link";

interface Booking {
	id: string;
	date: Date;
	start_time: string;
	doctor_name: string;
	service: string;
	end_time: string;
}

interface BookingListProps {
	bookings: Booking[];
}

const BookingList: React.FC<BookingListProps> = ({ bookings }) => {
	return (
		<ul className="space-y-8">
			{bookings.map((booking) => (
				<li key={booking.id}>
					<Link
						href={{pathname: `/booking/${booking.id}`}}
						className="bg-slate-800 shadow-md rounded-lg p-4 hover:shadow-lg hover:bg-slate-700 cursor-pointer transition-all duration-300"
					>
						A Booking on {booking.date.toString()} starting at {booking.start_time}
					</Link>
				</li>
			))}
		</ul>
	);
};

export default BookingList;