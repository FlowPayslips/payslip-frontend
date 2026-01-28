import { setAuthToken } from "./api";

export const logout = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  setAuthToken(undefined);
  window.location.href = "/login";
};
