"use client";

import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";

const fetchCompanies = async () => {
  const res = await api.get("/api/companies/");
  return res.data;
};

export default function CompaniesPage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["companies"],
    queryFn: fetchCompanies,
  });

  if (isLoading) return <p className="p-6">Loading companies…</p>;
  if (error) return <p className="p-6 text-red-600">Failed to load companies</p>;

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">Companies</h1>
      <pre className="bg-gray-900 p-4 rounded text-sm">
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
}
