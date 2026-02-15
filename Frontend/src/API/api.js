import axios from "axios";

// Default to the backend's configured port (5001) if VITE_API_URL is not provided
const API = axios.create({ baseURL: import.meta.env.VITE_API_URL || "http://localhost:4000/api" });

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export default API;
