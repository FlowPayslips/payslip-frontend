import api from "./api";

export const login = async (email: string, password: string) => {
  const res = await api.post("/api/auth/token/", {
    username: email,
    password,
  });
  return res.data;
};
