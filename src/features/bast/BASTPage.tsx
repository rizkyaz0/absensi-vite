"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Skeleton } from "@/components/ui/skeleton";
import { bastService } from "@/services/bastService";
import { formatDate } from "@/lib/utils";
import { BastFormDialog } from "./components/BastFormDialog";
import { FileText, Search, FileSpreadsheet, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

const typeLabels: Record<string, string> = {
  assignment: "Assignment",
  return: "Return",
  procurement: "Procurement",
  transfer: "Transfer",
  inventory: "Inventory",
};
const typeColors: Record<string, string> = {
  assignment: "bg-blue-500/10 text-blue-600 border-blue-200",
  return: "bg-emerald-500/10 text-emerald-600 border-emerald-200",
  procurement: "bg-purple-500/10 text-purple-600 border-purple-200",
  transfer: "bg-amber-500/10 text-amber-600 border-amber-200",
  inventory: "bg-gray-500/10 text-gray-600 border-gray-200",
};
const statusColors: Record<string, string> = {
  draft: "bg-gray-500/10 text-gray-600",
  final: "bg-emerald-500/10 text-emerald-600",
  cancelled: "bg-red-500/10 text-red-600",
};

export function BASTPage() {
  const [search, setSearch] = useState("");
  const [tipe, setTipe] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data, isLoading } = useQuery({
    queryKey: ["bast", { search, tipe, status, page }],
    queryFn: () =>
      bastService.list({
        search: search || undefined,
        tipe: (tipe as any) || undefined,
        status: (status as any) || undefined,
        page,
        limit,
      }),
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">BAST</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Berita Acara Serah Terima — Asset handover certificates
          </p>
        </div>
        <BastFormDialog />
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-3">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search BAST..."
                className="pl-8"
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              />
            </div>
            <Select value={tipe} onValueChange={(v) => { setTipe(v === "all" ? "" : v); setPage(1); }}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {Object.entries(typeLabels).map(([k, v]) => (
                  <SelectItem key={k} value={k}>{v}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={status} onValueChange={(v) => { setStatus(v === "all" ? "" : v); setPage(1); }}>
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="final">Final</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-3">
              {[1, 2, 3, 4, 5].map((i) => <Skeleton key={i} className="h-12 w-full" />)}
            </div>
          ) : (
            <>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>BAST No.</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead className="hidden md:table-cell">Type</TableHead>
                    <TableHead className="hidden md:table-cell">Date</TableHead>
                    <TableHead>From → To</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data?.data.map((doc) => (
                    <TableRow key={doc.id} className="hover:bg-muted/50">
                      <TableCell className="font-mono text-xs text-muted-foreground">{doc.nomor}</TableCell>
                      <TableCell className="font-medium max-w-[250px] truncate">{doc.judul}</TableCell>
                      <TableCell className="hidden md:table-cell">
                        <Badge variant="outline" className={typeColors[doc.tipe]}>{typeLabels[doc.tipe]}</Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell text-xs text-muted-foreground">
                        {formatDate(doc.tanggal_buat)}
                      </TableCell>
                      <TableCell className="text-sm">
                        <span className="font-medium">{doc.pihak_pertama}</span>
                        <ArrowUpRight className="h-3 w-3 inline mx-1 text-muted-foreground" />
                        <span className="font-medium">{doc.pihak_kedua}</span>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={cn("text-xs", statusColors[doc.status])}>
                          {doc.status === "draft" ? "Draft" : doc.status === "final" ? "Final" : "Cancelled"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="icon" asChild className="h-8 w-8">
                          <Link to={`/bast/${doc.id}`}>
                            <FileSpreadsheet className="h-4 w-4" />
                          </Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                  {(!data || data.data.length === 0) && (
                    <TableRow><TableCell colSpan={7} className="text-center py-8 text-muted-foreground">No BAST documents found</TableCell></TableRow>
                  )}
                </TableBody>
              </Table>

              {data && data.total_pages > 1 && (
                <div className="flex items-center justify-between mt-4">
                  <p className="text-sm text-muted-foreground">
                    Page {page} of {data.total_pages} ({data.total} total)
                  </p>
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious
                          onClick={() => setPage(Math.max(1, page - 1))}
                          className={page <= 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                        />
                      </PaginationItem>
                      {Array.from({ length: data.total_pages }, (_, i) => i + 1)
                        .filter((p) => p === 1 || p === data.total_pages || Math.abs(p - page) <= 1)
                        .map((p, idx, arr) => (
                          <span key={p}>
                            {idx > 0 && arr[idx - 1] !== p - 1 && (
                              <PaginationItem><PaginationEllipsis /></PaginationItem>
                            )}
                            <PaginationItem>
                              <PaginationLink isActive={p === page} onClick={() => setPage(p)} className="cursor-pointer">{p}</PaginationLink>
                            </PaginationItem>
                          </span>
                        ))}
                      <PaginationItem>
                        <PaginationNext
                          onClick={() => setPage(Math.min(data.total_pages, page + 1))}
                          className={page >= data.total_pages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
