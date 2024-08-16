"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface FormData {
    service: string;
    doctor_name: string;
    start_time: string;
    end_time: string;
    date: string;
};

const BookingsPage = () => {
    const [formData, setFormData] = useState<FormData>({
        service: '',
        doctor_name: '',
        start_time: '',
        end_time: '',
        date: '',
    });

    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await fetch('http://host.docker.internal:5000/api/bookings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                setError(errorData.message);
                throw new Error(errorData.message || 'Error inserting booking');
            }

            setSuccess('Booking inserted successfully');
            setError(null);
            router.push('/');
        } catch (err) {
            setError(err.message || 'Error inserting booking');
            setSuccess(null);
        }
    };


    return (
        <div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}

            <h1>Make a Booking</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="service">Service:</label>
                    <input
                        type="text"
                        id="service"
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="doctor_name">Doctor&apos;s Name:</label>
                    <input
                        type="text"
                        id="doctor_name"
                        name="doctor_name"
                        value={formData.doctor_name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="start_time">Start Time:</label>
                    <input
                        type="time"
                        id="start_time"
                        name="start_time"
                        value={formData.start_time}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="end_time">End Time:</label>
                    <input
                        type="time"
                        id="end_time"
                        name="end_time"
                        value={formData.end_time}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="date">Date:</label>
                    <input
                        type="date"
                        id="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default BookingsPage;
