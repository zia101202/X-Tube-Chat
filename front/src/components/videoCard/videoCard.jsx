import "plyr-react/plyr.css"; // Import the styles
import { VideoPlayer } from "vidify";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
const VideoPlayerPrivate = ({ publicId,video }) => {

  const { darkModel } = useSelector(
    (state) => state.darkModelSlice
  );
  const darkMode=darkModel

  console.log(video);

  return (  
    <>  

<div className={` ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-800"} transition-all duration-300`}>
      
        {video?.startsWith("video/") && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ duration: 0.5 }}
          >
            <VideoPlayer
              src={publicId}
              autoplay
            
            />
          </motion.div>
        )}

        {video?.startsWith("image/") && (
          <motion.img
            src={publicId}
            alt="Uploaded media"
            className="w-full h-auto rounded-lg"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          />
        )}
    
    </div>


    </>
  );
};

export default VideoPlayerPrivate;














