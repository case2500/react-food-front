import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'
import { URL } from '../URL.js'

// CommonJS

// const URL = `http://localhost:5000/api/` ;

const Register = () => {
    const history = useNavigate()
    const [inputs, setInputs] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    })

    const validateEmail = (email) => {
        return email.match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
    }

    const handleChange = (e) => {
        setInputs((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }
	// //http://localhost:4000/api/users/
    const sendRequest = async () => {
        const res = await axios
            .post(`${URL}/user/signup`, {
                name: inputs.name,
                email: inputs.email,
                password: inputs.password
            })
            .catch((err) => alert('ชื่อusename password ซ้ำ'))
        const data = await res.data
        return data
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        if (!inputs.name || !inputs.email || !inputs.password) {
            return alert('All fields are required')
        }
        if (inputs.password.length < 6) {
            alert('Passwords must be up to 6 characters')
            return alert('Passwords must be up to 6 characters')
        }
        // if (!validateEmail(inputs.email)) {
        //   alert("Passwords do not match");
        //   return alert("Please enter a valid email");
        // }
        if (inputs.password !== inputs.password2) {
            alert('Passwords do not match')
            return alert('Passwords do not match')
        }
        sendRequest().then(() => history('/login'))
    }
    return (
        <div className="relative flex flex-col justify-center pt-10 overflow-hidden">
            <div className="w-full p-6 m-auto bg-white rounded-md shadow-xl lg:max-w-xl">
                <h1 className="text-3xl font-semibold text-center text-blue-700 uppercase">สมัครสมาชิก</h1>
                <form className="mt-6" onSubmit={handleSubmit}>
                    <div className="mb-2">
                        <label for="name" className="block text-sm font-semibold text-gray-800">
                            Name
                        </label>

                        <input
                            name="name"
                            onChange={handleChange}
                            value={inputs.name}
                            variant="outlined"
                            placeholder="Name"
                            margin="normal"
                            className="block w-full px-4 py-2 mt-2 text-blue-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />

                        <label for="email" className="block text-sm font-semibold text-gray-800">
                            Username
                        </label>
                        <input
                            name="email"
                            onChange={handleChange}
                            type={'text'}
                            value={inputs.email}
                            variant="outlined"
                            placeholder="username"
                            margin="normal"
                            className="block w-full px-4 py-2 mt-2 text-blue-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
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
                            variant="outlined"
                            placeholder="Password"
                            margin="normal"
                            className="block w-full px-4 py-2 mt-2 text-blue-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                    </div>
                    <div className="mb-2">
                        <label for="password2" className="block text-sm font-semibold text-gray-800">
                            Password1
                        </label>
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            required
                            name="password2"
                            value={inputs.password2}
                            onChange={handleChange}
                            className="block w-full px-4 py-2 mt-2 text-blue-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                    </div>

                    <div className="mt-6">
                        <button
                            type="submit"
                            className="w-full px-4 py-2 text-2xl tracking-wide text-white transition-colors duration-200 transform bg-blue-700 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                        >
                            ลงทะเบียน
                        </button>
                    </div>
                </form>
                <div className="relative flex items-center justify-center w-full mt-6 border border-t">
                    <div className="absolute px-5 bg-white">Or</div>
                </div>

                <p className="mt-8 text-xs font-light text-center text-gray-700">
                    <Link to={'/login'} className="text-sm text-gray-600 underline hover:text-gray-900" href="#">
                        Already registered?
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default Register
