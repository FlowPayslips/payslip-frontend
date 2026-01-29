"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DashboardIndex() {
  // Make a real dashboard here, for now redirect to /companies
  const router = useRouter();

  useEffect(() => {
    router.replace("/companies");
  }, [router]);

  return null;
}
