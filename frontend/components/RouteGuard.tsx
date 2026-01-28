"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { setAuthToken } from "@/lib/api";

export default function RouteGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      router.replace("/login");
      return;
    }

    setAuthToken(token);
    setIsReady(true); // Signal that token is set and safe to render
  }, [router]);

  if (!isReady) {
    return <div className="p-6">Loading...</div>; // Wait until token is set
  }

  return <>{children}</>;
}
