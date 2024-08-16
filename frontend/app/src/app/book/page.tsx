"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import FormInput from '@/components/FormInput';

interface FormData {
    service: string;
    doctor_name: string;
    start_time: string;
    end_time: string;
    date: string;
};

const BookingsPage = () => {
    const router = useRouter();

    const [formData, setFormData] = useState<FormData>({
        service: '',
        doctor_name: '',
        start_time: '',
        end_time: '',
        date: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleBack = () => {
		router.back();
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
        <div className="h-[90vh] w-[100%] flex flex-col items-center justify-center p-4">
            <h1 className='text-2xl my-4'>Make a Booking</h1>
            <form onSubmit={handleSubmit} className='min-w-min space-y-2 flex flex-col items-center'>
                <FormInput
                    type="text"
                    name="service"
                    text="Service: "
                    value={formData.service}
                    onChange={handleChange}
                />
                <FormInput
                    type="text"
                    name="doctor_name"
                    text="Doctor's Name: "
                    value={formData.doctor_name}
                    onChange={handleChange}
                />
                <FormInput
                    type="time"
                    name="start_time"
                    text="Start Time: "
                    value={formData.start_time}
                    onChange={handleChange}
                />
                <FormInput
                    type="time"
                    name="end_time"
                    text="End Time: "
                    value={formData.end_time}
                    onChange={handleChange}
                />
                <FormInput
                    type="date"
                    name="date"
                    text="Date: "
                    value={formData.date}
                    onChange={handleChange}
                />
                <button type="submit" className='bg-green-900 text-white py-2 px-6 rounded-sm w-fit hover:bg-green-800 cursor-pointer transition-all duration-150'>Submit</button>
            </form>

            <button onClick={handleBack} className="fixed top-12 left-24 bg-blue-950 text-white p-4 rounded hover:bg-blue-900 cursor-pointer">
                Go Back
            </button>
        </div>
    );
};

export default BookingsPage;
