import React, { useState, useEffect } from 'react';
import Login from './pages/Login';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import { ToastContainer } from 'react-toastify';

export const backendUrl = import.meta.env.VITE_BACKEND_URL;

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [fullName, setFullName] = useState(localStorage.getItem('fullName') || '');

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    }
  }, [token]);

  useEffect(() => {
    if (fullName) {
      localStorage.setItem('fullName', fullName);
    }
  }, [fullName]);

  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Login setToken={setToken} setFullName={setFullName} />} />
        <Route path="/home" element={<Home setToken={setToken} fullName={fullName} />} />
      </Routes>
    </div>
  );
};

export default App;