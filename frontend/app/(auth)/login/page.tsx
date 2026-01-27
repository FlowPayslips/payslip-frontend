"use client";

import { useState } from "react";
import { login } from "@/lib/auth";
import { setAuthToken } from "@/lib/api";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError("");

    try {
      const data = await login(email, password);

      if (data?.access && data?.refresh) {
        console.log("Login successful, tokens received");
        // setAuthToken(data.access);
        localStorage.setItem("accessToken", data.access);
        localStorage.setItem("refreshToken", data.refresh);
      } else {
        setError("Invalid credentials");
      }
    } catch {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 text-gray-900">
      <div
        className="w-full max-w-sm bg-white p-6 rounded-lg shadow"
      >
        <h1 className="text-xl font-semibold mb-4 text-gray-900">
          Login
        </h1>

        <input
          className="w-full mb-3 p-2 border border-gray-300 rounded text-gray-900 placeholder-gray-400"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full mb-3 p-2 border border-gray-300 rounded text-gray-900 placeholder-gray-400"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && (
          <p className="text-sm text-red-600 mb-2">
            {error}
          </p>
        )}

        <button
          type="submit"
          onClick={handleLogin}
          className="w-full bg-black text-white py-2 rounded"
        >
          Sign in
        </button>
      </div>
    </div>
  );
}
