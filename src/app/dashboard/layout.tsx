import { DashboardShell } from "@/components/DashboardShell";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ ["--bg" as string]: "#f8fafc", ["--fg" as string]: "#0f172a", ["--accent" as string]: "#2563eb" }}>
      <DashboardShell
        brand={<span className="font-semibold">SpeakIQ</span>}
        nav={[{ href: "/dashboard", label: "Dashboard" }, { href: "/", label: "Home" }]}
      >
        {children}
      </DashboardShell>
    </div>
  );
}
