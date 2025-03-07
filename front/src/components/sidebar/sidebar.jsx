import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import PeopleRoundedIcon from "@mui/icons-material/PeopleRounded";
import ChatRoundedIcon from "@mui/icons-material/ChatRounded";
import LoginRoundedIcon from "@mui/icons-material/LoginRounded";
import WatchLaterRoundedIcon from "@mui/icons-material/WatchLaterRounded";
import CloudUploadRoundedIcon from "@mui/icons-material/CloudUploadRounded";
import PlaylistPlayRoundedIcon from "@mui/icons-material/PlaylistPlayRounded";
import BarChartRoundedIcon from "@mui/icons-material/BarChartRounded";
import TimelineRoundedIcon from "@mui/icons-material/TimelineRounded";
import BubbleChartRoundedIcon from "@mui/icons-material/BubbleChartRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import { useSelector } from "react-redux";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
const SidebarComponent = () => {
    // State to manage sidebar collapse
    const [collapsed, setCollapsed] = useState(true);
    const { logout, isAuthenticated } = useAuth0();
    const naviagte = useNavigate();
    const { darkModel } = useSelector((state) => state.darkModelSlice);
   const darkMode = darkModel;
    const handleToggleSidebar = () => {
        setCollapsed(!collapsed);
    };


    const handleLogout=async ()=>{
        try {
            await axios.post(`${import.meta.env.VITE_API_UR}/auth/logout`, {}, { withCredentials: true });
            console.log("User logged out");
            naviagte('/RegistrationForm') // Redirect to login page
          } catch (error) {
            console.error("Logout failed:", error);
          }
    }
    return (
        <div     className={`${darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"} `} >
            <Sidebar     className={`${darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"} `} collapsed={collapsed}>
                <Menu     className={`${darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"} `}>
                    <MenuItem
                        component={<Link to="/" className="link" />}
                        
                        icon={<MenuRoundedIcon />}
                        onClick={handleToggleSidebar}
                        className={`${darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"} `}
                    >
                        <h2>QUICKPAY</h2>
                    </MenuItem>
                    <MenuItem
                        icon={<LogoutRoundedIcon />}
                        onClick={handleLogout}
                       
                    >
                        logout
                    </MenuItem>

                   
                    <MenuItem     component={<Link to="CreateGroup" className="link" />} icon={<PeopleRoundedIcon />}> AvailabeUsers</MenuItem>
                    <SubMenu     label="Charts" icon={<BarChartRoundedIcon />}>
                        <MenuItem icon={<TimelineRoundedIcon />}>Timeline Chart</MenuItem>
                        <MenuItem icon={<BubbleChartRoundedIcon />}>Bubble Chart</MenuItem>
                    </SubMenu>
                    <MenuItem
                        component={<Link to="Chat" className="link" />}
                        icon={<ChatRoundedIcon />}
                       
                    >
                       Chat
                    </MenuItem>
                    <MenuItem
                        component={<Link to="/Login" className="link" />}
                        icon={<LoginRoundedIcon  />}
                        
                    >
                       login
                    </MenuItem>
                    
                    <MenuItem
                        component={<Link to="WatchLater" className="link" />}
                        icon={<WatchLaterRoundedIcon />}
                        
                    >
                        WatchLater
                    </MenuItem>
                    <MenuItem
                        component={<Link to="Upload" className="link" />}
                        icon={<CloudUploadRoundedIcon />}
              
                    >
                        Upload
                    </MenuItem>
                    <MenuItem
                        component={<Link to="Getplaylist" className="link" />}
                        icon={<PlaylistPlayRoundedIcon />}
                       
                    >
                        PlayList
                    </MenuItem>
                    
                    
                    {isAuthenticated && (
       <MenuItem     className={`${darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"} `}onClick={() => logout({ returnTo: window.location.origin })} icon={<LogoutRoundedIcon />}>Log Out</MenuItem>
      )}
                    
                    
                </Menu>
            </Sidebar>
        </div>
    );
};

export default SidebarComponent;
