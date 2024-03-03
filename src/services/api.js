import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5432",
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  },
});

export default api;