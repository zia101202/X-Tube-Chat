import React, { useEffect, useState } from "react";
import { registration } from "../../redux/slices/userSlice/registration";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
function RegistrationForm() {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const { registrationData, registrationStatus, registrationError } =
    useSelector((state) => state.registrationSlice);
      const { darkModel } = useSelector((state) => state.darkModelSlice);
      const darkMode = darkModel;
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formData);
    dispatch(registration({ endpoint: "/auth/signup", data: formData }));
  };

  console.log(registrationData);
  console.log(registrationStatus);
  if (registrationStatus === "succeed") {
    navigate("/Verify");
  }

  console.log(registrationError);
  return (
    <div
      className={`flex items-center justify-center min-h-screen transition-all duration-500 ${
        darkMode
          ? "bg-gray-900 text-white"
          : "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
      }`}
    >
      {/* Animated Glassmorphic Card */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`w-full max-w-md p-8 space-y-8 rounded-xl shadow-lg backdrop-blur-xl border border-gray-200/50 ${
          darkMode ? "bg-gray-800/80 border-gray-700" : "bg-white/80"
        }`}
      >
        <h2 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Create Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Username Input */}
          <div>
            <label htmlFor="username" className="block text-sm font-medium mb-1">
              Username
            </label>
            <input
              type="text"
              name="username"
              id="username"
              value={formData.username}
              onChange={handleChange}
              required
              className={`mt-1 block w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:outline-none transition ${
                darkMode
                  ? "bg-gray-700 border-gray-600 text-white focus:ring-purple-400"
                  : "border-gray-300 focus:ring-indigo-500"
              }`}
            />
          </div>

          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              required
              className={`mt-1 block w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:outline-none transition ${
                darkMode
                  ? "bg-gray-700 border-gray-600 text-white focus:ring-purple-400"
                  : "border-gray-300 focus:ring-indigo-500"
              }`}
            />
            {registrationError && (
              <div className="text-red-500 mt-2">{registrationError.message}</div>
            )}
          </div>

          {/* Password Input */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              required
              className={`mt-1 block w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:outline-none transition ${
                darkMode
                  ? "bg-gray-700 border-gray-600 text-white focus:ring-purple-400"
                  : "border-gray-300 focus:ring-indigo-500"
              }`}
            />
          </div>

          {/* Register Button with Gradient & Hover Effect */}
          <button
            type="submit"
            className="w-full py-3 px-4 font-semibold rounded-lg shadow-md text-white transition-all duration-300 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-purple-500 hover:to-blue-500 focus:ring-2 focus:outline-none"
          >
            Register
          </button>
        </form>
      </motion.div>
    </div>
  );
}

export default RegistrationForm;
