"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { assignmentService } from "@/services/assignmentService";
import { formatDate } from "@/lib/utils";
import { AssignmentFormDialog } from "./components/AssignmentFormDialog";
import { ReturnAssignmentDialog } from "./components/ReturnAssignmentDialog";
import { Search } from "lucide-react";

const statusLabels: Record<string, string> = { aktif: "Active", dikembalikan: "Returned", dialihkan: "Transferred" };
const statusColors: Record<string, string> = {
  aktif: "bg-emerald-500/10 text-emerald-600",
  dikembalikan: "bg-gray-500/10 text-gray-600",
  dialihkan: "bg-blue-500/10 text-blue-600",
};

export function AssignmentPage() {
  const [search, setSearch] = useState("");
  const { data, isLoading } = useQuery({
    queryKey: ["assignments", { search }],
    queryFn: () => assignmentService.list({ search: search || undefined }),
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Assignments</h1>
          <p className="text-sm text-muted-foreground mt-1">Asset assignment management</p>
        </div>
        <AssignmentFormDialog />
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-3">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search assignments..."
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
                  <TableHead>Employee</TableHead>
                  <TableHead className="hidden md:table-cell">Department</TableHead>
                  <TableHead className="hidden md:table-cell">Start Date</TableHead>
                  <TableHead className="hidden md:table-cell">End Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-[100px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data?.data.map((a) => (
                  <TableRow key={a.id}>
                    <TableCell className="font-medium">{a.asset_nama}</TableCell>
                    <TableCell>{a.pegawai_nama}</TableCell>
                    <TableCell className="hidden md:table-cell">{a.pegawai_departemen}</TableCell>
                    <TableCell className="hidden md:table-cell">{formatDate(a.tanggal_mulai)}</TableCell>
                    <TableCell className="hidden md:table-cell">{a.tanggal_selesai ? formatDate(a.tanggal_selesai) : "-"}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={statusColors[a.status]}>
                        {statusLabels[a.status]}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {a.status === "aktif" && (
                        <ReturnAssignmentDialog
                          assignmentId={a.id}
                          assetName={a.asset_nama}
                        />
                      )}
                    </TableCell>
                  </TableRow>
                ))}
                {data?.data.length === 0 && (
                  <TableRow><TableCell colSpan={7} className="text-center py-8 text-muted-foreground">No assignments found</TableCell></TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
