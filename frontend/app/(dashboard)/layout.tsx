import RouteGuard from "@/components/RouteGuard";
import DashboardNav from "@/components/DashboardNav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RouteGuard>
      <DashboardNav />
      {children}
    </RouteGuard>
  );
}
