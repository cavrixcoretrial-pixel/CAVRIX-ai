import Sidebar from "@/components/dashboard/sidebar";
import AppProviders from "@/context/app-providers";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppProviders>
      <div className="flex h-screen overflow-hidden bg-[#0a0a0f]">
        <Sidebar />
        <main className="flex min-w-0 flex-1 flex-col overflow-hidden">
          {children}
        </main>
      </div>
    </AppProviders>
  );
}
