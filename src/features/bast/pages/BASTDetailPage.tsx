"use client";

import { useParams, Link, useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { bastService } from "@/services/bastService";
import { formatDate } from "@/lib/utils";
import { ArrowLeft, FileSpreadsheet, CheckCircle, XCircle, Printer, FileEdit } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const typeLabels: Record<string, string> = {
  assignment: "Assignment",
  return: "Return",
  procurement: "Procurement",
  transfer: "Transfer",
  inventory: "Inventory",
};

export function BASTDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: doc, isLoading } = useQuery({
    queryKey: ["bast", id],
    queryFn: () => bastService.getById(id!),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-[600px] w-full rounded-lg" />
      </div>
    );
  }

  if (!doc) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <FileSpreadsheet className="h-12 w-12 text-muted-foreground mb-4" />
        <p className="text-lg font-medium">BAST document not found</p>
        <p className="text-sm text-muted-foreground mb-4">The document you're looking for doesn't exist.</p>
        <Button asChild variant="outline">
          <Link to="/bast">Back to BAST</Link>
        </Button>
      </div>
    );
  }

  const handleFinalize = async () => {
    try {
      await bastService.updateStatus(doc.id, "final");
      toast.success("BAST document finalized");
      queryClient.invalidateQueries({ queryKey: ["bast", doc.id] });
      queryClient.invalidateQueries({ queryKey: ["bast"] });
    } catch {
      toast.error("Failed to finalize BAST");
    }
  };

  const handleCancel = async () => {
    try {
      await bastService.updateStatus(doc.id, "cancelled");
      toast.success("BAST document cancelled");
      queryClient.invalidateQueries({ queryKey: ["bast", doc.id] });
      queryClient.invalidateQueries({ queryKey: ["bast"] });
    } catch {
      toast.error("Failed to cancel BAST");
    }
  };

  const handlePrint = () => window.print();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate("/bast")}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-semibold tracking-tight">{doc.nomor}</h1>
              <Badge variant="outline" className={cn(
                doc.status === "final" && "bg-emerald-500/10 text-emerald-600",
                doc.status === "draft" && "bg-gray-500/10 text-gray-600",
                doc.status === "cancelled" && "bg-red-500/10 text-red-600",
              )}>
                {doc.status === "draft" ? "Draft" : doc.status === "final" ? "Final" : "Cancelled"}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">{doc.judul}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 print:hidden">
          {doc.status === "draft" && (
            <>
              <Button variant="outline" size="sm" onClick={handleCancel}>
                <XCircle className="h-4 w-4 mr-1.5" />
                Cancel
              </Button>
              <Button size="sm" onClick={handleFinalize}>
                <CheckCircle className="h-4 w-4 mr-1.5" />
                Finalize
              </Button>
            </>
          )}
          <Button variant="outline" size="sm" onClick={handlePrint}>
            <Printer className="h-4 w-4 mr-1.5" />
            Print
          </Button>
        </div>
      </div>

      {/* Document Body - Printable Layout */}
      <div className="border rounded-lg bg-card print:border-0 print:shadow-none">
        {/* Header Kop */}
        <div className="p-8 pb-4 text-center border-b print:border-b-2 print:border-black">
          <h2 className="text-lg font-bold uppercase tracking-wide">BERITA ACARA SERAH TERIMA</h2>
          <p className="text-sm text-muted-foreground mt-1">Nomor: {doc.nomor}</p>
        </div>

        {/* Document Info */}
        <div className="p-8 space-y-6">
          <p className="text-sm leading-relaxed">
            Pada hari ini, {new Date(doc.tanggal_serah_terima || doc.tanggal_buat).toLocaleDateString("id-ID", {
              weekday: "long", day: "numeric", month: "long", year: "numeric"
            })}, bertempat di {doc.lokasi}, telah dilakukan serah terima sebagai berikut:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-2">PIHAK PERTAMA</h3>
              <div className="space-y-1">
                <p className="font-medium text-base">{doc.pihak_pertama}</p>
                <p className="text-sm text-muted-foreground">{doc.pihak_pertama_jabatan}</p>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-2">PIHAK KEDUA</h3>
              <div className="space-y-1">
                <p className="font-medium text-base">{doc.pihak_kedua}</p>
                <p className="text-sm text-muted-foreground">{doc.pihak_kedua_jabatan}</p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Items Table */}
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">BARANG YANG DISERAHTERIMAKAN</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-10 text-center">#</TableHead>
                  <TableHead>Item</TableHead>
                  <TableHead className="hidden sm:table-cell">Code</TableHead>
                  <TableHead className="text-center">Qty</TableHead>
                  <TableHead>Condition</TableHead>
                  <TableHead className="hidden md:table-cell">Notes</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {doc.items.map((item, i) => (
                  <TableRow key={i}>
                    <TableCell className="text-center text-muted-foreground text-xs">{i + 1}</TableCell>
                    <TableCell className="font-medium">{item.nama}</TableCell>
                    <TableCell className="hidden sm:table-cell font-mono text-xs text-muted-foreground">{item.kode || "-"}</TableCell>
                    <TableCell className="text-center">{item.jumlah}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={cn(
                        (item.kondisi === "Baik" || item.kondisi === "Baru") && "bg-emerald-500/10 text-emerald-600",
                        item.kondisi === "Rusak Ringan" && "bg-amber-500/10 text-amber-600",
                        item.kondisi === "Rusak Berat" && "bg-red-500/10 text-red-600",
                      )}>
                        {item.kondisi}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell text-sm text-muted-foreground max-w-[200px] truncate">
                      {item.keterangan || "-"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {doc.catatan && (
            <>
              <Separator />
              <div>
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-2">CATATAN</h3>
                <p className="text-sm text-muted-foreground">{doc.catatan}</p>
              </div>
            </>
          )}

          <Separator />

          {/* Signatures */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-8">
            <div className="text-center">
              <p className="font-medium">{doc.pihak_pertama}</p>
              <p className="text-sm text-muted-foreground">{doc.pihak_pertama_jabatan}</p>
              <div className="mt-16 mb-2 border-b border-dashed border-muted-foreground/30 mx-12" />
              <p className="text-xs text-muted-foreground">Tanda Tangan & Cap</p>
            </div>
            <div className="text-center">
              <p className="font-medium">{doc.pihak_kedua}</p>
              <p className="text-sm text-muted-foreground">{doc.pihak_kedua_jabatan}</p>
              <div className="mt-16 mb-2 border-b border-dashed border-muted-foreground/30 mx-12" />
              <p className="text-xs text-muted-foreground">Tanda Tangan & Cap</p>
            </div>
          </div>

          <p className="text-xs text-muted-foreground text-center pt-4">
            Dokumen ini dibuat secara elektronik dan berlaku tanpa tanda tangan basah.
          </p>
        </div>
      </div>
    </div>
  );
}
