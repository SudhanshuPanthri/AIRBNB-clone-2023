import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import Footer from '../components/Footer';
import categoryJSON from '../../categoryJSON';

const HomePage = () => {
    const [places, setPlaces] = useState([]);
    const [categoryData, setCategoryData] = useState('');
    const [input, setInput] = useState('');

    const searchByInput = async () => {
        await axios.get(`/get-places-by/${input}`).then(response => {
            setPlaces([...response.data]);
        })
    }

    useEffect(() => {
        axios.get('/get-places').then(response => {
            setPlaces([...response.data]);
        })
    }, [])

    useEffect(() => {
        axios.get(`/get-places/${categoryData}`).then(response => {
            setPlaces([...response.data]);
        })
    }, [categoryData])
    return (
        <>
            <div className='border py-4 px-8 shadow-sm flex justify-evenly'>
                {categoryJSON.map((category) => (
                    <div key={category.id} className='flex flex-col items-center justify-center cursor-pointer text-black hover:text-button' onClick={() => {
                        setCategoryData(category.name)
                    }}>
                        <img src={category.pngLink} alt={category.id} className='w-6 h-6 mx-2' />
                        <h2>{category.name}</h2>
                    </div>
                ))}
            </div>
            <div className='flex justify-center items-center my-6'>
                <div className='flex gap-2 items-center border border-gray-300 rounded-full justify-between w-[35%]'>
                    <input type="text" placeholder='Search By State' className='border-none outline-none py-2 px-4 mx-2' value={input} onChange={(e) => setInput(e.target.value)} />
                    <button className='bg-button text-white p-1 rounded-full mx-4' onClick={searchByInput}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                    </svg>
                    </button>
                </div>
            </div>
            <div className='mt-10 grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 py-4 px-8'>
                {places.length > 0 && places.map((place) => (
                    <Link key={place._id} to={'/place/' + place._id} className='w-[95%]'>
                        <div className='rounded-2xl flex mb-2'>
                            {place.photos?.[0] && (
                                <img src={'http://localhost:3000/uploads/' + place.photos?.[0]} className='rounded-2xl object-cover aspect-square' />
                            )}
                        </div>
                        <div className='px-2'>
                            <h2 className='font-bold'>{place.address}</h2>
                            <h3 className='text-sm truncate text-gray-500'>{place.title}</h3>
                            <span className='font-bold mr-2'>₹ {place.price}</span>night
                        </div>
                    </Link>
                ))}
            </div>
            {places.length == 0 && (
                <div className='flex gap-4 flex-col items-center justify-center w-full'>
                    <svg xmlns="http://www.w3.org/2000/svg" className='w-20 h-20' viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                        <path d="M4 8v-2a2 2 0 0 1 2 -2h2"></path>
                        <path d="M4 16v2a2 2 0 0 0 2 2h2"></path>
                        <path d="M16 4h2a2 2 0 0 1 2 2v2"></path>
                        <path d="M16 20h2a2 2 0 0 0 2 -2v-2"></path>
                        <path d="M9 10h.01"></path>
                        <path d="M15 10h.01"></path>
                        <path d="M9.5 15.05a3.5 3.5 0 0 1 5 0"></path>
                    </svg>
                    <h2 className='text-3xl font-bold'>Sorry! No result for this query</h2>
                </div>
            )}
            <Footer />
        </>
    )
}

export default HomePage;