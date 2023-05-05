import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Human from '../assets/human.svg';
import { differenceInCalendarDays } from 'date-fns';
import { ToastContainer, toast } from 'react-toastify';

const PlacePage = () => {
    const [place, setPlace] = useState(null);
    const [showAllPhotos, setShowAllPhotos] = useState(false);
    const [userInfo, setUserInfo] = useState(null);
    const [checkIn, setCheckIn] = useState();
    const [checkOut, setCheckOut] = useState();
    const [maxGuests, setMaxGuests] = useState(1);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const { id } = useParams();

    let numberOfNights = 0;
    if (checkIn && checkOut) {
        numberOfNights = differenceInCalendarDays(new Date(checkOut), new Date(checkIn));
    }

    const bookingFunction = async () => {
        try {
            await axios.post("/booking", { placeId: place._id, checkIn, checkOut, maxGuests, name, phone, totalPrice: Math.floor(numberOfNights * place.price + (numberOfNights * place.price * 10 / 100)) })
            toast.success('Booking Successful', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
                theme: "light",
            });
            setName('');
            setPhone('');
            setCheckIn('');
            setCheckOut('');
            setMaxGuests(1);
        }
        catch (error) {
            toast.error('Error', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
                theme: "light",
            });
        }
    }

    setTimeout(() => {
        const findUser = async () => {
            await axios.get(`/get-user-by/${place.owner}`).then(response => {
                setUserInfo(response.data.name);
            })
        }
        findUser();
    }, 1000);

    useEffect(() => {
        if (!id) {
            return;
        }
        axios.get(`/places/${id}`).then(response => {
            setPlace(response.data);
        })
    }, [id])

    if (!place) return '';

    if (showAllPhotos) {
        return (
            <div className='py-2 px-8'>
                <h2 className='mt-10 text-2xl font-[600]'>{place.title}</h2>
                <div className='grid lg:grid-cols-3 md:grid-cols-3 mt-10 gap-4 m-auto relative'>
                    <button onClick={() => setShowAllPhotos(false)} className='flex gap-2 absolute py-2 px-4 bg-gray-100 top-2 left-2 hover:bg-button hover:text-white duration-500 ease-in-out'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                        Close</button>
                    {place?.photos?.map((photo) => (
                        <img src={'http://localhost:3000/uploads' + photo} className='w-[350px] h-[250px] lg:w-[500px] lg:h-[400px] md:w-[300px] md:h-[200px] aspect-square object-cover m-auto' />
                    ))}
                </div>
            </div>
        )
    }

    return (
        <div className='mt-4 py-4 px-8' key={place._id}>
            <ToastContainer />
            <h1 className='text-2xl font-bold'>{place.title}</h1>
            <div className='flex items-center mt-2'>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 mr-1 fill-yellow-500">
                    <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                </svg>
                <span className='mr-4'>4.96</span>
                <a className='underline font-semibold flex gap-1' target="_blank " href={'https://maps.google.com/?q=' + place.address}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
                    {place.address}</a>
            </div>
            <div className='grid gap-2 grid-cols-[2fr_1fr] mt-4 relative'>
                <div className='h-[600px]'>
                    {place.photos?.[0] && (
                        <img src={'http://localhost:3000/uploads' + place.photos[0]} className='h-[100%] w-[100%] aspect-square object-cover rounded-tl-3xl rounded-bl-3xl' />
                    )}
                </div>
                <div className='h-[600px] '>
                    {place.photos?.[1] && (
                        <img src={'http://localhost:3000/uploads' + place.photos[1]} className='h-[50%] w-[100%] aspect-square object-cover mb-1 rounded-r-3xl' />
                    )}
                    {place.photos?.[2] && (
                        <img src={'http://localhost:3000/uploads' + place.photos[2]} className='h-[50%] w-[100%] aspect-square object-cover rounded-r-3xl' />
                    )}
                </div>
                <button onClick={() => setShowAllPhotos(true)} className='flex gap-2 absolute py-2 px-4 bg-gray-100 bottom-2 right-2 hover:bg-button hover:text-white duration-500 ease-in-out'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                    </svg>
                    Show More</button>
            </div>
            {/* content */}
            <div className='flex mt-10'>
                <div className='w-[70%] p-2'>
                    <h2 className='text-xl font-bold'>Description</h2>
                    <p className='mt-2'>{place.description}</p>
                    <div className='flex items-center justify-start gap-6 mt-4'>
                        <img src={Human} alt="human.svg" className='h-10 w-10' />
                        <div className='flex items-center justify-start gap-2'>
                            <h2 className='text-xl font-bold my-4'>Hosted By</h2>
                            <h2 className='text-l capitalize'>{userInfo ? userInfo : 'airbnb User'}</h2>
                        </div>
                    </div>
                    <div className='flex mt-4'>
                        <h2>Verified</h2>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 mx-2 fill-blue-600">
                            <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                        </svg>
                        <h2>by Airbnb Cover</h2>
                    </div>
                    <div className='border-t border-gray-200 my-4'>
                        <h2 className='text-xl font-bold my-4'>What this place offers</h2>
                        <div className='grid grid-cols-4 gap-4'>
                            {place.perks.map((perk) => (
                                <>
                                    {perk == 'wifi' && (
                                        <div className='flex'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-4">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z" />
                                        </svg>
                                            {perk}</div>
                                    ) || perk == 'pets allowed ' && (
                                        <div className='flex'><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-paw" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round" className='mr-4'>
                                            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                            <path d="M14.7 13.5c-1.1 -2 -1.441 -2.5 -2.7 -2.5c-1.259 0 -1.736 .755 -2.836 2.747c-.942 1.703 -2.846 1.845 -3.321 3.291c-.097 .265 -.145 .677 -.143 .962c0 1.176 .787 2 1.8 2c1.259 0 3 -1 4.5 -1s3.241 1 4.5 1c1.013 0 1.8 -.823 1.8 -2c0 -.285 -.049 -.697 -.146 -.962c-.475 -1.451 -2.512 -1.835 -3.454 -3.538z"></path>
                                            <path d="M20.188 8.082a1.039 1.039 0 0 0 -.406 -.082h-.015c-.735 .012 -1.56 .75 -1.993 1.866c-.519 1.335 -.28 2.7 .538 3.052c.129 .055 .267 .082 .406 .082c.739 0 1.575 -.742 2.011 -1.866c.516 -1.335 .273 -2.7 -.54 -3.052z"></path>
                                            <path d="M9.474 9c.055 0 .109 0 .163 -.011c.944 -.128 1.533 -1.346 1.32 -2.722c-.203 -1.297 -1.047 -2.267 -1.932 -2.267c-.055 0 -.109 0 -.163 .011c-.944 .128 -1.533 1.346 -1.32 2.722c.204 1.293 1.048 2.267 1.933 2.267z"></path>
                                            <path d="M16.456 6.733c.214 -1.376 -.375 -2.594 -1.32 -2.722a1.164 1.164 0 0 0 -.162 -.011c-.885 0 -1.728 .97 -1.93 2.267c-.214 1.376 .375 2.594 1.32 2.722c.054 .007 .108 .011 .162 .011c.885 0 1.73 -.974 1.93 -2.267z"></path>
                                            <path d="M5.69 12.918c.816 -.352 1.054 -1.719 .536 -3.052c-.436 -1.124 -1.271 -1.866 -2.009 -1.866c-.14 0 -.277 .027 -.407 .082c-.816 .352 -1.054 1.719 -.536 3.052c.436 1.124 1.271 1.866 2.009 1.866c.14 0 .277 -.027 .407 -.082z"></path>
                                        </svg>
                                            {perk}</div>
                                    ) || perk == '24x7 electricity' && (
                                        <div className='flex'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-4">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                                        </svg>
                                            {perk}</div>
                                    ) || perk == 'tv' && (
                                        <div className='flex'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-4">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 20.25h12m-7.5-3v3m3-3v3m-10.125-3h17.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125z" />
                                        </svg>
                                            {perk}</div>
                                    )
                                        || perk == 'private entrance' && (
                                            <div className='flex'>
                                                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-circle-key-filled" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" stroke-linecap="round" strokeLinejoin="round" className='w-6 h-6 mr-4'>
                                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                                    <path d="M12 2c5.523 0 10 4.477 10 10a10 10 0 0 1 -20 0c0 -5.523 4.477 -10 10 -10zm2 5a3 3 0 0 0 -2.98 2.65l-.015 .174l-.005 .176l.005 .176c.019 .319 .087 .624 .197 .908l.09 .209l-3.5 3.5l-.082 .094a1 1 0 0 0 0 1.226l.083 .094l1.5 1.5l.094 .083a1 1 0 0 0 1.226 0l.094 -.083l.083 -.094a1 1 0 0 0 0 -1.226l-.083 -.094l-.792 -.793l.585 -.585l.793 .792l.094 .083a1 1 0 0 0 1.403 -1.403l-.083 -.094l-.792 -.793l.792 -.792a3 3 0 1 0 1.293 -5.708zm0 2a1 1 0 1 1 0 2a1 1 0 0 1 0 -2z" strokeWidth="0" fill="currentColor"></path>
                                                </svg>
                                                {perk}
                                            </div>
                                        )
                                        || perk == 'free parking spot' && (
                                            <div className='flex'>
                                                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-parking" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round" className='w-6 h-6 mr-4'>
                                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                                    <path d="M3 3m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z"></path>
                                                    <path d="M9 16v-8h4a2 2 0 0 1 0 4h-4"></path>
                                                </svg>
                                                {perk}
                                            </div>
                                        )
                                    }
                                </>
                            ))}
                        </div>
                    </div>
                    <div className='border-t border-gray-200 my-4'>
                        <div className='grid gap-2'>
                            <h2 className='text-xl font-bold my-4'>Rules</h2>
                            <p className='text-l'>Check In : {place.checkIn} PM</p>
                            <p className='text-l'>Check Out : {place.checkOut} AM</p>
                            <p className='text-l'>Max Guests : {place.maxGuests}</p>
                        </div>
                    </div>
                    <div className='border-t border-gray-200 my-4'>
                        <h2 className='text-xl font-bold my-4'>Extra Info</h2>
                        <p>{place.extraInfo}</p>
                    </div>
                    <div className='border-t border-gray-200 my-4'>
                        <h2 className='text-3xl font-bold my-4'><span className='text-button'>air</span><span className='text-black'>cover</span></h2>
                        <div className='grid grid-cols-2 gap-6'>
                            <div>
                                <h2 className='text-l font-bold my-2'>Booking Protection Guarantee</h2>
                                <p>In the unlikely event that a Host needs to cancel your booking within 30 days of check-in, we’ll find you a similar or better home or we’ll refund you.</p>
                            </div>
                            <div>
                                <h2 className='text-l font-bold my-2'>Check-In Guarantee</h2>
                                <p>If you can’t check into your home and the Host cannot resolve the issue, we’ll find you a similar or better home for the length of your original stay or we’ll refund you.</p>
                            </div>
                            <div>
                                <h2 className='text-l font-bold my-2'>Get-What-You-Booked Guarantee</h2>
                                <p>If at any time during your stay you find your listing isn't as advertised – for example, the refrigerator stops working and your Host can’t easily fix it, or it has fewer bedrooms than listed – you'll have three days to report it and we’ll find you a similar or better home, or we’ll refund you.</p>
                            </div>
                            <div>
                                <h2 className='text-l font-bold my-2'>24-hour Safety Line</h2>
                                <p>If you ever feel unsafe, you’ll get priority access to specially trained safety agents, day or night.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex items-start justify-center flex-col px-8 shadow-xl rounded-2xl w-[30%] h-[50%] mt-40 sticky top-20 border'>
                    <div className='my-4 flex justify-between items-center w-full'>
                        <span className='font-bold text-2xl mr-2'>₹{place.price}<span className='font-[400]'>/night</span></span>
                        <div className='flex items-center justify-center'>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 mr-1 fill-yellow-500">
                                <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                            </svg>
                            <span className='mr-4'>4.96</span>
                        </div>
                    </div>
                    <div className='my-2 py-2 flex justify-between items-center w-full border px-2 rounded-xl'>
                        <div className='flex flex-col'>
                            <label className='font-bold'>Check In : </label>
                            <input type="date" name="" id="" className='bg-transparent outline-none' value={checkIn} onChange={(e) => setCheckIn(e.target.value)} />
                        </div>
                        <div className='flex flex-col'>
                            <label className='font-bold'>Check Out : </label>
                            <input type="date" name="" id="" className='bg-transparent outline-none' value={checkOut} onChange={(e) => setCheckOut(e.target.value)} />
                        </div>
                    </div>
                    <div className='my-2 flex flex-col w-full px-2 rounded-xl'>
                        <label className='font-bold'>Number of guests</label>
                        <input type="number" value={maxGuests} className='bg-transparent outline-none' onChange={(e) => setMaxGuests(e.target.value)} />
                    </div>
                    {
                        numberOfNights > 0 && (
                            <>
                                <div className='my-2 flex flex-col w-full px-2 rounded-xl'>
                                    <label className='font-bold'>Full Name</label>
                                    <input type="text" value={name} className='bg-transparent outline-none' onChange={(e) => setName(e.target.value)} />
                                </div>
                                <div className='my-2 flex flex-col w-full px-2 rounded-xl'>
                                    <label className='font-bold'>Phone Number</label>
                                    <div className='flex justify-center items-center'>
                                        <input type="text" value={phone} className='bg-transparent outline-none mr-2' onChange={(e) => setPhone(e.target.value)} />
                                        {phone.length == 10 && (
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round" className='w-6 h-6 fill-green-500'>
                                                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                                <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"></path>
                                                <path d="M9 12l2 2l4 -4"></path>
                                            </svg>
                                        )}
                                    </div>
                                    {phone.length > 10 && (
                                        <span className='text-red-400'>Phone number can not be more than 10 digits</span>
                                    )}
                                </div>
                            </>
                        )
                    }
                    <div className='my-4 px-4 py-2 bg-button w-full flex items-center justify-center rounded-2xl text-white hover:opacity-[0.9] ease-in-out duration-300 cursor-pointer'>
                        <button onClick={bookingFunction}>Book this place</button>
                    </div>
                    <div className='flex flex-col w-full px-2 justify-center items-center gap-4'>
                        <span>You won't be charged yet</span>
                        <div className='w-full flex justify-between items-center'>
                            <span>₹ {place.price} X {numberOfNights}</span>
                            {numberOfNights >= 0 && (
                                <span className='mx-2'>
                                    ₹ {numberOfNights * place.price}
                                </span>
                            )}
                        </div>
                        <div className='border-b w-full border-gray-200'></div>
                        <div className='w-full flex justify-between items-center my-4'>
                            <span className='font-bold text-l'>Total Including taxes</span>
                            {numberOfNights >= 0 && (
                                <span className='mx-2 font-bold text-l'>
                                    ₹ {Math.floor(numberOfNights * place.price + (numberOfNights * place.price * 10 / 100))}
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PlacePage