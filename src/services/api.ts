import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api", // Replace with your backend URL
  withCredentials: true, // To include cookies (for refresh tokens)
});

export default api;
