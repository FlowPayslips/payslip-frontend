import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

export const setAuthToken = (token?: string) => {
  console.log("Setting auth token:", token);
  if (token) {
    console.log("Authorization header set");
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

    const originalRequest = error.config;
    console.log("Original request:", originalRequest);
    if (
      authFreePaths.some(path => originalRequest.url?.includes(path))
    ) {
      return Promise.reject(error);
    }

    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      console.log("Received 401, attempting token refresh");
      originalRequest._retry = true;

      if (isRefreshing) {
        console.log("Token refresh already in progress, queuing request");
        return new Promise(resolve => {
          refreshQueue.push(token => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            resolve(api(originalRequest));
          });
        });
      }

      isRefreshing = true;

      try {
        console.log("Refreshing token...");
        const refresh = localStorage.getItem("refreshToken");
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/token/refresh/`,
          { refresh }
        );
        console.log("Token refreshed:", res.data);
        const newAccess = res.data.access;
        localStorage.setItem("accessToken", newAccess);
        setAuthToken(newAccess);
        originalRequest.headers.Authorization = `Bearer ${newAccess}`;

        processQueue(newAccess);
        console.log(newAccess)
        console.log(originalRequest.headers.Authorization);
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
