import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3001/api/v1",
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  },
});

const setAuthToken = token => {
  if (token) {
    // Apply for every request
    API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    // Delete auth header
    delete API.defaults.headers.common['Authorization'];
  }
};

export default API;
export { setAuthToken };