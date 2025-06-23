import axios from "axios";

export const _axios = axios.create({
  // baseURL: "https://opal-store-master-pjax6i.larad/api/v1",
  // baseURL: "https://opal-store-master-pjax6i.laravel.cloud/api/v1",
  // baseURL: "/api/v1",
  // baseURL: "http://127.0.0.1:8000/api/admin/v1/",
  baseURL: "http://82.137.231.35:8001/api/admin/v1/",
});

export const _axiosF = axios.create({
  // baseURL: "https://opal-store-master-pjax6i.larad/api/v1",
  // baseURL: "https://opal-store-master-pjax6i.laravel.cloud/api/v1",
  // baseURL: "/api/v1",
  // baseURL: "http://127.0.0.1:8000/api/v1/",
  baseURL: "http://82.137.231.35:8001/api/v1/",
});

// set token to header in all website
// _axios.interceptors.request.use(
//   (config) => {
//     const token =
//       localStorage.getItem("temp_token") || localStorage.getItem("token");

//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }

//     if (!(config.data instanceof FormData) && !config.headers["Content-Type"]) {
//       config.headers["Content-Type"] = "application/json";
//     }

//     return config;
//   },
//   (error) => Promise.reject(error)
// );

_axios.interceptors.request.use(
  (config) => {
    const token =
      localStorage.getItem("temp_token") || localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);
