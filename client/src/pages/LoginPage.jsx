import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { UserContext } from "../UserContext";
import Building from '../assets/building.svg';

const LoginPage = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false)
    const { setUser } = useContext(UserContext);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post("/login", {
                email, password
            }, { withCredentials: true })
            setUser(data);
            toast.success('Login Successful', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
                theme: "light",
            });
            setRedirect(true);
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

    if (redirect) {
        return <Navigate to='/' />
    }
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
            {/* <ToastContainer /> */}
            <div className="h-[90vh] w-[50%] lg:flex justify-center items-center sm:hidden">
                <img src={Building} alt="building-svg" className="w-[70%] h-[70%] " />
            </div>
            <div className="w-[50%] h-[90vh] flex justify-center items-center">
                <form action="" className="max-w-md mx-auto" onSubmit={handleLogin}>
                    <h1 className="text-4xl text-center mb-4">Login</h1>
                    <input type="email" placeholder="your@email.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <button className="py-2 px-4 border bg-[#F5385D] text-white w-full rounded-xl mt-2">Login</button>
                    <div className="text-center py-2">
                        <span className="mx-2">Don't have an account ?</span>
                        <span className="font-bold cursor-pointer"><Link to={'/register'}>Register Now</Link></span>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default LoginPage;