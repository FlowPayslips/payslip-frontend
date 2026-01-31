"use client";

import Link from "next/link";
import LogoutButton from "./LogoutButton";
import { useMe } from "@/hooks/useMe";

export default function DashboardNav() {
  const { data: me, isPending } = useMe();

  if (isPending) return null;

  const isAdmin = me?.is_staff || me?.is_superuser;

  return (<div className="flex items-center justify-between px-6 py-4 border-b">
  <div className="flex items-center gap-8">
    <Link href="/companies" className="text-lg font-semibold tracking-wide">
      Flow Portal
    </Link>

    <nav className="flex items-center gap-4 text-sm">
      <Link href="/companies" className="hover:underline">
        Companies
      </Link>

      {isAdmin && (
        <>
          <Link href="/members" className="hover:underline">
            Members
          </Link>
          <Link href="/payroll" className="hover:underline">
            Payroll
          </Link>
          <Link href="/payslips" className="hover:underline">
            Payslips
          </Link>
        </>
      )}
    </nav>
  </div>

  <div className="flex items-center gap-4 text-sm">
    <span className="text-gray-300">
      {me?.name || me?.username || me?.email}
    </span>
    <LogoutButton />
  </div>
</div>

  );
}
