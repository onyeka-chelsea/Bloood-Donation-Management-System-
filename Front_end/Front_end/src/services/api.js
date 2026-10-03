import axios from "axios";

// Change this to your deployed backend URL later (Render, etc.)
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach the JWT token to every request automatically, if we have one
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("bloodlink_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// If the backend says the token is invalid/expired, log the user out
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("bloodlink_token");
      localStorage.removeItem("bloodlink_user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// ---- Auth ----
export const registerUser = (data) => api.post("/auth/register", data);
export const loginUser = (data) => api.post("/auth/login", data);
export const getCurrentUser = () => api.get("/auth/me");

// ---- Donor ----
export const getDonorProfile = () => api.get("/donors/me");
export const bookDonation = (data) => api.post("/donations/book", data);
export const getDonationHistory = () => api.get("/donations/history");

// ---- Hospital ----
export const createBloodRequest = (data) => api.post("/requests", data);
export const getHospitalRequests = () => api.get("/requests/mine");

// ---- Blood Bank ----
export const getInventory = () => api.get("/inventory");
export const updateInventory = (id, data) => api.put(`/inventory/${id}`, data);

// ---- Admin ----
export const getAllUsers = () => api.get("/admin/users");
export const getSystemStats = () => api.get("/admin/stats");

export default api;