import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import GoogleAuth from './googleAuth';
import { useSelector } from 'react-redux';
import { motion } from "framer-motion";
function Login() {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate()
  const { darkModel } = useSelector((state) => state.darkModelSlice);
  const darkMode = darkModel;
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleLogin = async (event) => {
    event.preventDefault(); // Prevent form from submitting the default way

    if (!email || !password) {
      alert("Please fill in both fields.");
      return;
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_UR}/auth/login`, {
        email: email,
        password: password,
      }, { withCredentials: true });
      console.log(response.data);
      localStorage.setItem("user",  JSON.stringify( response.data.user));
 
      navigate('/');
      // Optionally handle the response, like redirecting or storing div token
    } catch (error) {
      console.log(error.response);
    }
  };

   const handleForget=()=>{
    navigate('/ForgetPassword');
   }
   const handleRegistration=()=>{
    navigate('/RegistrationForm');
   }

  return (
   
    <div
    className={`flex items-center justify-center min-h-screen transition-all duration-500 ${
      darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-800"
    }`}
  >
    {/* Glassmorphic Card with Motion Effect */}
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`p-6 rounded-lg shadow-lg w-full max-w-sm backdrop-blur-xl border border-gray-200/50 ${
        darkMode ? "bg-gray-800/80 border-gray-700" : "bg-white/80"
      }`}
    >
      {/* Title with a cool gradient effect */}
      <h2 className="text-3xl font-extrabold text-center mb-6 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
        Login
      </h2>

      <form onSubmit={handleLogin}>
        {/* Email Input */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium mb-2">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            className={`w-full px-4 py-2 border rounded-lg focus:ring focus:outline-none transition ${
              darkMode
                ? "bg-gray-700 border-gray-600 text-white focus:ring-purple-400"
                : "border-gray-300 focus:ring-blue-300"
            }`}
            value={email}
            onChange={handleEmailChange}
          />
        </div>

        {/* Password Input */}
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            className={`w-full px-4 py-2 border rounded-lg focus:ring focus:outline-none transition ${
              darkMode
                ? "bg-gray-700 border-gray-600 text-white focus:ring-purple-400"
                : "border-gray-300 focus:ring-blue-300"
            }`}
            value={password}
            onChange={handlePasswordChange}
          />
        </div>

        {/* Remember Me & Forgot Password */}
        <div className="flex items-center justify-between mb-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <span className="ml-2 text-sm">Remember me</span>
          </label>
          <div
            className="text-sm text-blue-500 hover:cursor-pointer hover:underline"
            onClick={handleForget}
          >
            Forgot Password?
          </div>
        </div>

        {/* Login Button with Gradient & Hover Effect */}
        <button
          type="submit"
          className={`w-full py-2 px-4 rounded-lg text-white transition-all duration-300 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-purple-500 hover:to-blue-500 focus:ring focus:outline-none ${
            darkMode ? "focus:ring-purple-400" : "focus:ring-blue-300"
          }`}
        >
          Login
        </button>
      </form>

      {/* Google Auth Component */}
      <GoogleAuth />

      {/* Sign Up Link */}
      <p className="text-center text-sm mt-6">
        Don't have an account?{" "}
        <span
          className="text-blue-500 hover:cursor-pointer hover:underline"
          onClick={handleRegistration}
        >
          Sign Up
        </span>
      </p>
    </motion.div>
  </div>
  );
}

export default Login;

 