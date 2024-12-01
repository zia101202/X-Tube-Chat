import { useEffect, useState,useRef } from 'react';
import axios from 'axios'

const VideoPlayer = ({ id, publicId,}) => {
  const videoRef = useRef();
  const cloudinaryRef = useRef();
  const playerRef = useRef();
 
  const videoPlayed=useRef(false)
  useEffect(() => {
    if (cloudinaryRef.current) return;
  
    cloudinaryRef.current = window.cloudinary;
  
    playerRef.current = cloudinaryRef.current.videoPlayer(videoRef.current, {
      cloud_name: 'dlfziiyh2',
      secure: true,
    });
  
    // Attach the play event listener
    playerRef.current.on('play',async () => {
      console.log('Cloudinary video is playing');

      console.log(publicId)
 
      if(!videoPlayed.current){
        
        try {
          const response = await axios.post(`${import.meta.env.VITE_API_UR}/video/addView`, {
             videoId: publicId
          });
          console.log(response.data);
          videoPlayed.current=true
       } catch (err) {
          console.log(err); // Logs the error if there is one
       }

      }
    
    
    });
    
  }, []);
console.log('jijij')
  
  return (
    <>
   

  <video
        ref={videoRef}
        id='demo-player'
        className="cld-video-player cld-fluid object-contain"
        controls
        data-cld-public-id={publicId}
 
       
      />
    
   
    </>
   
    
  )
}

export default VideoPlayer;

































































