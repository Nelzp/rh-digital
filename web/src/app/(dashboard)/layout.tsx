import type { ReactNode } from "react";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";

interface IDashboardLayout {
  children: ReactNode;
}

export default function DashboardLayout({ children }: IDashboardLayout) {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-slate-100 to-slate-200">
      <Header />
      {children}
      <Footer />
    </div>
  );
}
