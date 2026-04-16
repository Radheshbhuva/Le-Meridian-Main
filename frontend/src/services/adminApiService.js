import axiosInstance from "./axiosInstance";

// Admin CRUD for Rooms
export const getRoomsAdmin = async (config = {}) => axiosInstance.get(`/api/rooms`, config);
export const createRoom = async (data, config = {}) => axiosInstance.post(`/api/rooms`, data, config);
export const updateRoom = async (id, data, config = {}) => axiosInstance.put(`/api/rooms/${id}`, data, config);
export const deleteRoom = async (id, config = {}) => axiosInstance.delete(`/api/rooms/${id}`, config);

// Bookings
export const getBookingsAdmin = async (config = {}) => axiosInstance.get(`/api/bookings`, config);
export const updateBookingAdmin = async (id, data, config = {}) => axiosInstance.put(`/api/bookings/${id}`, data, config);
export const deleteBookingAdmin = async (id, config = {}) => axiosInstance.delete(`/api/bookings/${id}`, config);

// Dining
export const getDiningItems = async (config = {}) => axiosInstance.get(`/api/dining`, config);
export const createDiningItem = async (data, config = {}) => axiosInstance.post(`/api/dining`, data, config);
export const updateDiningItem = async (id, data, config = {}) => axiosInstance.put(`/api/dining/${id}`, data, config);
export const deleteDiningItem = async (id, config = {}) => axiosInstance.delete(`/api/dining/${id}`, config);

// Events
export const getEventsAdmin = async (config = {}) => axiosInstance.get(`/api/events`, config);
export const createEvent = async (data, config = {}) => axiosInstance.post(`/api/events`, data, config);
export const updateEvent = async (id, data, config = {}) => axiosInstance.put(`/api/events/${id}`, data, config);
export const deleteEvent = async (id, config = {}) => axiosInstance.delete(`/api/events/${id}`, config);

// Offers
export const getOffersAdmin = async (config = {}) => axiosInstance.get(`/api/offers`, config);
export const createOffer = async (data, config = {}) => axiosInstance.post(`/api/offers`, data, config);
export const updateOffer = async (id, data, config = {}) => axiosInstance.put(`/api/offers/${id}`, data, config);
export const deleteOffer = async (id, config = {}) => axiosInstance.delete(`/api/offers/${id}`, config);

// Spa
export const getSpaServices = async (config = {}) => axiosInstance.get(`/api/spa`, config);
export const createSpaService = async (data, config = {}) => axiosInstance.post(`/api/spa`, data, config);
export const updateSpaService = async (id, data, config = {}) => axiosInstance.put(`/api/spa/${id}`, data, config);
export const deleteSpaService = async (id, config = {}) => axiosInstance.delete(`/api/spa/${id}`, config);

// Gallery - special upload
export const getGalleryAdmin = async (config = {}) => axiosInstance.get(`/api/gallery`, config);
export const uploadGalleryImages = async (files, config = {}) => {
  const formData = new FormData();
  files.forEach(file => formData.append('images', file));
  return axiosInstance.post(`/api/gallery`, formData, { 
    ...config,
    headers: { ...config.headers, 'Content-Type': 'multipart/form-data' }, 
  });
};
export const deleteGalleryImage = async (id, config = {}) => axiosInstance.delete(`/api/gallery/${id}`, config);

// Auth - User registration/login
export const registerUser = async (data, config = {}) => axiosInstance.post(`/api/auth/register`, data, config);
export const loginUser = async (data, config = {}) => axiosInstance.post(`/api/auth/login`, data, config);
export const loginAdmin = async (data, config = {}) => axiosInstance.post(`/api/auth/login`, data, config);
