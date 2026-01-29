import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";

const fetchMe = async () => {
  const res = await api.get("/api/me/");
  return res.data;
};

export const useMe = () => {
  return useQuery({
    queryKey: ["me"],
    queryFn: fetchMe,
  });
};
