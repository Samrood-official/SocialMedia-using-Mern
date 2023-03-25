import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import axios from '../../utils/axios'
import { setLogin } from '../../state/userReducer'
import toast, { Toaster } from 'react-hot-toast';
import { loginPost } from '../../utils/constants'
const Login = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = (e) => {
        e.preventDefault()
        axios.post(loginPost, { email, password }, {
            headers: { "Content-Type": "application/json" },
        }).then((userData) => {
            console.log("userData");
            console.log(userData);
            dispatch(setLogin(userData.data))
        }).catch((err) => {
            ((error) => {
                console.log(err);
                toast.error(error.response.data.msg, {
                    position: "top-center",
                });
            })(err);
        })
    }
    return (
        <div className="flex min-h-full items-center justify-center py-32 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8 ">
                <div>
                    <img className="mx-auto h-12 w-auto" src="https://st2.depositphotos.com/4398873/9839/i/600/depositphotos_98397934-stock-photo-triangle-geometric-knot-outline-logo.jpg" alt="Your Company" />
                    <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Sign in to Social Media</h2>

                </div>
                <form className="mt-8 space-y-6" onSubmit={(e) => handleLogin(e)}>

                    <div className="-space-y-px rounded-md shadow-sm">
                        <div>
                            <label htmlFor="email-address" className="sr-only">Email address</label>
                            <input onChange={(e) => setEmail(e.target.value)} id="email-address" name="email" type="email" required className=" pl-3 relative block w-full rounded-t-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-0 sm:text-sm " placeholder="Email address" />
                        </div>
                        <div className='pt-5'>
                            <label htmlFor="password" className="sr-only">Password</label>
                            <input onChange={(e) => setPassword(e.target.value)} id="password" name="password" type="password" required className="pl-3 relative block w-full rounded-b-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-0 sm:text-sm sm:leading-6" placeholder="Password" />
                        </div>
                    </div>

                    <div className="flex items-center justify-center">
                        <div className="text-sm justify-between flex ">
                            <Link to='/register'>
                                <p className="text-sm px-10">Create new Account ?</p>
                            </Link>
                            <p onClick={()=>navigate('/forgottPassword')} className="font-medium px-10 cursor-pointer text-slate-900 hover:text-indigo-500">Forgot your password?</p>
                        </div>
                    </div>

                    <div>
                        <button type='submit' className="group relative flex w-full justify-center rounded-md bg-slate-800 py-2 px-3 text-sm font-semibold text-white hover:bg-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                <svg className="h-5 w-5 group-hover:text-indigo-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" />
                                </svg>
                            </span>
                            Sign in
                        </button>
                        <Toaster />
                    </div>
                </form>
            </div>
        </div>
    )
}
export default Login
