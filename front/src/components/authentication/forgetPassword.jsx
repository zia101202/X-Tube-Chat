import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function ForgetPassword() {
  // State for storing the email
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  // Handle input change
  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Email submitted:", email);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_UR}/auth/forgetPassword`,
        { email },
        { withCredentials: true }
      );
console.log(response.data);
      navigate("/VerifyPassword");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-2xl shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-800 text-center">
          Forgot Password
        </h2>
        <p className="text-gray-500 text-center mt-2">
          Enter your email to reset your password
        </p>

        <form className="mt-6" onSubmit={handleSubmit}>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          />

          <button
            type="submit"
            className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition-all"
          >
            Reset Password
          </button>
        </form>

        <div className="text-center mt-4">
          <a href="/login" className="text-blue-600 hover:underline text-sm">
            Back to Login
          </a>
        </div>
      </div>
    </div>
  );
}

export default ForgetPassword;
