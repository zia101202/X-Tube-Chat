import Upload from "../../front/src/components/upload/upload.jsx";
import Home from "./pages/home.jsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { createUser } from "./redux/slices/userSlice/userSlice.js";
import Play from "./components/playVideo/playVideo.jsx";
import VideoPlayer from "./components/videoCard/videoCard.jsx";

export default function App() {
  const dispatch = useDispatch();
  const {  error, status,userID } = useSelector((state) => state.userSlice);
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



  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/play/:id" element={<Play />} />
        </Routes>
      </Router>
      <Upload />

    </>
  );
}
