import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/api/auth" });

// Authentification
export const register = (data) => API.post("/register", data);
export const login = (data) => API.post("/login", data);
export const getProfile = (token) => 
    API.get("/profile", { headers: { Authorization: `Bearer ${token}` } });

// Dashboard (vérifie que ces routes existent bien côté backend)
export const getUserDashboard = (token) =>
    API.get("/user-dashboard", { headers: { Authorization: `Bearer ${token}` } });
export const getAdminDashboard = (token) =>
    API.get("/admin-dashboard", { headers: { Authorization: `Bearer ${token}` } });
