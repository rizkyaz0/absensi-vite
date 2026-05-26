import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { MainLayout } from "@/layouts/MainLayout";
import { DashboardPage } from "@/features/dashboard/DashboardPage";
import { AssetsPage } from "@/features/assets/AssetsPage";
import { AssetDetailPage } from "@/features/assets/pages/AssetDetailPage";
import { CategoriesPage } from "@/features/categories/CategoriesPage";
import { AssignmentPage } from "@/features/assignment/AssignmentPage";
import { MaintenancePage } from "@/features/maintenance/MaintenancePage";
import { ProcurementPage } from "@/features/procurement/ProcurementPage";
import { InventoryPage } from "@/features/inventory/InventoryPage";
import { ReportsPage } from "@/features/reports/ReportsPage";
import { SettingsPage } from "@/features/settings/SettingsPage";
import { UsersPage } from "@/features/users/UsersPage";
import { BASTPage } from "@/features/bast/BASTPage";
import { BASTDetailPage } from "@/features/bast/pages/BASTDetailPage";
import { Button } from "@/components/ui/button";
import { FileQuestion } from "lucide-react";

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <FileQuestion className="h-16 w-16 text-muted-foreground mb-4" />
      <h2 className="text-xl font-semibold mb-2">Page Not Found</h2>
      <p className="text-sm text-muted-foreground mb-6">The page you're looking for doesn't exist.</p>
      <Button asChild variant="default">
        <Link to="/">Back to Dashboard</Link>
      </Button>
    </div>
  );
}

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="assets" element={<AssetsPage />} />
          <Route path="assets/:id" element={<AssetDetailPage />} />
          <Route path="categories" element={<CategoriesPage />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="assignments" element={<AssignmentPage />} />
          <Route path="maintenance" element={<MaintenancePage />} />
          <Route path="procurement" element={<ProcurementPage />} />
          <Route path="inventory" element={<InventoryPage />} />
          <Route path="reports" element={<ReportsPage />} />
          <Route path="bast" element={<BASTPage />} />
          <Route path="bast/:id" element={<BASTDetailPage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
