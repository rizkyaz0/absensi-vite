"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { maintenanceService } from "@/services/maintenanceService";
import { formatDate, formatRupiah } from "@/lib/utils";
import { MaintenanceFormDialog } from "./components/MaintenanceFormDialog";
import { Search } from "lucide-react";

const statusLabels: Record<string, string> = {
  dijadwalkan: "Scheduled",
  berlangsung: "In Progress",
  selesai: "Completed",
  dibatalkan: "Cancelled",
};
const statusColors: Record<string, string> = {
  dijadwalkan: "bg-blue-500/10 text-blue-600",
  berlangsung: "bg-amber-500/10 text-amber-600",
  selesai: "bg-emerald-500/10 text-emerald-600",
  dibatalkan: "bg-gray-500/10 text-gray-600",
};
const typeLabels: Record<string, string> = { rutin: "Routine", perbaikan: "Repair", darurat: "Emergency" };

export function MaintenancePage() {
  const [search, setSearch] = useState("");
  const { data, isLoading } = useQuery({
    queryKey: ["maintenance", { search }],
    queryFn: () => maintenanceService.list({ search: search || undefined }),
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Maintenance</h1>
          <p className="text-sm text-muted-foreground mt-1">Asset maintenance schedule & history</p>
        </div>
        <MaintenanceFormDialog />
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-3">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search maintenance..."
                className="pl-8"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-3">{[1, 2, 3, 4].map((i) => <Skeleton key={i} className="h-10 w-full" />)}</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Asset</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead className="hidden md:table-cell">Type</TableHead>
                  <TableHead className="hidden md:table-cell">Start Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Cost</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data?.data.map((m) => (
                  <TableRow key={m.id}>
                    <TableCell className="font-medium">{m.asset_nama}</TableCell>
                    <TableCell>{m.judul}</TableCell>
                    <TableCell className="hidden md:table-cell"><Badge variant="secondary">{typeLabels[m.tipe]}</Badge></TableCell>
                    <TableCell className="hidden md:table-cell">{formatDate(m.tanggal_mulai)}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={statusColors[m.status]}>{statusLabels[m.status]}</Badge>
                    </TableCell>
                    <TableCell className="text-right font-mono">{formatRupiah(m.biaya)}</TableCell>
                  </TableRow>
                ))}
                {data?.data.length === 0 && (
                  <TableRow><TableCell colSpan={6} className="text-center py-8 text-muted-foreground">No maintenance records</TableCell></TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
