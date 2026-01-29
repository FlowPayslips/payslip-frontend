"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";

export default function InviteEmployeeForm() {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("employee");
  const [joinedAt, setJoinedAt] = useState("");
  const [employee_id, setEmployeeId] = useState("");
  const queryClient = useQueryClient();

  const inviteMutation = useMutation({
    mutationFn: (payload: { email: string; employee_id: string, joined_at: string }) =>
      api.post("/api/employees/", payload),
    onSuccess: () => {
      setEmail("");
      queryClient.invalidateQueries({ queryKey: ["employees"] });
    },
  });

  return (
    <div className="border rounded p-4 bg-gray-900 space-y-3">
      <h2 className="font-medium">Invite employee</h2>

      <input
        type="email"
        placeholder="Email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full border p-2 rounded"
      />

      <input
        type="string"
        placeholder="Employee ID"
        value={employee_id}
        onChange={(e) => setEmployeeId(e.target.value)}
        className="w-full border p-2 rounded"
      />

      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="w-full border p-2 rounded"
      >
        <option value="employee">Employee</option>
        <option value="admin">Admin</option>
      </select>

      <div>
  <label className="block text-sm mb-1">Joined date</label>
  <input
    type="date"
    value={joinedAt}
    onChange={(e) => setJoinedAt(e.target.value)}
    className="w-full border p-2 rounded"
  />
</div>


      <button
        onClick={() => inviteMutation.mutate({ email, employee_id, joined_at: joinedAt })}
        disabled={!email || !employee_id || inviteMutation.isPending}
        className="bg-black text-white px-4 py-2 rounded disabled:opacity-50"
      >
        Send invite
      </button>

      {inviteMutation.isError && (
        <p className="text-sm text-red-600">
          Failed to send invite
        </p>
      )}

      {inviteMutation.isSuccess && (
        <p className="text-sm text-green-600">
          Invite sent
        </p>
      )}
    </div>
  );
}
