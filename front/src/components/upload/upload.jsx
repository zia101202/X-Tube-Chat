import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
const Upload = () => {
  const [videoFile, setVideoFile] = useState(null);
  const [previewUrlImage, setPreviewUrlImage] = useState("");
  const [previewUrlVideo, setPreviewUrlVideo] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [triggerUpload, setTriggerUpload] = useState(false); // New state for triggering upload

    const { darkModel } = useSelector((state) => state.darkModelSlice);
    const darkMode=darkModel
   
  const handleFileChange = (e) => {
    
    const file = e.target.files[0];
    if (file) {
      setVideoFile(file);
      
    }
    if (file.type.startsWith("video/")) {
      setPreviewUrlVideo(URL.createObjectURL(file)); // Set preview for video
    } else if (file.type.startsWith("image/")) {
      setPreviewUrlImage(URL.createObjectURL(file)); // Set preview for image
    } else {
      alert("Unsupported file type! Please upload an image or video.");
    }
  };

  let userId;
  const value = JSON.parse(localStorage.getItem("user"));
  userId=value.userId
  const handleUpload = () => {
    if (!videoFile || !title || !description) {
      alert("Please fill out all fields and select a video file.");
      return;
    }
    setTriggerUpload(true); // Trigger the upload
  };

  useEffect(() => {
    const uploadVideo = async () => {
      console.log('uplodainf');
      if (triggerUpload && userId) {
        const formData = new FormData();
        formData.append("file", videoFile);
        formData.append("title", title);
        formData.append("description", description);
        formData.append("userID", userId);

        setUploading(true);

        try {
          const response = await axios.post(
            "http://localhost:5000/api/upload",
            formData,
            {
              withCredentials: true, // ✅ Allows sending cookies with the request
              headers: {
                "Content-Type": "multipart/form-data", // ✅ Required for file uploads
              },
              onUploadProgress: (progressEvent) => {
                const percentCompleted = Math.round(
                  (progressEvent.loaded * 100) / progressEvent.total
                );
                setUploadProgress(percentCompleted);
              },
            }
          );
        
          console.log(response.data);
        } catch (error) {
          console.error("Error uploading video:", error);
          alert("Video upload failed.");
        } finally {
          setUploading(false);
          setTriggerUpload(false); // Reset trigger after upload
        }
      }
    };

    uploadVideo();
  }, [triggerUpload, userId, videoFile, title, description]); // Dependencies

  return (
    <div className={`${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-800"} min-h-screen flex justify-center items-center p-6 transition-all duration-300`}>
      <motion.div
        className={`${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"} max-w-3xl w-full border rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow`}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h3 className="text-center text-2xl font-semibold mb-4">
          📤 Upload Your Video
        </h3>

        {/* Video Preview */}
        {previewUrlVideo && (
          <motion.div 
            className="mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <h5 className="text-lg">🎥 Video Preview:</h5>
            <motion.video
              src={previewUrlVideo}
              controls
              className="w-full rounded-lg shadow-md"
              whileHover={{ scale: 1.02 }}
            />
          </motion.div>
        )}

        {/* Image Preview */}
        {previewUrlImage && (
          <motion.div 
            className="mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <h5 className="text-lg">🖼️ Image Preview:</h5>
            <motion.img
              src={previewUrlImage}
              className="w-full rounded-lg shadow-md"
              whileHover={{ scale: 1.02 }}
            />
          </motion.div>
        )}

        {/* Video Title Input */}
        <motion.input
          type="text"
          placeholder="Enter video title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={`${darkMode ? "bg-gray-700 text-white border-gray-600 focus:ring-blue-400" : "bg-white text-gray-800 border-gray-300 focus:ring-blue-500"} w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2`}
          whileFocus={{ scale: 1.02 }}
        />

        {/* Video Description Input */}
        <motion.input
          type="text"
          placeholder="Enter video description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={`${darkMode ? "bg-gray-700 text-white border-gray-600 focus:ring-blue-400" : "bg-white text-gray-800 border-gray-300 focus:ring-blue-500"} w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2`}
          whileFocus={{ scale: 1.02 }}
        />

        {/* File Input */}
        <motion.input
          type="file"
          accept="video/*"
          onChange={handleFileChange}
          className="w-full p-3 mb-4 border rounded-lg file:border-0 file:bg-blue-500 file:text-white file:rounded-lg focus:outline-none"
          whileHover={{ scale: 1.02 }}
        />

        {/* Upload Button */}
        <motion.button
          onClick={handleUpload}
          disabled={!videoFile || !title || !description || uploading}
          className="w-full py-3 mb-4 bg-gradient-to-r from-blue-500 to-teal-500 text-white rounded-lg shadow-md disabled:opacity-50"
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.05 }}
        >
          {uploading ? "Uploading..." : "Upload Video"}
        </motion.button>

        {/* Upload Progress Bar */}
        {uploading && (
          <motion.div 
            className="mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <h5 className="text-lg">🚀 Upload Progress:</h5>
            <div className="w-full bg-gray-200 rounded-full">
              <motion.div
                className="bg-blue-500 text-xs font-medium text-center text-white p-0.5 leading-none rounded-full"
                style={{ width: `${uploadProgress}%` }}
                animate={{ width: `${uploadProgress}%` }}
                transition={{ duration: 0.4 }}
              >
                {uploadProgress}%
              </motion.div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  
  );
};

