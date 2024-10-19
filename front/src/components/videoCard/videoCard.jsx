import { useEffect, useRef } from 'react';

const VideoPlayer = ({ id, publicId, ...props }) => {
  const videoRef = useRef();
  const cloudinaryRef = useRef();
  const playerRef = useRef();

  // Store the Cloudinary window instance to a ref when the page renders

  useEffect(() => {
    if ( cloudinaryRef.current ) return;

    cloudinaryRef.current = window.cloudinary;

    playerRef.current = cloudinaryRef.current.videoPlayer(videoRef.current, {
      cloud_name: 'dlfziiyh2',
      secure: true
    });
  }, []);

  return (
    <div style={{ width: '100%', aspectRatio: `${props.width} / ${props.height}`}}>
      <video
        ref={videoRef}
        id='demo-player'
        className="cld-video-player cld-fluid"
        controls
        autoPlay
        data-cld-public-id='uploads/videos/nbhy29pkfh0lrfksxdnk'
        {...props}
      />
    </div>
  )
}

export default VideoPlayer;


































































// import React, { useState, useRef, useEffect } from 'react';
// import ReactPlayer from 'react-player';
// import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute, FaExpand } from 'react-icons/fa'; // Import custom icons

// const VideoPlayer = () => {
//   const [playing, setPlaying] = useState(false);
//   const [volume, setVolume] = useState(0.8);
//   const [muted, setMuted] = useState(false);
//   const [played, setPlayed] = useState(0); // Track played progress
//   const [duration, setDuration] = useState(0); // Store total video duration
//   const [playedSeconds, setPlayedSeconds] = useState(0); // Store current played time in seconds
//   const playerRef = useRef(null);

//   // Handle play/pause toggle
//   const togglePlayPause = () => {
//     setPlaying(!playing);
//   };

//   // Handle progress event
//   const handleProgress = (state) => {
//     setPlayed(state.played); // Update the played state with the percentage of the video played
//     setPlayedSeconds(state.playedSeconds); // Track current played time in seconds
//   };

//   // Handle duration once video metadata is loaded
//   const handleDuration = (duration) => {
//     setDuration(duration); // Set the total video duration
//   };

//   // Seek to specific point in video when clicking on progress bar
//   const handleSeek = (event) => {
//     const progressBar = event.target;
//     const seekTime = (event.nativeEvent.offsetX / progressBar.clientWidth) * playerRef.current.getDuration();
//     playerRef.current.seekTo(seekTime);
//   };

//   // Format time in mm:ss
//   const formatTime = (seconds) => {
//     const minutes = Math.floor(seconds / 60);
//     const remainingSeconds = Math.floor(seconds % 60);
//     return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
//   };

//   return (
//     <div style={{ position: 'relative',  }}>
//       {/* React Player */}
//       <ReactPlayer
//         ref={playerRef}
//         url="https://res.cloudinary.com/dlfziiyh2/video/upload/v1729227291/uploads/videos/nbhy29pkfh0lrfksxdnk.mp4"
//         playing={playing}
//         controls={false} // Disable default controls for custom UI
//         volume={volume}
//         muted={muted}
//         onProgress={handleProgress} // Update progress
//         onDuration={handleDuration} // Get video duration when loaded
       
//        width='50%'
//        height='100%'
//       />

//       {/* Custom Play/Pause Button */}
      
//       <div  style={{ position: 'relative',width:'50%'  }}>
//         <button onClick={togglePlayPause} style={{ color:'white', position: 'absolute',bottom:'10px',fontSize: '20px',left:'100px', marginRight: '10px' }}>
//           {playing ? <FaPause /> : <FaPlay />}
//         </button>
//         {/* Mute/Unmute Button */}
//         <button onClick={() => setMuted(!muted)} style={{ fontSize: '20px',color:'white', position: 'absolute',bottom:'10px',left:'130px', marginRight: '10px' }}>
//           {muted ? <FaVolumeMute /> : <FaVolumeUp />}
//         </button>
//         {/* Fullscreen Button */}
//         <button onClick={() => playerRef.current.getInternalPlayer().requestFullscreen()} style={{ color:'white',fontSize: '20px',position: 'absolute',right:'30px',bottom:'10px', marginRight: '10px' }}>
//           <FaExpand />
//         </button>
      

//       {/* Video Time Display */}
//       <div style={{  color:'white', display: 'flex', justifyContent: 'space-between', marginTop: '0px',position: 'absolute',bottom:'10px',left:'10px' }}>
//         <span>{formatTime(playedSeconds)} / {formatTime(duration)}</span> {/* Display current time / total time */}
//       </div>

//       {/* Custom Progress Bar */}
//       <div
//         style={{
//           position: 'relative',
//           height: '3px', // Thinner progress bar
//           background: '#ddd',
//           borderRadius: '5px',
//           cursor: 'pointer',
          
//         }}
//         onClick={handleSeek} // Seek to the clicked position
//       >
//         <div
//           style={{
//             position: 'absolute',
//            bottom:0,
//             left: 0,
//             height: '100%',
//             width: `${played * 100}%`, // Dynamic width based on played state
//             background: 'red', // Red progress bar like YouTube
//             borderRadius: '5px',
//           }}
//         />
//       </div>
//       </div>
//     </div>
//   );
// };

// export default VideoPlayer;
