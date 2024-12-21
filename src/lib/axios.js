import axios from "axios";

const baseUrl = "https://test-fe.sidak.co.id";

const apiInstance = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiInstance;
