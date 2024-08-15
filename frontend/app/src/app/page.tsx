import BookingList from '../components/BookingList';

async function getBooking() {
	const response = await fetch(`http://host.docker.internal:5000/api/bookings/2`, { cache: 'no-store'});
	console.log("TESTING ")
	if (!response.ok) {
		throw new Error('Failed to fetch booking');
	}

	const data = await response.json();
	return data;
}

async function getBookings() {
	const res = await fetch('http://host.docker.internal:5000/api/bookings', { cache: 'no-store', mode: 'no-cors' })

	if (!res.ok) {
		throw new Error('Failed to fetch data')
	}

	return res.json()
}

const Home: React.FC = async () => {
	const bookings = await getBookings()

	const book = await getBooking();
	console.log("eello ", book);

	return (
		<div className='h-[90vh] w-[100%] flex items-center justify-center'>
			<BookingList bookings={bookings} />
		</div>
	);
};

export default Home;
