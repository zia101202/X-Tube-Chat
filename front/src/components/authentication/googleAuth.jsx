import  React from "react";
import { useState, useEffect } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";

import axios from "axios";

function GoogleAuth() {
 const [user, setUser] = useState(null)
 const { darkModel } = useSelector((state) => state.darkModelSlice);
  const darkMode = darkModel;
 const navigate=useNavigate()
  const handelLogin =async (googleData) => {  
  
    setUser(googleData)
    console.log(user);



  };

  useEffect(() => {
    const authenticateUser = async () => {
      console.log(user);
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_UR}/auth/googleAuth`,
          {token:user},
          { withCredentials: true }
        );
        console.log(response.data);
        localStorage.setItem("user",  JSON.stringify( response.data.user));
        navigate("/");
      } catch (error) {
        console.error("Authentication failed:", error);
      }
    };
  if(user){
    authenticateUser();
  }
   
  }, [user]);


  return (
    <GoogleOAuthProvider clientId="683152148858-o2ii21686kb8s42vkg2gntoj0tjdeep5.apps.googleusercontent.com">
    <div className="flex justify-center mt-6">
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="shadow-lg rounded-xl p-4 transition-all duration-300"
      >
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            handelLogin(credentialResponse.credential);
          }}
          onError={() => console.log("❌ Login Failed")}
        />
      </motion.div>
    </div>
  </GoogleOAuthProvider>
  ); 
}

export default GoogleAuth;


