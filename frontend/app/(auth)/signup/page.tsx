"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import api from "@/lib/api";

export default function SignupPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!token) {
      setError("Invalid or missing invite token");
    }
  }, [token]);

  const handleSubmit = async () => {
    setError("");

    if (!password || password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      await api.post("/api/invites/accept/", {
        token,
        password,
      });

      setSuccess(true);

      setTimeout(() => {
        router.replace("/login");
      }, 1500);
    } catch {
      setError("Invite is invalid or expired");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 text-gray-900">
      <div className="w-full max-w-sm bg-white p-6 rounded-lg shadow">
        <h1 className="text-xl font-semibold mb-4">
          Activate your account
        </h1>

        {!success ? (
          <>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mb-3 p-2 border rounded"
            />

            <input
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full mb-3 p-2 border rounded"
            />

            {error && (
              <p className="text-sm text-red-600 mb-2">
                {error}
              </p>
            )}

            <button
              type="button"
              onClick={handleSubmit}
              disabled={!token}
              className="w-full bg-black text-white py-2 rounded disabled:opacity-50"
            >
              Set password
            </button>
          </>
        ) : (
          <p className="text-sm text-green-600">
            Account activated. Redirecting to login…
          </p>
        )}
      </div>
    </div>
  );
}
