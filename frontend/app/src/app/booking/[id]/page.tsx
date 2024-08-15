interface BookingPageProps {
	doctorName: string;
	service: string;
	endTime: string;
}

const BookingPage: React.FC<BookingPageProps> = ({ doctorName, service, endTime }) => {
	const handleBack = () => {
		// go back
	};

	return (
		<div>
			<h1>This Booking is with {doctorName} For {service} and it ends on {endTime}</h1>
			<button onClick={handleBack}>Back</button>
		</div>
	);
};

export default BookingPage;