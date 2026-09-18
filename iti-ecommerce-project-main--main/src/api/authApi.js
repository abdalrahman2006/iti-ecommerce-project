
import axiosInstance from "./axiosInstance";

// Register
export const registerUser = async (userData) => {
  const response = await axiosInstance.post("/users/register", userData);

  return response.data;
};

// Login
export const loginUser = async (credentials) => {
  const response = await axiosInstance.post("/users/login", credentials);

  return response.data;
};

// Get current user
export const getCurrentUser = async () => {
  const response = await axiosInstance.get("/users/current-user");

  return response.data;
};

// Refresh token
export const refreshToken = async () => {
  const response = await axiosInstance.post("/users/refresh-token");

  return response.data;
};

