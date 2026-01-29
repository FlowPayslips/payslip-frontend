"use client";

import { useParams } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";

const fetchPayrun = async (id: string) => {
  const res = await api.get(`/api/payruns/${id}/`);
  return res.data;
};

export default function PayrunDetailPage() {
  const { id } = useParams<{ id: string }>();
  const queryClient = useQueryClient();

  const { data, isPending, error } = useQuery({
    queryKey: ["payrun", id],
    queryFn: () => fetchPayrun(id),
  });

  const processPayrun = useMutation({
    mutationFn: () =>
      api.post(`/api/payruns/${id}/process/`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["payrun", id] });
      queryClient.invalidateQueries({ queryKey: ["payruns"] });
    },
  });

  const lockPayrun = useMutation({
    mutationFn: () =>
      api.post(`/api/payruns/${id}/lock/`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["payrun", id] });
      queryClient.invalidateQueries({ queryKey: ["payruns"] });
    },
  });

  if (isPending) return <p className="p-6">Loading payrun…</p>;
  if (error) return <p className="p-6 text-red-600">Failed to load payrun</p>;

  const canProcess = data.status === "draft";
  const canLock = data.status === "processed";

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-xl font-semibold">
        Payrun {data.month}/{data.year}
      </h1>

      <div className="space-y-1 text-sm">
        <p>Status: <b>{data.status}</b></p>
        <p>Processed at: {data.processed_at ?? "-"}</p>
        <p>Created at: {data.created_at}</p>
      </div>

      <div className="flex gap-2">
        <button
          disabled={!canProcess || processPayrun.isPending}
          onClick={() => processPayrun.mutate()}
          className="bg-black text-white px-3 py-1 rounded disabled:opacity-50"
        >
          Process
        </button>

        <button
          disabled={!canLock || lockPayrun.isPending}
          onClick={() => lockPayrun.mutate()}
          className="bg-gray-700 text-white px-3 py-1 rounded disabled:opacity-50"
        >
          Lock
        </button>
      </div>
    </div>
  );
}
