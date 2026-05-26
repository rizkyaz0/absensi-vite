"use client";

import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { assetService } from "@/services/assetService";
import { assignmentService } from "@/services/assignmentService";
import { maintenanceService } from "@/services/maintenanceService";
import { formatRupiah, formatDate } from "@/lib/utils";
import { AssetFormDialog } from "@/features/assets/components/AssetFormDialog";
import { ArrowLeft, Package, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const statusColors: Record<string, string> = {
  tersedia: "bg-emerald-500/10 text-emerald-600",
  digunakan: "bg-blue-500/10 text-blue-600",
  dalam_perawatan: "bg-amber-500/10 text-amber-600",
  rusak: "bg-red-500/10 text-red-600",
  dihapus: "bg-gray-500/10 text-gray-600",
};

const statusLabels: Record<string, string> = {
  tersedia: "Available",
  digunakan: "In Use",
  dalam_perawatan: "Maintenance",
  rusak: "Damaged",
  dihapus: "Retired",
};

const assignmentStatusLabels: Record<string, string> = {
  aktif: "Active",
  dikembalikan: "Returned",
  dialihkan: "Transferred",
};

const maintenanceStatusLabels: Record<string, string> = {
  dijadwalkan: "Scheduled",
  berlangsung: "In Progress",
  selesai: "Completed",
  dibatalkan: "Cancelled",
};

export function AssetDetailPage() {
  const { id } = useParams();

  const { data: asset, isLoading } = useQuery({
    queryKey: ["asset", id],
    queryFn: () => assetService.getById(id!),
    enabled: !!id,
  });

  const { data: assignments } = useQuery({
    queryKey: ["asset-assignments", id],
    queryFn: () => assignmentService.getByAssetId(id!),
    enabled: !!id,
  });

  const { data: maintenance } = useQuery({
    queryKey: ["asset-maintenance", id],
    queryFn: () => maintenanceService.getByAssetId(id!),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-32" />
        <Skeleton className="h-[400px] w-full rounded-lg" />
      </div>
    );
  }

  if (!asset) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Package className="h-12 w-12 text-muted-foreground mb-4" />
        <p className="text-lg font-medium">Asset not found</p>
        <p className="text-sm text-muted-foreground mb-4">The asset you're looking for doesn't exist.</p>
        <Button asChild variant="outline">
          <Link to="/assets">Back to Assets</Link>
        </Button>
      </div>
    );
  }

  const deprRate = asset.masa_manfaat > 0
    ? ((asset.nilai_perolehan - asset.nilai_saat_ini) / asset.nilai_perolehan * 100).toFixed(1)
    : 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" asChild>
            <Link to="/assets">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-semibold tracking-tight">{asset.nama}</h1>
              <Badge variant="outline" className={statusColors[asset.status]}>
                {statusLabels[asset.status]}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">{asset.kode} | {asset.kategori_nama}</p>
          </div>
        </div>
        <AssetFormDialog mode="edit" asset={asset} />
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Acquisition Value</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{formatRupiah(asset.nilai_perolehan)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Current Value</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{formatRupiah(asset.nilai_saat_ini)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Depreciation</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{deprRate}%</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="info">
        <TabsList>
          <TabsTrigger value="info">Information</TabsTrigger>
          <TabsTrigger value="assignments">Assignments</TabsTrigger>
          <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
        </TabsList>

        <TabsContent value="info" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Asset Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  ["Brand", asset.merek],
                  ["Model", asset.model],
                  ["Serial Number", asset.nomor_seri],
                  ["Location", asset.lokasi],
                  ["Category", asset.kategori_nama],
                  ["Acquisition Date", formatDate(asset.tanggal_perolehan)],
                  ["Useful Life", `${asset.masa_manfaat} years`],
                  ["Annual Depreciation", formatRupiah(asset.depresiasi_per_tahun)],
                  ["Description", asset.deskripsi],
                ].map(([label, value]) => (
                  <div key={label} className={label === "Description" ? "col-span-full" : ""}>
                    <p className="text-xs text-muted-foreground mb-0.5">{label}</p>
                    <p className="text-sm font-medium">{value}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="assignments" className="mt-4">
          <Card>
            <CardContent className="pt-6">
              {assignments && assignments.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Employee</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Start Date</TableHead>
                      <TableHead>End Date</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {assignments.map((a) => (
                      <TableRow key={a.id}>
                        <TableCell className="font-medium">{a.pegawai_nama}</TableCell>
                        <TableCell>{a.pegawai_departemen}</TableCell>
                        <TableCell>{formatDate(a.tanggal_mulai)}</TableCell>
                        <TableCell>{a.tanggal_selesai ? formatDate(a.tanggal_selesai) : "-"}</TableCell>
                        <TableCell>
                          <Badge variant="outline">
                            {assignmentStatusLabels[a.status]}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <p className="text-center text-muted-foreground py-8">No assignment history</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="maintenance" className="mt-4">
          <Card>
            <CardContent className="pt-6">
              {maintenance && maintenance.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Start Date</TableHead>
                      <TableHead>End Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Cost</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {maintenance.map((m) => (
                      <TableRow key={m.id}>
                        <TableCell className="font-medium">{m.judul}</TableCell>
                        <TableCell className="capitalize">{m.tipe}</TableCell>
                        <TableCell>{formatDate(m.tanggal_mulai)}</TableCell>
                        <TableCell>{m.tanggal_selesai ? formatDate(m.tanggal_selesai) : "-"}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{maintenanceStatusLabels[m.status]}</Badge>
                        </TableCell>
                        <TableCell className="text-right font-mono">{formatRupiah(m.biaya)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <p className="text-center text-muted-foreground py-8">No maintenance history</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
