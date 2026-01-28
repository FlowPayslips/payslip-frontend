"use client";

import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import LogoutButton from "@/components/LogoutButton";

const fetchCompanies = async () => {
  const res = await api.get("/api/companies/");
  return res.data;
};

export default function DashboardPage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["companies"],
    queryFn: fetchCompanies,
  });

  if (isLoading) {
    return <p className="p-6">Loading…</p>;
  }

  if (error) {
    return <p className="p-6 text-red-600">Something broke</p>;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold">Dashboard</h1>
        <LogoutButton />
      </div>

      <pre className="p-4 rounded text-sm">
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
}
