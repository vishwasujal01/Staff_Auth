import React, { useState } from 'react';
import axios from 'axios';
import { backendUrl } from '../App'
import { toast } from 'react-toastify'

const Add = ({ token }) => {
    const [profileImage, setProfileImage] = useState(null);
    const [fullName, setFullName] = useState('');
    const [staffID, setStaffID] = useState('');
    const [password, setPassword] = useState('');
    const [department, setDepartment] = useState('');

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            
            formData.append('fullName', fullName);
            formData.append('staffID', staffID);
            formData.append('department', department);
            formData.append('password', password);
            if (profileImage) {
                formData.append('profileImage', profileImage);
            }

            const response = await axios.post(backendUrl + "/api/user/register", formData, {
                headers: { Authorization: token },
                'Content-Type': 'multipart/form-data'
            });
            
            console.log(response);
            

            if (response.data.success) {
                toast.success('Profile Saved Successfully');
                setFullName('');
                setStaffID('');
                setPassword('')
                setDepartment('');
                setProfileImage(null);
            } else {
                toast.error(response.data.message);
            }
            
        } catch (error) {
            toast.error('Error submitting form');
            console.error(error);
        }
    };

    return (
        <form onSubmit={onSubmitHandler} className="flex flex-col items-center w-full gap-4 p-6 bg-white shadow-md rounded-lg max-w-md mx-auto">
            <h2 className="text-2xl font-semibold">Staff Profile</h2>
            <p className="text-gray-600">Please fill in your profile details</p>

            {/* Profile Photo Upload */}
            <div className="flex flex-col items-center">
                <label htmlFor="profileImage" className="cursor-pointer">
                    <div className="w-24 h-24 rounded-full border-2 border-gray-300 flex items-center justify-center">
                        {profileImage ? (
                            <img src={URL.createObjectURL(profileImage)} alt="Profile" className="w-full h-full rounded-full object-cover" />
                        ) : (
                            <span className="text-gray-400">Upload</span>
                        )}
                    </div>
                </label>
                <input type="file" id="profileImage" hidden onChange={(e) => setProfileImage(e.target.files[0])} />
                <button type="button" className="mt-2 px-4 py-1 bg-black text-white rounded-md">Upload Photo</button>
            </div>

            {/* Full Name */}
            <div className="w-full">
                <label className="block text-gray-700">Full Name</label>
                <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full border p-2 rounded-md"
                    required
                />
            </div>

            {/* Staff ID */}
            <div className="w-full">
                <label className="block text-gray-700">Staff ID</label>
                <input
                    type="text"
                    value={staffID}
                    onChange={(e) => setStaffID(e.target.value)}
                    placeholder="Enter your staff ID"
                    className="w-full border p-2 rounded-md"
                    required
                />
            </div>

            {/* Staff Password */}
            <div className="w-full">
                <label className="block text-gray-700">Password</label>
                <input
                    type="text"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your staff password"
                    className="w-full border p-2 rounded-md"
                    required
                />
            </div>

            {/* Department */}
            <div className="w-full">
                <label className="block text-gray-700">Department</label>
                <select
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="w-full border p-2 rounded-md"
                    required
                >
                    <option value="">Select department</option>
                    <option value="HR">HR</option>
                    <option value="IT">IT</option>
                    <option value="Finance">Finance</option>
                </select>
            </div>

            {/* Submit Button */}
            <button type="submit" className="w-full bg-black text-white py-2 rounded-md">Save Profile</button>
        </form>
    );
};

export default Add;


