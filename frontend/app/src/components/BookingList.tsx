interface Booking {
  id: string;
  date: string;
  start_time: string;
}

interface BookingListProps {
  bookings: Booking[];
}

const BookingList: React.FC<BookingListProps> = ({ bookings }) => {
  return (
    <ul className="space-y-4">
      {bookings.map((booking) => (
        <li key={booking.id}>
          <a href={`/bookings/${booking.id}`} className="bg-slate-400 shadow-md rounded-lg p-4 hover:shadow-lg hover:bg-slate-100 transition-all duration-300"	>
            A Booking on {booking.date} starting at {booking.start_time}
          </a>
        </li>
      ))}
    </ul>
  );
};

export default BookingList;