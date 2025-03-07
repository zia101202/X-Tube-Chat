import { useState } from "react";
import { Card, CardContent } from "@mui/material";
import { Input, Button, TextField, Typography } from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";
import { useSelector } from "react-redux";

export default function ProfileUpdate() {
  const [profile, setProfile] = useState({
    image: "",
    nickname: "",
    dob: "",
    education: "",
    resident: "",
    bio: ""
  });
  const { darkModel } = useSelector((state) => state.darkModelSlice);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append("nickname", profile.nickname);
    formData.append("dob", profile.dob);
    formData.append("education", profile.education);
    formData.append("resident", profile.resident);
    formData.append("bio", profile.bio);
    

    if (profile.imageFile) {
      formData.append("profile", profile.imageFile);
    } else {
      alert("Please select an image!");
      return;
    }
  
    try {
      
      const response = await fetch(`${import.meta.env.VITE_API_UR}/api/users/updateUser`, {
        credentials: "include",  // ✅ Allows cookies to be sent
        method: "POST",
        body: formData, // Sending FormData
      });
      
      const data = await response.json();
      console.log(data );
      if (response.ok) {
        alert("Profile updated successfully!");
      } else {
       console.log(data);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };
  
  return (
    <div className={`flex justify-center items-center min-h-screen p-6 ${darkModel ? "bg-gray-900 text-white" : "bg-gray-100 text-black"}`}>
      <Card className={`w-full max-w-lg p-6 rounded-2xl shadow-lg ${darkModel ? "bg-gray-900" : "bg-white"}`}>
        <CardContent className={`flex flex-col  gap-4 ${darkModel ? "bg-gray-900 text-white" : "bg-white text-black"}`}>
          <div className="flex flex-col items-center gap-3">
            
          <label htmlFor="imageUpload" className="cursor-pointer">
          <input
  type="file"
  accept="image/*"
  className="hidden"
  id="imageUpload"
  onChange={(e) => {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      setProfile((prev) => ({
        ...prev,
        imageFile: file,  // ✅ Store actual file
        image: URL.createObjectURL(file) // ✅ Preview image
      }));
    }
  }}
/>

  {profile.image ? (
    <img
      src={profile.image}
      alt="Profile Preview"
      className="w-24 h-24 rounded-full object-cover border border-gray-300"
    />
  ) : (
    <div className={`w-24 h-24 flex items-center justify-center   ${darkModel ? "bg-gray-500 ":"bg-gray-200"}  rounded-full`}>
      <PhotoCamera fontSize="large" />
    </div>
  )}
</label>

          </div>

          <div>
            <Typography variant="subtitle1">Nickname</Typography>
            <TextField
              type="text"
              name="nickname"
              value={profile.nickname}
              onChange={handleChange}
              placeholder="Enter your nickname"
              fullWidth
              InputProps={{ style: { color: darkModel ? "white" : "black", backgroundColor: darkModel ? "#333" : "white" } }}
            />
          </div>

          <div>
            <Typography variant="subtitle1">Date of Birth</Typography>
            <TextField
              type="date"
              name="dob"
              value={profile.dob}
              onChange={handleChange}
              fullWidth
              InputProps={{ style: { color: darkModel ? "white" : "black", backgroundColor: darkModel ? "#333" : "white" } }}
            />
          </div>

          <div>
            <Typography variant="subtitle1">Education</Typography>
            <TextField
              type="text"
              name="education"
              value={profile.education}
              onChange={handleChange}
              placeholder="Your education details"
              fullWidth
              InputProps={{ style: { color: darkModel ? "white" : "black", backgroundColor: darkModel ? "#333" : "white" } }}
            />
          </div>

          <div>
            <Typography variant="subtitle1">Resident</Typography>
            <TextField
              type="text"
              name="resident"
              value={profile.resident}
              onChange={handleChange}
              placeholder="Your residence"
              fullWidth
              InputProps={{ style: { color: darkModel ? "white" : "black", backgroundColor: darkModel ? "#333" : "white" } }}
            />
          </div>

          <div>
            <Typography variant="subtitle1">Bio</Typography>
            <TextField
              type="text"
              name="bio"
              value={profile.bio}
              onChange={handleChange}
              placeholder="Short bio about yourself"
              fullWidth
              InputProps={{ style: { color: darkModel ? "white" : "black", backgroundColor: darkModel ? "#333" : "white" } }}
            />
          </div>

          <Button className="mt-4" variant="contained" onClick={handleSubmit} color="primary">Save Profile</Button>
        </CardContent>
      </Card>
    </div>
  );
}
