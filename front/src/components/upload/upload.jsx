import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Card, Spacer, Input, Progress } from "@nextui-org/react";
import { useAuth0 } from "@auth0/auth0-react";
import { useSelector } from "react-redux";
const Upload = () => {
  const [videoFile, setVideoFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [triggerUpload, setTriggerUpload] = useState(false); // New state for triggering upload
  const { user } = useAuth0();
  const {  error, status,userID } = useSelector((state) => state.userSlice);
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVideoFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const userId = user?.sub;

  const handleUpload = () => {
    if (!videoFile || !title || !description) {
      alert("Please fill out all fields and select a video file.");
      return;
    }
    setTriggerUpload(true); // Trigger the upload
  };

  useEffect(() => {
    const uploadVideo = async () => {
      if (triggerUpload && userId) {
        const formData = new FormData();
        formData.append("file", videoFile);
        formData.append("title", title);
        formData.append("description", description);
        formData.append("userID", userID);
console.log(userID)
        setUploading(true);
console.log(formData)
        try {
          const response = await axios.post(
            "http://localhost:5000/api/upload",
            formData,
            {
              onUploadProgress: (progressEvent) => {
                const percentCompleted = Math.round(
                  (progressEvent.loaded * 100) / progressEvent.total
                );
                setUploadProgress(percentCompleted);
              },
            }
          );
          console.log("Video uploaded successfully:", response.data);
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
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
      <Card bordered shadow={true} hoverable css={{ p: "$8" }}>
        <h3 style={{ textAlign: "center" }}>Upload Your Video</h3>
        <Spacer y={1} />

        {previewUrl && (
          <div style={{ marginBottom: "20px" }}>
            <h5>Video Preview:</h5>
            <video src={previewUrl} controls width="100%" />
          </div>
        )}

        <Input
          type="text"
          placeholder="Enter video title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          css={{ marginBottom: "20px" }}
        />

        <Input
          type="text"
          placeholder="Enter video description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          css={{ marginBottom: "20px" }}
        />

        <Input
          type="file"
          accept="video/*"
          onChange={handleFileChange}
          fullWidth
          css={{ marginBottom: "20px" }}
        />

        <Button
          onClick={handleUpload}
          disabled={!videoFile || !title || !description || uploading}
          size="large"
          color="gradient"
          shadow
        >
          {uploading ? "Uploading..." : "Upload Video"}
        </Button>

        {uploading && (
          <div style={{ marginTop: "20px" }}>
            <h5>Upload Progress:</h5>
            <Progress value={uploadProgress} />
          </div>
        )}
      </Card>
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
//     console.log("calll");
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

//       console.log("Video uploaded successfully:", response.data);
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
