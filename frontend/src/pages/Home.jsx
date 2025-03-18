import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = ({ setToken, fullName }) => {
  const navigate = useNavigate();

  const Logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('fullName'); // Remove full name from local storage
    setToken('');
    navigate('/');
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 text-white">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 py-4 bg-white shadow-lg text-gray-800">
        <div className="text-2xl font-bold">🚀 CompanyLogo</div>
        <ul className="flex space-x-8 text-lg font-medium">
          <li className="hover:text-blue-600 cursor-pointer">Home</li>
          <li className="hover:text-blue-600 cursor-pointer">About Us</li>
          <li className="hover:text-blue-600 cursor-pointer">Contact Us</li>
        </ul>
        <button 
          onClick={Logout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
        >
          Logout
        </button>
      </nav>

      {/* Welcome Section */}
      <div className="flex flex-col items-center justify-center h-[80vh] text-center px-4">
        <h1 className="text-4xl font-bold mb-4">Welcome, {fullName}! 🎉</h1>
        <p className="text-lg max-w-2xl">
          We’re excited to have you onboard. Explore our platform and make the most out of it.
        </p>
        <button className="mt-6 bg-green-500 hover:bg-green-600 px-6 py-3 rounded-lg text-lg">
          Explore More 🚀
        </button>
      </div>
    </div>
  );
};

export default Home;