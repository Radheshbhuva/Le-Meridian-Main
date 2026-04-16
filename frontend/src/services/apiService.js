import axios from "axios";
import API_URL from "../api";

// Util to get auth config for axios
const getAuthConfig = () => {
  const token = localStorage.getItem('token');
  return token ? { headers: { Authorization: `Bearer ${token}` } } : {};
};

// Register
export const registerUser = async (data) => {
  return await axios.post(`${API_URL}/auth/register`, data);
};

// Login
export const loginUser = async (data) => {
  return await axios.post(`${API_URL}/auth/login`, data);
};

// Get Rooms (public)
export const getRooms = async () => {
  return await axios.get(`${API_URL}/rooms`);
};

// Create Booking (protected)
export const createBooking = async (data) => {
  return await axios.post(`${API_URL}/bookings`, data, getAuthConfig());
};
