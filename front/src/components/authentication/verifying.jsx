import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";
import { useSelector } from "react-redux"; 
function Verify() {
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");

  const { darkModel } = useSelector((state) => state.darkModelSlice);  
   const darkMode = darkModel;
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
console.log('hi');
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_UR}/auth/verify`, { otp },{withCredentials: true});
      console.log('jijjjjjjj');
      setMessage("Verification successful! 🎉");
      console.log("Response:", response.data);
      navigate("/");
      localStorage.setItem("user",  JSON.stringify( response.data.user));
    } catch (error) {
      setMessage("incorrect otp");
      console.error("Error:", error);
    }
  };




  return (
    <div
      className={`flex items-center justify-center min-h-screen transition-all duration-500 ${
        darkMode
          ? "bg-gradient-to-br from-gray-900 to-gray-700 text-white"
          : "bg-gradient-to-br from-gray-100 to-indigo-50 text-gray-900"
      }`}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className={`p-8 rounded-2xl shadow-2xl backdrop-blur-lg bg-opacity-80 ${
          darkMode ? "bg-gray-800" : "bg-white"
        } max-w-md w-full`}
      >
        {/* Header */}
        <h2 className="text-2xl font-bold text-center">🔐 Verify OTP</h2>
        <p className="text-sm text-center mt-2">
          Enter the OTP sent to your email 📩
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-6">
          {/* OTP Input */}
          <motion.div
            whileFocus={{ scale: 1.05 }}
            className="mb-4 transition-all"
          >
            <label htmlFor="otp" className="block text-sm font-medium">
              OTP Code
            </label>
            <input
              type="text"
              id="otp"
              name="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="mt-1 w-full px-4 py-2 border rounded-lg shadow-md focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
              placeholder="🔢 Enter your OTP"
              required
            />
          </motion.div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 transition-all"
          >
            ✅ Verify OTP
          </motion.button>
        </form>

        {/* Message */}
        {message && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`mt-4 text-center text-sm ${
              message.includes("successful") ? "text-green-400" : "text-red-400"
            }`}
          >
            {message}
          </motion.p>
        )}
      </motion.div>
    </div>
  );
}

export default Verify;
