import type { Metadata } from "next";
import "./admin.css";

export const metadata: Metadata = {
  title: "E-Cell REC Admin Panel",
  description: "Admin panel for E-Cell REC startup submission portal",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="admin-layout dark min-h-screen">
      {children}
    </div>
  );
}
