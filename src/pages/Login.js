import axios from 'axios'
import React, { useState } from 'react'
// import { useDispatch } from "react-redux";
import { useNavigate, Link } from 'react-router-dom'
// import { SET_USER } from "../../store/auth/authSlice.js";
import { URL } from '../URL.js'

// const URL = `http://localhost:5000/api/` ;
const Login = () => {
    //   const dispatch = useDispatch();
    const history = useNavigate()
    const [inputs, setInputs] = useState({
        email: '',
        password: ''
    })
    const handleChange = (e) => {
        setInputs((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }
    const sendRequest = async () => {
        try {
            const res = await axios
                .post(`${URL}/user/login`, { email: inputs.email, password: inputs.password })
                .catch((err) => console.log(err))
            const data = res.data
            alert(JSON.stringify(data))
            //   await dispatch(SET_USER(res.data.user));
            localStorage.setItem('token', JSON.stringify(data.token))
            history('/')
            return data
        } catch (error) {
            alert('ข้อมูลผิดพลาด')
            history('/login')
            return
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        sendRequest()
    }
    return (
        <div className="justify-center min-h-screen overflow-hidden ">
            <div className="w-full p-6 m-auto bg-white rounded-md shadow-xl lg:max-w-xl">
                <h1 className="text-3xl font-semibold text-center text-green-700 uppercase">Sign in</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-2">
                        <label for="email" className="block text-sm font-semibold text-gray-800">
                       xx     Username
                        </label>
                        <input
                            name="email"
                            onChange={handleChange}
                            type={'text'}
                            value={inputs.email}
                            placeholder="username"
                            className="block w-full px-4 py-2 mt-2 text-green-700 bg-white border rounded-md focus:border-green-400 focus:ring-green-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                    </div>
                    <div className="mb-2">
                        <label for="password" className="block text-sm font-semibold text-gray-800">
                            Password
                        </label>
                        <input
                            name="password"
                            onChange={handleChange}
                            type="password"
                            value={inputs.password}
                            placeholder="Password"
                            margin="normal"
                            className="block w-full px-4 py-2 mt-2 text-green-700 bg-white border rounded-md focus:border-green-400 focus:ring-green-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                    </div>

                    <div className="mt-6">
                        <button
                            type="submit"
                            className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-green-700 rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600"
                        >
                            Login
                        </button>
                    </div>
                </form>
                <div className="relative flex items-center justify-center w-full mt-6 border border-t">
                    <div className="absolute px-5 bg-white">Or</div>
                </div>

                <p className="mt-8 text-xs font-light text-center text-gray-700">
                    {' '}
                    Don't have an account?{' '}
                    <Link to={`/register`} className="text-2xl font-medium text-green-600 hover:underline">
                        สมัครสมาชิก
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default Login
