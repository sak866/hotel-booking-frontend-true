import axios from "axios";

const api = axios.create({
  baseURL: "https://hotel-booking-backend-3-hdql.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
