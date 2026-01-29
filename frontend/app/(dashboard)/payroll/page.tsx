"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";
import Link from "next/link";
import { useState } from "react";

const fetchPayruns = async () => {
  const res = await api.get("/api/payruns/");
  return res.data;
};

export default function PayrollPage() {
  const now = new Date();
  const [month, setMonth] = useState(now.getMonth() + 1);
  const [year, setYear] = useState(now.getFullYear());

  const queryClient = useQueryClient();

  const { data, isPending, error } = useQuery({
    queryKey: ["payruns"],
    queryFn: fetchPayruns,
  });

  const createPayrun = useMutation({
    mutationFn: (payload: { month: number; year: number }) =>
        api.post("/api/payruns/", payload),
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["payruns"] });
    },
  });


  if (isPending) return <p className="p-6">Loading payruns…</p>;
  if (error) return <p className="p-6 text-red-600">Failed to load payruns</p>;

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-xl font-semibold">Payruns</h1>

      <div className="flex items-end gap-3">
        <div>
            <label className="block text-sm mb-1">Month</label>
            <select
            value={month}
            onChange={(e) => setMonth(Number(e.target.value))}
            className="border p-2 rounded"
            >
            {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                <option key={m} value={m}>
                {m}
                </option>
            ))}
            </select>
        </div>

        <div>
            <label className="block text-sm mb-1">Year</label>
            <input
            type="number"
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
            className="border p-2 rounded w-24"
            />
        </div>

        <button
            onClick={() => createPayrun.mutate({ month, year })}
            disabled={createPayrun.isPending}
            className="bg-gray-800 text-white px-4 py-2 rounded disabled:opacity-50"
        >
            Create Payrun
        </button>
        </div>
      {createPayrun.isError && (
        <p className="text-sm text-red-600">
            Failed to create payrun. It may already exist.
        </p>
        )}


      <table className="w-full border text-sm">
        <thead className="bg-gray-900">
          <tr>
            <th className="p-2 border">ID</th>
            <th className="p-2 border">Month</th>
            <th className="p-2 border">Year</th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border">Processed At</th>
            <th className="p-2 border">Created At</th>
          </tr>
        </thead>
        <tbody>
        {data.map((p: any) => (
            <tr key={p.id} className="hover:bg-gray-10">
            <td className="p-2 border"><Link
                href={`/payroll/${p.id}`}
                className="underline"
                >
                {p.id}
                </Link></td>
            <td className="p-2 border">
                {p.month}
            </td>
            <td className="p-2 border">{p.year}</td>
            <td className="p-2 border capitalize">{p.status}</td>
            <td className="p-2 border">
                {p.processed_at ?? "-"}
            </td>
            <td className="p-2 border">{p.created_at}</td>
            </tr>
        ))}
        </tbody>

      </table>
    </div>
  );
}
