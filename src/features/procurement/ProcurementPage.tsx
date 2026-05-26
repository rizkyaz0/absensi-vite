"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { procurementService } from "@/services/procurementService";
import { formatRupiah } from "@/lib/utils";
import { ProcurementFormDialog } from "./components/ProcurementFormDialog";
import { Search } from "lucide-react";

const statusLabels: Record<string, string> = {
  draft: "Draft", diajukan: "Submitted", disetujui: "Approved",
  ditolak: "Rejected", dipesan: "Ordered", diterima: "Received", dibatalkan: "Cancelled",
};
const statusColors: Record<string, string> = {
  draft: "bg-gray-500/10 text-gray-600", diajukan: "bg-blue-500/10 text-blue-600",
  disetujui: "bg-emerald-500/10 text-emerald-600", ditolak: "bg-red-500/10 text-red-600",
  dipesan: "bg-purple-500/10 text-purple-600", diterima: "bg-emerald-500/10 text-emerald-600",
  dibatalkan: "bg-gray-500/10 text-gray-600",
};

export function ProcurementPage() {
  const [search, setSearch] = useState("");
  const { data, isLoading } = useQuery({
    queryKey: ["procurement", { search }],
    queryFn: () => procurementService.list({ search: search || undefined }),
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Procurement</h1>
          <p className="text-sm text-muted-foreground mt-1">Purchase requests & orders</p>
        </div>
        <ProcurementFormDialog />
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-3">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search procurement..."
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
                  <TableHead>No.</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead className="hidden md:table-cell">Requester</TableHead>
                  <TableHead className="hidden md:table-cell">Department</TableHead>
                  <TableHead className="hidden md:table-cell">Type</TableHead>
                  <TableHead className="text-right">Est. Cost</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data?.data.map((p) => (
                  <TableRow key={p.id}>
                    <TableCell className="font-mono text-xs">{p.nomor}</TableCell>
                    <TableCell className="font-medium">{p.judul}</TableCell>
                    <TableCell className="hidden md:table-cell">{p.pengaju}</TableCell>
                    <TableCell className="hidden md:table-cell">{p.departemen}</TableCell>
                    <TableCell className="hidden md:table-cell capitalize">{p.tipe}</TableCell>
                    <TableCell className="text-right font-mono">{formatRupiah(p.estimasi_biaya)}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={statusColors[p.status]}>{statusLabels[p.status]}</Badge>
                    </TableCell>
                  </TableRow>
                ))}
                {data?.data.length === 0 && (
                  <TableRow><TableCell colSpan={7} className="text-center py-8 text-muted-foreground">No procurement requests</TableCell></TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
