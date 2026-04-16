import axios from "axios";
import API_URL from "../api";

// Get auth config for axios (proper format)
const getAuthConfig = () => {
  const token = localStorage.getItem('token');
  return token ? { headers: { Authorization: `Bearer ${token}` } } : {};
};

// ROOMS CRUD
export const getRoomsAdmin = () => axios.get(`${API_URL}/admin/rooms`, getAuthConfig());
export const createRoom = (data) => axios.post(`${API_URL}/admin/rooms`, data, getAuthConfig());
export const updateRoom = (id, data) => axios.put(`${API_URL}/admin/rooms/${id}`, data, getAuthConfig());
export const deleteRoom = (id) => axios.delete(`${API_URL}/admin/rooms/${id}`, getAuthConfig());

// DINING CRUD
export const getDiningAdmin = () => axios.get(`${API_URL}/admin/dining`, getAuthConfig());
export const createDining = (data) => axios.post(`${API_URL}/admin/dining`, data, getAuthConfig());
export const updateDining = (id, data) => axios.put(`${API_URL}/admin/dining/${id}`, data, getAuthConfig());
export const deleteDining = (id) => axios.delete(`${API_URL}/admin/dining/${id}`, getAuthConfig());

// SPA CRUD
export const getSpaAdmin = () => axios.get(`${API_URL}/admin/spa`, getAuthConfig());
export const createSpa = (data) => axios.post(`${API_URL}/admin/spa`, data, getAuthConfig());
export const updateSpa = (id, data) => axios.put(`${API_URL}/admin/spa/${id}`, data, getAuthConfig());
export const deleteSpa = (id) => axios.delete(`${API_URL}/admin/spa/${id}`, getAuthConfig());

// EVENTS CRUD
export const getEventsAdmin = () => axios.get(`${API_URL}/admin/events`, getAuthConfig());
export const createEvent = (data) => axios.post(`${API_URL}/admin/events`, data, getAuthConfig());
export const updateEvent = (id, data) => axios.put(`${API_URL}/admin/events/${id}`, data, getAuthConfig());
export const deleteEvent = (id) => axios.delete(`${API_URL}/admin/events/${id}`, getAuthConfig());

// OFFERS CRUD
export const getOffersAdmin = () => axios.get(`${API_URL}/admin/offers`, getAuthConfig());
export const createOffer = (data) => axios.post(`${API_URL}/admin/offers`, data, getAuthConfig());
export const updateOffer = (id, data) => axios.put(`${API_URL}/admin/offers/${id}`, data, getAuthConfig());
export const deleteOffer = (id) => axios.delete(`${API_URL}/admin/offers/${id}`, getAuthConfig());

// GALLERY CRUD
export const getGalleryAdmin = () => axios.get(`${API_URL}/admin/gallery`, getAuthConfig());
export const createGallery = (data) => axios.post(`${API_URL}/admin/gallery`, data, getAuthConfig());
export const updateGallery = (id, data) => axios.put(`${API_URL}/admin/gallery/${id}`, data, getAuthConfig());
export const deleteGallery = (id) => axios.delete(`${API_URL}/admin/gallery/${id}`, getAuthConfig());
