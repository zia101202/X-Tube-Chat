import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_UR,
  withCredentials: true,
});

// Function to get data (Read)
export const getData = async (endpoint) => {

  try {
    const response = await api.get(endpoint);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const getDatabyProperty = async ({endpoint,params} ) => {
 
  try {
   
    const response = await api.get(endpoint, {params}  );
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

// Function to create new data (Create)
 // Adjust the import path as necessary

export const createData = async ({ endpoint, data }) => {
  try {
    const response = await api.post(endpoint, data);
    
    return response.data; // Return the response data
  } catch (error) {
    console.error("Error creating data:", error.response?.data?.message || error.message);
    throw new Error(error.response?.data?.message || 'Error creating data'); // Throw the error to be caught in the thunk
  }
};


export const createDataWithImagesFun = async ({ endpoint,formData }) => {
  console.log(formData.get("groupImage"))
  try {
    const response = await api.post(endpoint,formData);
 
    return response.data; // Return the response data
  } catch (error) {
    console.error("Error creating data:", error.response?.data?.message || error.message);
    throw new Error(error.response?.data?.message || 'Error creating data'); // Throw the error to be caught in the thunk
  }
};
export const createDataPartially = async ({ endpoint, userID }) => {
  try {
   
    const response = await api.patch(endpoint, {
      userID:userID
    });
    return response.data; // Return the response data
  } catch (error) {
    console.error("Error creating data:", error.response?.data?.message || error.message);
    throw new Error(error.response?.data?.message || 'Error creating data'); // Throw the error to be caught in the thunk
  }
};


// Function to update existing data (Update)
export const updateData = async (endpoint, data) => {
  try {
    const response = await api.put(endpoint, data);
    return response.data;
  } catch (error) {
    console.error("Error updating data:", error);
    throw error;
  }
};

// Function to delete data (Delete)
export const deleteData = async (endpoint) => {
  try {
    const response = await api.delete(endpoint);
    return response.data; // Usually returns confirmation of deletion
  } catch (error) {
    console.error("Error deleting data:", error);
    throw error;
  }
};
