
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import React from "react";
import Home from "./pages/home.jsx";
import Play from "./components/playVideo/playVideo.jsx";
import WatchLater from "./components/watchLater/watchLater.jsx";
import Upload from "./components/upload/upload.jsx";
import Getplaylist from "./components/playlist/getPlayList.jsx";
import Chat from "./components/chat/chat.jsx";
import ChatDetails from "./components/chat/chatDetails.jsx";
import CreateGroup from "./components/chat/createGroup.jsx";
import GroupDetails from "./components/chat/groupDetails.jsx";
import GroupSetting from "./components/chat/groupSetting.jsx";
import NotFound from "./components/notFound/notFound.jsx";
import Login from "./components/authentication/login.jsx";
import RegistrationForm from "./components/authentication/registration.jsx";
import Verify from "./components/authentication/verifying.jsx";
import SignUP from "./components/authentication/signUp.jsx";
import ForgetPassword from "./components/authentication/forgetPassword.jsx";
import VerifyPassword from "./components/authentication/verifyPassword.jsx";
import NewPassword from "./components/authentication/newPassword.jsx";
import GoogleAuth from "./components/authentication/googleAuth.jsx";
import ProfileUpdate from "./components/profile/profile.jsx";

const ProtectedRoute = ({ element }) => {
  const getCookie = (name) => {
    const cookies = document.cookie.split("; ");
    for (let cookie of cookies) {
      const [key, value] = cookie.split("=");
      if (key === name) return value;
    }
    return null;
  };
  
  // Example usage:
  const token = getCookie("jwtToken");
  
  
  console.log(token);
  return token ? element : <Navigate to="/Login" replace />;
};

export default function App() {

  
  return (
    <Router>
      <Routes>
        {/* ✅ Public Routes (Accessible without login) */}
        <Route path="/Login" element={<Login />} />
        <Route path="/SignUP" element={<SignUP />} />
        <Route path="/RegistrationForm" element={<RegistrationForm />} />
        <Route path="/Verify" element={<Verify />} />
        <Route path="/ForgetPassword" element={<ForgetPassword />} />
        <Route path="/VerifyPassword" element={<VerifyPassword />} />
        <Route path="/NewPassword" element={<NewPassword />} />
        <Route path="/"  element={<Home />}  />
        <Route path="/auth/google"  element={<GoogleAuth/>}/>
       
        
        /*  Protected Routes (Requires JWT token) */
        
        <Route path="/play/:id" element={<ProtectedRoute element={<Play />} />} />
        <Route path="/watchLater" element={<ProtectedRoute element={<WatchLater />} />} />
        <Route path="/Upload" element={<ProtectedRoute element={<Upload />} />} />
        <Route path="/Getplaylist" element={<ProtectedRoute element={<Getplaylist />} />} />
        <Route path="/Chat" element={<ProtectedRoute element={<Chat />} />} />
        <Route path="/Chat/:id" element={<ProtectedRoute element={<ChatDetails />} />} />
        <Route path="/CreateGroup" element={<ProtectedRoute element={<CreateGroup />} />} />
        <Route path="/GroupDetails/:id" element={<ProtectedRoute element={<GroupDetails />} />} />
        <Route path="/GroupSetting" element={<ProtectedRoute element={<GroupSetting />} />} />

        <Route path="/profile" element={<ProtectedRoute element={<ProfileUpdate />} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}