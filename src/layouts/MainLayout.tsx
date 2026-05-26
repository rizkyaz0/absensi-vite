"use client";

import { useLocation, Outlet } from "react-router-dom";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";

function PageTransition() {
  const location = useLocation();
  return (
    <div key={location.pathname} className="animate-fade-in">
      <Outlet />
    </div>
  );
}

export function MainLayout() {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto p-4 lg:p-6">
          <PageTransition />
        </main>
      </div>
    </div>
  );
}
