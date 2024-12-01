
import Home from "./pages/home.jsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { createUser } from "./redux/slices/userSlice/userSlice.js";
import Play from "./components/playVideo/playVideo.jsx";
import WatchLater from "./components/watchLater/watchLater.jsx";
import React, {useState} from 'react'
import Upload from './components/upload/upload.jsx'
import Getplaylist from'./components/playlist/getPlayList.jsx'
import Chat from "./components/chat/chat.jsx";
export default function App() {
 
  const dispatch = useDispatch();
  const { userID, status, error } = useSelector((state) => state.userSlice);
 
  const { isAuthenticated, isLoading, loginWithRedirect, user } = useAuth0();
  const data = {
    userId: user?.sub, // This is the unique identifier
    email: user?.email,
    name: user?.name,
    nickname: user?.nickname,
    picture: user?.picture,
    sub: user?.sub,
    updated_at: user?.updated_at,
  };
  useEffect(() => {
    if (!isLoading) { dispatch(createUser(data ));  }
  }, [isAuthenticated,user]);
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      loginWithRedirect();
    }
  }, [isAuthenticated, isLoading, loginWithRedirect]);

  if (isLoading) {
    return <>loaidng....</>;
  }
  console.log(error)
  console.log(status)
  console.log(userID)
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/play/:id" element={<Play />} />
          <Route path="/watchLater" element={<WatchLater />} />
          <Route path="/Upload" element={<Upload/>} />
          <Route path="/Getplaylist" element={<Getplaylist/>} />
        </Routes>
      </Router>
   
<Chat/>
   
    </>
  );
}
