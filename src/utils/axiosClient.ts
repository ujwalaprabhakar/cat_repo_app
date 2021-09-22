import axios from "axios";

const API_URL = "http://localhost:10000/v1/";
const TIMEOUT_IN_MS = 5 * 60 * 1000;
const axiosClient = axios.create({
  timeout: TIMEOUT_IN_MS,
  baseURL: API_URL,
});

export default axiosClient;
