import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { differenceInCalendarDays, format } from 'date-fns';
import { useNavigate } from 'react-router-dom';

const BookingsPage = () => {
    const [bookingData, setBookingData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('/bookings').then(response => {
            setBookingData(response.data);
        })
    }, [])


    return (
        <div className='py-6 px-10'>
            <button className='flex border py-2 px-4 my-4 rounded-2xl' onClick={() => navigate(-1)}><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-chevron-left" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M15 6l-6 6l6 6"></path>
            </svg><span>Go Back</span></button>
            <h1 className='my-6 text-3xl font-bold'>Your Bookings</h1>
            {bookingData?.length > 0 && bookingData.map((booking) => (
                <div className='w-full border flex gap-4 rounded-2xl cursor-pointer my-4' key={booking._id} onClick={() => <Navigate to={'/bookings/:id'} />}>
                    <div className='w-[20%] h-full'>
                        <img src={'http://localhost:3000/uploads' + booking.placeId.photos[0]} className='w-[100%] h-full aspect-square object-cover m-auto rounded-tl-2xl rounded-bl-2xl' />
                    </div>
                    <div className='w-[60%] py-2'>
                        <h2 className='font-bold text-xl border-b border-black py-2'>{booking.placeId.title}</h2>
                        <div className='flex justify-start items-center gap-2 my-2'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75" />
                            </svg>
                            <h3 className='my-2'>Booking : {format(new Date(booking.checkIn), 'dd-mm-yyyy')}  -  {format(new Date(booking.checkOut), 'dd-mm-yyyy')}</h3>
                        </div>
                        <div className='flex items-center justify-start gap-2 my-2'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
                            </svg>
                            <h3 className='my-2'>Number of nights : {differenceInCalendarDays(new Date(booking.checkOut), new Date(booking.checkIn))}</h3>
                        </div>
                        <div className='flex items-center justify-start gap-2 bg-button w-2/4 py-2 text-white rounded-xl'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mx-1">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 8.25H9m6 3H9m3 6l-3-3h1.5a3 3 0 100-6M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <h3>Total Price : ₹ {booking.totalPrice}</h3>
                        </div>
                    </div>
                    <div className='w-[20%] flex flex-col justify-center items-center'>
                        <h2>Status : Confirmed</h2>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default BookingsPage