import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'


const SingleBookingPage = () => {
    const [booking, setBooking] = useState(null);
    const { id } = useParams;

    useEffect(() => {
        if (id) {
            axios.get('/bookings').then(response => {
                console.log(response.data);
                setBooking(response.data.find((_id) => _id === id));
            })
        }
    }, [id])

    console.log(booking);

    return (
        <div>SingleBookingPage {id}</div>
    )
}

export default SingleBookingPage