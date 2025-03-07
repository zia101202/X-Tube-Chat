import React from "react";
import SidebarComponent from "../components/sidebar/sidebar";
import GetUsersVideo from "../components/getUsersVideo/getUsersVideo.jsx";

import {setDarkModel} from "../redux/slices/userSlice/darkModel";
import { useSelector, useDispatch } from "react-redux";
import ProfileUpdate from "../components/profile/profile.jsx";
import { useNavigate } from "react-router-dom";
function Home() {
 
  const { darkModel } = useSelector(
    (state) => state.darkModelSlice
  );
  const darkMode=darkModel
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const toggleDarkMode = () => {
    console.log('ji');
    dispatch(setDarkModel(!darkModel)); 
  };
  console.log(darkModel);
  const userDetails = JSON.parse(localStorage.getItem("user"));
  console.log(userDetails);

  const ProfileUpdate=()=>{
    navigate("/profile")

  }

  return (
    <div className={`${darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"} min-h-screen p-4`}>
     

      <div className="flex space-x-[20px]">

     
        <SidebarComponent />
        <GetUsersVideo />
        
      
      </div>
  
    </div>
  );
}

export default Home;

