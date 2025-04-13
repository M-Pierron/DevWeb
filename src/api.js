import axios from 'axios';

const API = axios.create({ baseURL: "http://localhost:5000/api" });

// Interceptor to add token to requests
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Authentication
export const auth = {
  register: (data) => API.post("/auth/register", data),
  login: (data) => API.post("/auth/login", data),
  verifyToken: () => API.post("/auth/verifyToken"),
  getProfile: () => API.get("/auth/profile"),
  updateProfile: (data) => API.put("/auth/profile/update", data)
};

// Admin management
export const admin = {
  getAllUsers: () => API.get("/auth/users"),
  updateUser: (userId, data) => API.put(`/auth/users/${userId}`, data),
  deleteUser: (userId) => API.delete(`/auth/users/${userId}`),
  createUser: (data) => API.post("/auth/users", data),
  getPendingUsers: () => API.get("/auth/pending-users"),
  verifyUser: (data) => API.post("/auth/verify-user", data),
  getDashboard: () => API.get("/auth/admin-dashboard")
};

// Categories
export const categories = {
  getAll: () => API.get("/categories"),
  edit: (data) => API.post("/categories/edit", data),
  create: (data) => API.post("/categories/create", data),
  delete: (id) => API.delete(`/categories/${id}`)
};

// Objects
export const objects = {
  getAll: () => API.get("/objects"),
  edit: (data) => API.post("/objects/edit", data),
  create: (data) => API.post("/objects/create", data),
  delete: (id) => API.delete(`/objects/${id}`),
  filterByCategory: (categoryName) => API.get(`/objects/filter?category=${encodeURIComponent(categoryName)}`)
};

// Dashboard
export const dashboard = {
  getUser: () => API.get("/auth/user-dashboard"),
  getAdmin: () => API.get("/auth/admin-dashboard")
};

export default API;