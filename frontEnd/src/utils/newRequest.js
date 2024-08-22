import axios from "axios";

const newRequests = axios.create({
  baseURL: "https://gita-backend.onrender.com/api/",
  withCredentials: true,
});

export default newRequests;
