"use client";

import Link from "next/link";
import LogoutButton from "./LogoutButton";

export default function DashboardNav() {
  return (
    <div className="flex justify-between items-center p-4 border-b">
      <div className="space-x-4">
        <Link href="/companies" className="hover:underline">
          Companies
        </Link>
        <Link href="/members" className="hover:underline">
          Members
        </Link>
      </div>
      <LogoutButton />
    </div>
  );
}