export default Upload;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Button, Card, Spacer, Input, Progress } from "@nextui-org/react";
// import { useDispatch, useSelector } from "react-redux";
// import { GetDatabyProperty } from "../../redux/slices/userSlice/getUserSlice";
// const Upload = () => {
//   const [videoFile, setVideoFile] = useState(null);
//   const [previewUrl, setPreviewUrl] = useState("");
//   const [uploading, setUploading] = useState(false);
//   const [uploadProgress, setUploadProgress] = useState(0);
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const dispatch = useDispatch();

//   const userData = useSelector((state) => state.GetUserSlice.data);
//   const userStatus = useSelector((state) => state.GetUserSlice.status);

//   const params = {
//     userId: "google-oauth2|109802856839932564725",
//   };
//   useEffect(() => {
//     ("calll");
//     dispatch(
//       GetDatabyProperty({ endpoint: "/api/users/getUserByProperty", params })
//     );
//   }, []);
  
//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setVideoFile(file);
//       setPreviewUrl(URL.createObjectURL(file));
//     }
//   };

//   const handleUpload = async () => {
//     if (!videoFile || !title || !description) {
//       alert("Please fill out all fields and select a video file.");
//       return;
//     }
// const id=12121;
//     const userId = "google-oauth2|109802856839932564725";
  
//     setUploading(true);
    

//     try {
//       const formData = new FormData();
//       formData.append("file", videoFile);
//       formData.append("title", title); // Append title
//       formData.append("description", description); // Append description
//       formData.append("userId", id);
//       const response = await axios.post(
//         "http://localhost:5000/api/upload",
//         formData,
//         {
//           onUploadProgress: (progressEvent) => {
//             const percentCompleted = Math.round(
//               (progressEvent.loaded * 100) / progressEvent.total
//             );
//             setUploadProgress(percentCompleted);
//           },
//         }
//       );

//       ("Video uploaded successfully:", response.data);
//       alert("Video uploaded successfully!");
//     } catch (error) {
//       console.error("Error uploading video:", error);
//       alert("Video upload failed.");
//     } finally {
//       setUploading(false);
//     }
//   };

//   return (
//     <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
//       <Card bordered shadow={true} hoverable css={{ p: "$8" }}>
//         <h3 style={{ textAlign: "center" }}>Upload Your Video</h3>
//         <Spacer y={1} />

//         {previewUrl && (
//           <div style={{ marginBottom: "20px" }}>
//             <h5>Video Preview:</h5>
//             <video src={previewUrl} controls width="100%" />
//           </div>
//         )}

//         <Input
//           type="text"
//           placeholder="Enter video title"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           fullWidth
//           css={{ marginBottom: "20px" }}
//         />

//         <Input
//           type="text"
//           placeholder="Enter video description"
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//           fullWidth
//           css={{ marginBottom: "20px" }}
//         />
//         <Input
//           type="file"
//           accept="video/*"
//           onChange={handleFileChange}
//           fullWidth
//           css={{ marginBottom: "20px" }}
//         />
//         <Button
//           onClick={handleUpload}
//           disabled={!videoFile || !title || !description || uploading}
//           size="large"
//           color="gradient"
//           shadow
//         >
//           {uploading ? "Uploading..." : "Upload Video"}
//         </Button>

//         {uploading && (
//           <div style={{ marginTop: "20px" }}>
//             <h5>Upload Progress:</h5>
//             <Progress value={uploadProgress} />
//           </div>
//         )}
//       </Card>
//     </div>
//   );
// };

// export default Upload;
