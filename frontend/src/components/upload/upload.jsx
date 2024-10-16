import React, { useState } from 'react';
import axios from 'axios';
import { Button, Card, Spacer, Text, Input, Progress } from '@nextui-org/react';

const Upload = () => {
  const [videoFile, setVideoFile] = useState(null); // Stores the selected video file
  const [previewUrl, setPreviewUrl] = useState(''); // Stores the video preview URL
  const [uploading, setUploading] = useState(false); // Tracks the upload progress
  const [uploadProgress, setUploadProgress] = useState(0); // Tracks upload percentage

  // Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVideoFile(file);
      setPreviewUrl(URL.createObjectURL(file)); // Generate preview URL
    }
  };

  // Upload the video to Cloudinary
  const handleUpload = async () => {
    if (!videoFile) {
      alert('Please select a video file first');
      return;
    }

    const formData = new FormData();
    formData.append('file', videoFile);
    formData.append('upload_preset', 'your_upload_preset'); // Replace with your Cloudinary preset
    setUploading(true);

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/video/upload`,
        formData,
        {
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setUploadProgress(percentCompleted);
          },
        }
      );

      console.log('Video uploaded successfully:', response.data.secure_url);
      alert('Video uploaded successfully!');
    } catch (error) {
      console.error('Error uploading video:', error);
      alert('Video upload failed.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <Card bordered shadow={true} hoverable css={{ p: '$8' }}>
        <Text h3>Upload Your Video</Text>
        <Spacer y={1} />
        
        {/* File Input */}
        <Input
          type="file"
          accept="video/*"
          onChange={handleFileChange}
          fullWidth
          css={{ marginBottom: '20px' }}
        />
        
        {/* Video Preview */}
        {previewUrl && (
          <div style={{ marginBottom: '20px' }}>
            <Text h5>Video Preview:</Text>
            <video src={previewUrl} controls width="100%" />
          </div>
        )}
        
        {/* Upload Button */}
        <Button
          onClick={handleUpload}
          disabled={!videoFile || uploading}
          size="large"
          color="gradient"
          shadow
        >
          {uploading ? 'Uploading...' : 'Upload Video'}
        </Button>
        
        {/* Progress Indicator */}
        {uploading && (
          <div style={{ marginTop: '20px' }}>
            <Text h5>Upload Progress:</Text>
            <Progress value={uploadProgress} />
          </div>
        )}
      </Card>
    </div>
  );
};

export default Upload;
