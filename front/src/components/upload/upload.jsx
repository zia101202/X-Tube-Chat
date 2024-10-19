import React, { useState } from 'react';
import axios from 'axios';
import { Button, Card, Spacer, Input, Progress } from '@nextui-org/react';

const Upload = () => {
  const [videoFile, setVideoFile] = useState(null); // Stores the selected video file
  const [previewUrl, setPreviewUrl] = useState(''); // Stores the video preview URL
  const [uploading, setUploading] = useState(false); // Tracks if uploading is in progress
  const [uploadProgress, setUploadProgress] = useState(0); // Tracks upload percentage

  // Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVideoFile(file);
      setPreviewUrl(URL.createObjectURL(file)); // Generate preview URL
    }
  };

  // Upload the video to the backend
  const handleUpload = async () => {
    if (!videoFile) {
      alert('Please select a video file first');
      return;
    }

    const formData = new FormData();
    formData.append('file', videoFile); // Append the video file to form data
    setUploading(true); // Set uploading state to true

    try {
      const response = await axios.post(
        'http://localhost:5000/api/upload', // Your backend endpoint
        formData,
        {
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setUploadProgress(percentCompleted); // Update upload progress
          },
        }
      );

      console.log('Video uploaded successfully:', response.data.public_id);
      alert('Video uploaded successfully!'); // Notify user of success
    } catch (error) {
      console.error('Error uploading video:', error);
      alert('Video upload failed.'); // Notify user of failure
    } finally {
      setUploading(false); // Reset uploading state
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <Card bordered shadow={true} hoverable css={{ p: '$8' }}>
        <h3>Upload Your Video</h3>
        <Spacer y={1} />

        {/* File Input */}
        <Input
          type="file"
          accept="video/*" // Accepts only video files
          onChange={handleFileChange}
          fullWidth
          css={{ marginBottom: '20px' }}
        />

        {/* Video Preview */}
        {previewUrl && (
          <div style={{ marginBottom: '20px' }}>
            <h5>Video Preview:</h5>
            <video src={previewUrl} controls width="100%" />
          </div>
        )}

        {/* Upload Button */}
        <Button
          onClick={handleUpload}
          disabled={!videoFile || uploading} // Disable button if no file or uploading
          size="large"
          color="gradient"
          shadow
        >
          {uploading ? 'Uploading...' : 'Upload Video'}
        </Button>

        {/* Progress Indicator */}
        {uploading && (
          <div style={{ marginTop: '20px' }}>
            <h5>Upload Progress:</h5>
            <Progress value={uploadProgress} />
          </div>
        )}
      </Card>
    </div>
  );
};

export default Upload;
