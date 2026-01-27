import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

export const setAuthToken = (token?: string) => {
  console.log("Setting auth token:", token);
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
};

let isRefreshing = false;
let refreshQueue: ((token: string) => void)[] = [];

const processQueue = (token: string) => {
  refreshQueue.forEach(cb => cb(token));
  refreshQueue = [];
};

api.interceptors.response.use(
  res => res,
  async error => {
    const authFreePaths = [
      "/api/auth/token/",
      "/api/auth/token/refresh/",
    ];

    if (
      authFreePaths.some(path => originalRequest.url?.includes(path))
    ) {
      return Promise.reject(error);
    }
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise(resolve => {
          refreshQueue.push(token => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            resolve(api(originalRequest));
          });
        });
      }

      isRefreshing = true;

      try {
        const refresh = localStorage.getItem("refreshToken");
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/token/refresh/`,
          { refresh }
        );

        const newAccess = res.data.access;
        localStorage.setItem("accessToken", newAccess);
        setAuthToken(newAccess);

        processQueue(newAccess);
        return api(originalRequest);
      } catch {
        localStorage.clear();
        window.location.href = "/login";
        return Promise.reject(error);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;
