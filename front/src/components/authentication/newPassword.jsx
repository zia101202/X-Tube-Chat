import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
function NewPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate=useNavigate()
    const { darkModel } = useSelector((state) => state.darkModelSlice);
    const darkMode = darkModel;
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "password") setPassword(value);
    if (name === "confirmPassword") setConfirmPassword(value);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match ❌");
      return;
    }
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_UR}/auth/newPassword`, { password }, { withCredentials: true });
      console.log(response.data);
    
      localStorage.setItem("user",  JSON.stringify( response.data.user));
      navigate('/')
    } catch (error) {
      console.log(error);
    }

  
    setError("");
 
  };

  return (
    <div
      className={`flex min-h-screen items-center justify-center transition-all duration-500 ${
        darkMode
          ? "bg-gray-900 text-white"
          : "bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
      }`}
    >
      {/* Glassmorphic Card */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`w-full max-w-md p-8 rounded-2xl shadow-xl backdrop-blur-xl border border-gray-200/50 ${
          darkMode ? "bg-gray-800/80 border-gray-700" : "bg-white/80"
        }`}
      >
        <h2 className="text-3xl font-semibold text-center bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Set New Password
        </h2>
        <p className="text-gray-500 dark:text-gray-300 text-center mt-2">
          Enter a new password for your account 🔑
        </p>

        <form className="mt-6" onSubmit={handleSubmit}>
          {/* New Password Input */}
          <div>
            <label className="block mb-2 text-sm font-medium">New Password</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={handleChange}
              placeholder="Enter new password"
              className={`w-full p-3 border rounded-lg focus:ring-2 focus:outline-none transition ${
                darkMode
                  ? "bg-gray-700 border-gray-600 text-white focus:ring-purple-400"
                  : "border-gray-300 focus:ring-blue-500"
              }`}
              required
            />
          </div>

          {/* Confirm Password Input */}
          <div className="mt-4">
            <label className="block mb-2 text-sm font-medium">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleChange}
              placeholder="Confirm new password"
              className={`w-full p-3 border rounded-lg focus:ring-2 focus:outline-none transition ${
                darkMode
                  ? "bg-gray-700 border-gray-600 text-white focus:ring-purple-400"
                  : "border-gray-300 focus:ring-blue-500"
              }`}
              required
            />
          </div>

          {/* Error Message */}
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

          {/* Update Password Button with Animation */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full mt-6 py-3 font-medium rounded-lg shadow-md text-white transition-all duration-300 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-purple-500 hover:to-blue-500 focus:ring-2 focus:outline-none"
          >
            Update Password 🔒
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}

export default NewPassword;
