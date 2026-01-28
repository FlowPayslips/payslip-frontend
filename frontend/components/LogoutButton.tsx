"use client";

import { logout } from "@/lib/logout";

export default function LogoutButton() {
  return (
    <button
      onClick={logout}
      className="text-sm hover:underline"
    >
      Logout
    </button>
  );
}
