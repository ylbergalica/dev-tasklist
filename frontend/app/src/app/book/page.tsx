"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
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
                toast.error(errorData.message || 'Error inserting booking');
                throw new Error(errorData.message || 'Error inserting booking');
            }

            toast.success('Booking inserted successfully');
            router.push('/');
        } catch (err) {
            toast.error(err.message || 'Error inserting booking');
        }
    };

    return (
        <div className="h-[90vh] w-[100%] flex items-center justify-center p-4">
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
