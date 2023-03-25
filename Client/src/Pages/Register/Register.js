import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from '../../utils/axios'
import { setLogin } from "../../state/userReducer";
import { toast, Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import * as yup from 'yup'
import { signupPost } from "../../utils/constants";

const initialValues = {
    email: '',
    userName: '',
    phoneNumber: '',
    password: '',
    confirm_password: ''
}
const Register = () => {
    const navigate = useNavigate()
    const SignUpSchema = yup.object({
        email: yup.string().email().required("Email Required"),
        userName: yup.string().min(2).max(20).required('please enter your username '),
        phoneNumber: yup.string().matches(/^\d{10}$/, 'Invalid phone number').required('Phone is required'),
        password: yup.string().min(4).required('please Enter password'),
        confirm_password: yup.string().required().oneOf([yup.ref("password"), null], 'password must match')
    })

    const dispatch = useDispatch()
    const { handleBlur, handleChange, handleSubmit, values, errors, touched } = useFormik({
        initialValues: initialValues,
        validationSchema: SignUpSchema,
        onSubmit: (values, action) => {
           
            handleSignUp(values)
            action.resetForm()
        }
    })
    // console.log(touched);
    // console.log(errors);
    let handleSignUp = (user) => {
        console.log(user);
        axios.post(signupPost, user).then((response) => {
            const savedUser = response.data
            console.log("savedUser");
            console.log(savedUser);
            if(savedUser?.status === 'pending'){
                navigate(`/verifyEmail/${savedUser.user}`)
            }
            // else{
            //     navigate('/')
            // }
            // dispatch(setLogin(response.data))
            // navigate('/login')
        }).catch((err) => {
            ((error) => {
                toast.error(error.response.data.msg, {
                    position: "top-center",
                });
            })(err);
        })
    }
    return (
        <div class="flex min-h-full items-center justify-center py-20 px-4 sm:px-6 lg:px-8">
            <div class="w-full max-w-md space-y-8 ">
                <div>
                    <img class="mx-auto h-12 w-auto" src="https://st2.depositphotos.com/4398873/9839/i/600/depositphotos_98397934-stock-photo-triangle-geometric-knot-outline-logo.jpg" alt="Your Company" />
                    <h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Sign Up to Social Media</h2>

                </div>
                <form class="mt-8 space-y-6" onSubmit={handleSubmit}>
                    {/* <input type="hidden" name="remember" value="true"/> */}
                    <div class="-space-y-px rounded-md shadow-sm">
                        <div>
                            <label for="userName" class="sr-only">User Name</label>

                            <input onChange={handleChange} onClick={handleBlur} value={values.userName} id="userName" name="userName" type="text" autocomplete="off" class=" pl-3 relative block w-full rounded-t-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-0 sm:text-sm " placeholder="user Name" />
                            {errors.userName && touched.userName ?
                                <p className="text-red-600">{errors.userName}</p> : null
                            }
                        </div>
                        <div className='pt-5'>
                            <label htmlFor="email" class="sr-only">email</label>
                            <input onChange={handleChange} onClick={handleBlur} value={values.email} id="email" name="email" type="email" autocomplete="off" class="pl-3 relative block w-full rounded-b-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-0 sm:text-sm sm:leading-6" placeholder="email" />
                            {errors.email && touched.email ?
                                <p className="text-red-600">{errors.email}</p> : null
                            }
                        </div>
                        <div className='pt-5'>
                            <label htmlFor="phoneNumber" class="sr-only"></label>
                            <input onChange={handleChange} onClick={handleBlur} value={values.phoneNumber} id="phoneNumber" name="phoneNumber" type="number" autocomplete="off" class="pl-3 relative block w-full rounded-b-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-0 sm:text-sm sm:leading-6" placeholder="Phone Number" />
                            {errors.phoneNumber && touched.phoneNumber ?
                                <p className="text-red-600">{errors.phoneNumber}</p> : null
                            }
                        </div>
                        <div className='pt-5'>
                            <label htmlFor="password" class="sr-only">Password</label>
                            <input onChange={handleChange} onClick={handleBlur} value={values.password} id="password" name="password" type="password" autocomplete="off" class="pl-3 relative block w-full rounded-b-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-0 sm:text-sm sm:leading-6" placeholder="Password" />
                            {errors.password && touched.password ?
                                <p className="text-red-600">{errors.password}</p> : null
                            }
                        </div>
                        <div className='pt-5'>
                            <label htmlFor="confirm_password" class="sr-only">confirm Password</label>
                            <input onChange={handleChange} onClick={handleBlur} value={values.confirm_password} id="confirm_password" name="confirm_password" type="password" autocomplete="off" class="pl-3 relative block w-full rounded-b-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-0 sm:text-sm sm:leading-6" placeholder="Cofirm Password" />
                            {errors.confirm_password && touched.confirm_password ?
                                <p className="text-red-600">{errors.confirm_password}</p> : null
                            }
                        </div>
                    </div>

                    <div class="flex items-center justify-center">
                        <div class="text-sm justify-between flex ">
                            <Link to='/login'>
                                <p className="text-sm px-10">Already have Account ?</p>
                            </Link>
                        </div>
                    </div>

                    <div>
                        <button type="submit" class="group relative flex w-full justify-center rounded-md bg-slate-900 py-2 px-3 text-sm font-semibold  ">
                            Sign Up
                        </button>
                        <Toaster />
                    </div>
                </form>
            </div>
        </div>

        // <div class="flex min-h-full items-center justify-center py-32 px-4 sm:px-6 lg:px-8">
        //     <div class="w-full max-w-md space-y-8 ">
        //         <div>
        //             {/* <img class="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" /> */}
        //             <h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Sign Up to Social Media</h2>
        //             {/* <p class="mt-2 text-center text-sm text-gray-600">
        //       Or
        //       <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500"></a>
        //     </p> */}
        //         </div>
        //         <form class="mt-8 space-y-6" onSubmit={(e)=>handleSignUp(e)}>
        //         {/* <input type="hidden" name="remember" value="true"/> */}
        //         <div class="-space-y-px rounded-md shadow-sm">
        //             <div>
        //                 <label for="userName" class="sr-only">User Name</label>
        //                 <input onChange={(e) => setUserName(e.target.value)} id="email-address" name="userName" type="text" autocomplete="text" required class=" pl-3 relative block w-full rounded-t-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-0 sm:text-sm " placeholder="user Name" />
        //             </div>
        //             <div className='pt-5'>
        //                 <label for="email" class="sr-only">Password</label>
        //                 <input onChange={(e) => setEmail(e.target.value)} id="email" name="email" type="email" autocomplete="email" required class="pl-3 relative block w-full rounded-b-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-0 sm:text-sm sm:leading-6" placeholder="email" />
        //             </div>
        //             <div className='pt-5'>
        //                 <label for="phoneNumber" class="sr-only">Password</label>
        //                 <input onChange={(e) => setPhoneNumber(e.target.value)} id="phoneNumber" name="phoneNumber" type="number" autocomplete="phoneNumber" required class="pl-3 relative block w-full rounded-b-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-0 sm:text-sm sm:leading-6" placeholder="Phone Number" />
        //             </div>
        //             <div className='pt-5'>
        //                 <label for="password" class="sr-only">Password</label>
        //                 <input onChange={(e) => setPassword(e.target.value)} id="password" name="password" type="password" autocomplete="current-password" required class="pl-3 relative block w-full rounded-b-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-0 sm:text-sm sm:leading-6" placeholder="Password" />
        //             </div>
        //         </div>

        //         <div class="flex items-center justify-center">
        //             {/* <div class="flex items-center">
        //                 <input id="remember-me" name="remember-me" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600" />
        //                 <label for="remember-me" class="ml-2 block text-sm text-gray-900">Remember me</label>
        //             </div> */}

        //             <div class="text-sm justify-between flex ">
        //                 <Link to='/login'>
        //                     <p className="text-sm px-10">Already have Account ?</p>
        //                 </Link>
        //             </div>
        //         </div>

        //         <div>
        //             <button type="submit" class="group relative flex w-full justify-center rounded-md bg-slate-900 py-2 px-3 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
        //                 <span class="absolute inset-y-0 left-0 flex items-center pl-3">
        //                     <svg class="h-5 w-5 group-hover:text-indigo-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        //                         <path fill-rule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clip-rule="evenodd" />
        //                     </svg>
        //                 </span>
        //                 Sign Up
        //             </button>
        //             <Toaster />
        //         </div>
        //         </form>
        //     </div>
        // </div>

    )
}

export default Register;