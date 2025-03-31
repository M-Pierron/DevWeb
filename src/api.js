import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

export const register = (data) => API.post("/register", data);
export const login = (data) => API.post("/login", data);
export const getUserDashboard = (token) =>
    API.get("/user-dashboard", { headers: { Authorization: `Bearer ${token}` } });
export const getAdminDashboard = (token) =>
    API.get("/admin-dashboard", { headers: { Authorization: `Bearer ${token}` } });
