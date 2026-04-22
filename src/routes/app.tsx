import { createFileRoute, Outlet } from "@tanstack/react-router";
import { Sidebar, MobileNav } from "@/components/Sidebar";

export const Route = createFileRoute("/app")({
  component: AppLayout,
});

function AppLayout() {
  return (
    <div className="min-h-screen flex bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 pb-16 md:pb-0">
        <Outlet />
      </div>
      <MobileNav />
    </div>
  );
}
