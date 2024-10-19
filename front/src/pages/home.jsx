import React from 'react'
import SidebarComponent from '../components/sidebar/sidebar'
import VideoPlayer from '../components/videoCard/videoCard'
import { Button } from "@nextui-org/react";
function Home() {
    return (

        <>
            <div className='flex space-x-[40px]'>
                <SidebarComponent />
                <VideoPlayer/>
            </div>
           
        </>

    )
}

export default Home




