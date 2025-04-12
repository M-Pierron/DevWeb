import axios from 'axios';

const API = axios.create({ baseURL: "http://localhost:5000/api/auth" });

// Intercepteur pour ajouter le token aux requêtes
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Authentification
export const register = (data) => API.post("/register", data);
export const login = (data) => API.post("/login", data);
export const verifyToken = () => API.post("/verifyToken");

// Admin management
export const getAllUsers = () => API.get("/users");
export const updateUser = (userId, data) => API.put(`/users/${userId}`, data);
export const deleteUser = (userId) => API.delete(`/users/${userId}`);
export const createUser = (data) => API.post("/users", data);
export const getPendingUsers = () => API.get("/pending-users");
export const verifyUser = (data) => API.post("/verify-user", data);

// Profil utilisateur
export const getProfile = () => API.get("/profile");
export const updateProfile = (data) => API.put("/profile/update", data);

// Dashboard
export const getUserDashboard = () => API.get("/user-dashboard");
export const getAdminDashboard = () => API.get("/admin-dashboard");

export default API;
