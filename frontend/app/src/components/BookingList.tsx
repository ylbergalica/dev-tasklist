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
		<ul className="space-y-1 w-full flex flex-col items-center">
			<h1 className="text-2xl">Today&apos;s Bookings</h1>
			{bookings.map((booking) => (
				<li key={booking.id} className="min-w-[390px]">
					<Link
						href={{pathname: `/${booking.id}`}}
						className="flex w-full justify-center bg-slate-800 shadow-md rounded-lg p-4 text-white hover:shadow-lg hover:bg-slate-700 cursor-pointer transition-all duration-300"
					>
						A Booking on {booking.date.toString().substring(0, 10)} starting at {booking.start_time}
					</Link>
				</li>
			))}
		</ul>
	);
};

export default BookingList;