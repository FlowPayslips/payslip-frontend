"use client";

import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";

const fetchMembers = async () => {
  const res = await api.get("/api/employees/");
  return res.data;
};

export default function MembersPage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["employees"],
    queryFn: fetchMembers,
  });

  if (isLoading) return <p className="p-6">Loading members…</p>;
  if (error) return <p className="p-6 text-red-600">Failed to load members</p>;

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">Members</h1>
      <pre className="bg-gray-900 p-4 rounded text-sm">
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
}
