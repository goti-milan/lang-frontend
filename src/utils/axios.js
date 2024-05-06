import { default as axios } from "axios";
import Cookies from "js-cookie";

export const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5001/api/v1/"
    : "https://minr-backend-express.herokuapp.com/api/v1/";

const httpClient = axios.create({
  baseURL: url,
});

httpClient.defaults.withCredentials = true;

httpClient.interceptors.request.use(function (config) {
  const token = Cookies.get("jwt");
  if (token) {
    config.headers.Authorization = token ? `Bearer ${token}` : "";
  }
  return config;
});

httpClient.interceptors.response.use(function (response) {
  return response;
}, (error) => {
  if (error.response.status === 401) {
    Cookies.remove("role")
    Cookies.remove("jwt")
    window.location.href = "/login";
  }
  console.log("error", error);
  throw Error(error);
});

export default httpClient;
