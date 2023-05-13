import axios from "axios";

const BASE_URL = "https://api.openweathermap.org/data/2.5";

const API_KEY = "e8b0b120c79ecc96aa37d69096620b27";

const api = axios.create({
  baseURL: BASE_URL,
});

api.interceptors.request.use((config) => {
  config.url = `${config.url}&units=metric&appid=${API_KEY}`;
  return config;
});

export default api;
