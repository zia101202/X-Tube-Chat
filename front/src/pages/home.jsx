import React from 'react'
import SidebarComponent from '../components/sidebar/sidebar'
import VideoPlayer from '../components/videoCard/videoCard'
import { Button } from "@nextui-org/react";
import GetUsersVideo from '../components/getUsersVideo/getUsersVideo.jsx'
import PaymentForm from '../components/payment/payment.jsx';
import WatchLater from '../components/watchLater/watchLater.jsx';
import Playlist from "../components/playlist/playList.jsx";
function Home() {
    return (

        <>
            <div className='flex space-x-[40px]'>
                <SidebarComponent />
             <GetUsersVideo/>
            </div>
           <PaymentForm/>
           <WatchLater />
           <Playlist/>
        </>

    )
}

export default Home




