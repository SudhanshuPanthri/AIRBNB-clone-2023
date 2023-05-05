import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Illustration from '../assets/illustration.svg';

const RegisterPage = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    // const [redirect, setRedirect] = useState(false);

    const registerUser = async (e) => {
        e.preventDefault();
        toast.info('Creating Account', {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
            theme: "light",
        });
        try {
            await axios.post('/register', {
                name,
                email,
                password
            })
            setTimeout(() => {
                toast.success('Account Created, Please Login', {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                    progress: undefined,
                    theme: "light",
                });
            }, 3000)
            setEmail('');
            setName('');
            setPassword('');
        }
        catch (e) {
            setTimeout(() => {
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
            }, 3000)
        }
    }

    // if (redirect) {
    //     return <Navigate to={'/'} />
    // }

    return (
        <div className="lg:flex h-full w-full justify-center items-center">
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
            <ToastContainer />
            <div className="h-[90vh] w-[50%] lg:flex justify-center items-center sm:hidden">
                <img src={Illustration} alt="building-svg" className="w-[70%] h-[70%] " />
            </div>
            <div className="w-[50%] h-[90vh] flex justify-center items-center">
                <form action="" className="max-w-md mx-auto" onSubmit={registerUser}>
                    <h1 className="text-4xl text-center mb-4">Register</h1>
                    <input type="text" placeholder="your name" value={name} onChange={(e) => setName(e.target.value)} />
                    <input type="email" placeholder="your@email.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <button className="py-2 px-4 border bg-[#F5385D] text-white w-full rounded-xl mt-2">Register</button>
                    <div className="text-center py-2">
                        <span className="mx-2">Already have an account ?</span>
                        <span className="font-bold cursor-pointer"><Link to={'/login'}>Login Now</Link></span>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default RegisterPage;