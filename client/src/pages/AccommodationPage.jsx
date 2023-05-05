import React, { useState, useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import Illustration1 from '../assets/illustration1.svg'

const AccommodationPage = () => {
    const [title, setTitle] = useState("");
    const [address, setAddress] = useState("");
    const [state, setState] = useState("");
    const [photos, setPhotos] = useState([]);
    const [photoLink, setPhotoLink] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [perks, setPerks] = useState([]);
    const [extraInfo, setExtraInfo] = useState("");
    const [checkIn, setCheckIn] = useState("")
    const [checkOut, setCheckOut] = useState("");
    const [maxGuests, setMaxGuests] = useState(1);
    const [price, setPrice] = useState(1000);
    const [redirect, setRedirect] = useState("")
    const [places, setPlaces] = useState([]);

    const { action } = useParams();

    const options = [
        "Amazing Views",
        "OMG!",
        "Farms",
        "Private rooms",
        "Countryside",
        "Design",
        "Beach",
        "Historical Homes"
    ];
    const uploadByLink = async (e) => {
        e.preventDefault();
        const { data: fileName } = await axios.post("/upload-by-link", { link: photoLink });
        setPhotos(prev => {
            return [...prev, fileName]
        })
        setPhotoLink('');
    }

    const uploadPhoto = (e) => {
        const files = e.target.files;
        const data = new FormData();
        for (let i = 0; i < files.length; i++) {
            data.append('photos', files[i])
        }
        axios.post('/upload', data, {
            headers: { 'Content-type': 'multipart/form-data' }
        }).then(res => {
            const { data: fileName } = res;
            setPhotos(prev => {
                return [...prev, fileName]
            })
        })
    }

    const handlePerks = (e) => {
        const { checked, name } = e.target;
        if (checked) {
            setPerks([...perks, name]);
        }
        else {
            setPerks([...perks].filter(selectedName => selectedName != name));
        }
    }
    console.log(state);

    const addNewPlace = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/accomodations', { title, address, state, photos, description, category, perks, extraInfo, checkIn, checkOut, maxGuests, price });
            toast.success('Place ⛰️ added Successfully', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
                theme: "light",
            });
            setTimeout(() => {
                setRedirect('/account/');
            }, 4000);
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


    const deletePlaces = async (id) => {
        try {
            await axios.post("/delete", { id });
            toast.success('Place ❌ deleted Successfully, Refreshing', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
                theme: "light",
            });
            setTimeout(() => {
                setRedirect('/account/');
            }, 4000);
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
    console.log(category);

    useEffect(() => {
        axios.get('/user-accommodations').then(({ data }) => {
            setPlaces(data);
        });
    }, [])
    // console.log(places[0])
    if (redirect) {
        return <Navigate to={redirect} />
    }

    return (
        <div className="py-4 px-8">
            {action !== 'new' && (
                <>
                    <ToastContainer
                        position="top-right"
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="light"
                    />
                    <div className="mt-10 flex gap-6 items-center justify-center">
                        <Link to={'/account/accommodations/new'} className="bg-button text-white py-2 px-6 rounded-full inline-flex gap-1">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                            Add new place
                        </Link>
                    </div>
                    <div className="mt-8">
                        {places.length > 0 && places.map((place) => (
                            <div className="bg-gray-100 p-4 border rounded-2xl m-4 flex gap-2" key={place._id}>
                                <div className="flex w-32 h-32 bg-gray-300 shrink-0 mr-4">
                                    {place.photos.length > 0 && (
                                        <img src={'http://localhost:3000/uploads/' + place.photos[0]} alt={place.id} className="object-cover w-[100%] h-[100%] aspect-square" />
                                    )}
                                </div>
                                <div className="w-full">
                                    <h2 className="text-lg cursor-pointer font-bold">{place.title}</h2>
                                    <p className="text-sm mt-2">{place.description}</p>
                                </div>
                                <div className="flex items-center ml-6">
                                    <button onClick={() => deletePlaces(place._id)} className="rounded-full bg-green-500 p-3 hover:bg-button text-white ease-out duration-300">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        ))}
                        {places.length == 0 && (
                            <div className="flex justify-center items-center flex-col">
                                <img src={Illustration1} alt="illustration" className="h-[30%] w-[30%] my-6" />
                                <h2 className="font-bold text-2xl">No accommodation hosted</h2>
                            </div>
                        )}
                    </div>
                </>
            )}
            {action === 'new' && (
                <div>
                    <ToastContainer
                        position="top-right"
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="light"
                    />
                    <form onSubmit={addNewPlace}>
                        <h2 className="text-2xl mt-4">Title</h2>
                        <p className="text-gray-500 text-sm">Title for your place should be compact and catchy as in advertisement</p>
                        <input type="text" placeholder="title, for example: My Beautiful Apartment" value={title} onChange={(e) => setTitle(e.target.value)} />
                        <h2 className="text-2xl mt-4">Address</h2>
                        <p className="text-gray-500 text-sm">Address to this place</p>
                        <input type="text" placeholder="address" value={address} onChange={(e) => setAddress(e.target.value)} />
                        <h2 className="text-2xl mt-4">State of Accommodation</h2>
                        <input type="text" placeholder="just to filter out your place better" value={state} onChange={(e) => setState(e.target.value.toLowerCase())} />
                        <h2 className="text-2xl mt-4">Photos</h2>
                        <p className="text-gray-500 text-sm">more = better</p>
                        <div className="flex gap-4">
                            <input type="text" placeholder="Got a link add your images by it.." className="outline-none " value={photoLink} onChange={(e) => setPhotoLink(e.target.value)} />
                            <button className="bg-gray-200 rounded-2xl px-4 w-[8%] sm:w-[20%] hover:bg-button ease-in-out duration-300 hover:text-white" onClick={(e) => uploadByLink(e)}>Add photo</button>
                        </div>
                        <div className="mt-2 grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                            {photos.length > 0 && photos.map(item => (
                                <div className="h-32 flex" key={item}>
                                    <img className="rounded-2xl w-full object-cover" src={"http://localhost:3000/uploads" + item} alt="" />
                                </div>
                            ))}
                            <label className="h-32 border bg-transparent rounded-2xl p-2 text-2xl flex justify-center items-center cursor-pointer">
                                <input type="file" className="hidden" multiple onChange={(e) => uploadPhoto(e)} />
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 mr-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                                </svg>
                                Upload </label>
                        </div>
                        <div>(currently this method is not working please add images through link)</div>
                        <h2 className="text-2xl mt-4">Description</h2>
                        <p className="text-gray-500 text-sm">Description of the place</p>
                        <textarea className="border w-full my-1 py-2 px-3 rounded-2xl outline-none h-20" value={description} onChange={(e) => setDescription(e.target.value)} />
                        <h2 className="text-2xl my-4">Category</h2>
                        <Dropdown options={options} value={category} placeholder="Select an category for your estate" onChange={(value) => setCategory(value.value)} />
                        <h2 className="text-2xl mt-4">Perks</h2>
                        <p className="text-gray-500 text-sm">Select all the perks of your place</p>
                        <div className="grid gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
                            <label className="flex gap-2 border p-4 items-center">
                                <input type="checkbox" name="wifi" onChange={handlePerks} />
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z" />
                                </svg>
                                <span>Wifi</span>
                            </label>
                            <label className="flex gap-2 border p-4">
                                <input type="checkbox" name="pets allowed " onChange={handlePerks} />
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
                                </svg>
                                <span>Pets Allowed</span>
                            </label>
                            <label className="flex gap-2 border p-4">
                                <input type="checkbox" name="free parking spot" onChange={handlePerks} />
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                                </svg>
                                <span>Free parking spot</span>
                            </label>
                            <label className="flex gap-2 border p-4">
                                <input type="checkbox" name="private entrance" onChange={handlePerks} />
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                                </svg>
                                <span>Private entrance</span>
                            </label>
                            <label className="flex gap-2 border p-4">
                                <input type="checkbox" name="tv" onChange={handlePerks} />
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 20.25h12m-7.5-3v3m3-3v3m-10.125-3h17.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125z" />
                                </svg>
                                <span>TV</span>
                            </label>
                            <label className="flex gap-2 border p-4">
                                <input type="checkbox" name="24x7 electricity" onChange={handlePerks} />
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                                </svg>
                                <span>24x7 Electricity</span>
                            </label>
                        </div>
                        <h2 className="text-2xl mt-4">Extra info</h2>
                        <p className="text-gray-500 text-sm">House rules, etc.</p>
                        <textarea className="border w-full my-1 py-2 px-3 rounded-2xl outline-none h-20" value={extraInfo} onChange={(e) => setExtraInfo(e.target.value)} />
                        <h2 className="text-2xl mt-4">Check In & Out times</h2>
                        <p className="text-gray-500 text-sm">add check in and out times</p>
                        <div className="grid sm:grid-cols-4 gap-4">
                            <div>
                                <h3>Check in time</h3>
                                <input type="text" placeholder="6:00" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} />
                            </div>
                            <div>
                                <h3>Check out time</h3>
                                <input type="text" placeholder="8:00" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} />
                            </div>
                            <div>
                                <h3>Max guests</h3>
                                <input type="number" value={maxGuests} onChange={(e) => setMaxGuests(e.target.value)} />
                            </div>
                            <div>
                                <h3>{`Price per night (in ₹)`}</h3>
                                <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
                            </div>
                        </div>
                        <div className="w-full flex justify-center items-center mt-6">
                            <button className="w-2/5 p-2 bg-button cursor-pointer text-white rounded-2xl hover:bg-[#f5385ed7] ease-in-out duration-300 ">Save</button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    )
}

export default AccommodationPage;