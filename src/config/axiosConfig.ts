import axios from "axios";
import mainConfig from "./mainConfig";

const apiClient = axios.create({
  baseURL: mainConfig.apiUrl,
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // Add authorization header or other modifications
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Handle request errors without console.log
    return Promise.reject(error);
  },
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => {
    // Process successful responses
    return response; // Return just the data portion
  },
  (error) => {
    if (error.response) {
      if (error.response.status === 403) {
        localStorage.removeItem("token");
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  },
);

export default apiClient;
