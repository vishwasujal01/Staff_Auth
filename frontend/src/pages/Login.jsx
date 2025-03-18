import React, { useState } from 'react';
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Login = ({ setToken, setFullName }) => {
  const [staffID, setStaffID] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
        const response = await axios.post(backendUrl + '/api/user/login', { staffID, password });

        if (response.data.success) {
            setToken(response.data.token);
            // Check if user object exists before accessing fullName
            if (response.data.user && response.data.user.fullName) {
                setFullName(response.data.user.fullName); // Set the full name
                localStorage.setItem('fullName', response.data.user.fullName); // Store full name in local storage
            } else {
                toast.error("User  information is not available.");
            }
            localStorage.setItem('token', response.data.token);
            toast.success("Login Successful");
            navigate('/home'); // Redirect to dashboard after login
        } else {
            toast.error(response.data.message);
        }
    } catch (error) {
        console.log(error);
        toast.error(error.response?.data?.message || "Login Failed");
    }
} 
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 p-6">
      <div className="w-full max-w-md rounded-2xl bg-white bg-opacity-10 p-8 shadow-xl backdrop-blur-lg">
        <h2 className="mb-6 text-center text-3xl font-bold text-white">Welcome Back</h2>
        <form onSubmit={onSubmitHandler}>
          <div className="mb-4">
            <label className="block text-white">Staff_Id</label>
            <input
              onChange={(e) => setStaffID(e.target.value)}
              value={staffID}
              type="text"
              placeholder="Enter your Staff_Id"
              className="mt-1 w-full rounded-lg border border-gray-300 bg-white bg-opacity-20 p-3 text-white placeholder-gray-200 focus:border-blue-400 focus:outline-none"
            />
          </div>
          <div className="mb-6">
            <label className="block text-white">Password</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              placeholder="Enter your password"
              className="mt-1 w-full rounded-lg border border-gray-300 bg-white bg-opacity-20 p-3 text-white placeholder-gray-200 focus:border-blue-400 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;