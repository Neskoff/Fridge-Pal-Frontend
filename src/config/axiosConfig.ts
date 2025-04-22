import axios from "axios";
import mainConfig from "./mainConfig";

const apiClient = axios.create({
  baseURL: mainConfig.apiUrl,
});

// Add a request interceptor
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = "Bearer " + token;
    }
    return config;
  },
  (error) => Promise.reject(error).then(() => console.log(error)),
);

export default apiClient;
