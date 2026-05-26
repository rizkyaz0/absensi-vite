"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { inventoryService } from "@/services/inventoryService";
import { Search, ClipboardList } from "lucide-react";

const kondisiColors: Record<string, string> = {
  baik: "bg-emerald-500/10 text-emerald-600",
  rusak_ringan: "bg-amber-500/10 text-amber-600",
  rusak_berat: "bg-red-500/10 text-red-600",
};
const kondisiLabels: Record<string, string> = { baik: "Good", rusak_ringan: "Minor Damage", rusak_berat: "Heavy Damage" };

export function InventoryPage() {
  const [search, setSearch] = useState("");
  const { data, isLoading } = useQuery({
    queryKey: ["inventory", { search }],
    queryFn: () => inventoryService.list({ search: search || undefined }),
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Inventory</h1>
          <p className="text-sm text-muted-foreground mt-1">Stock monitoring & asset lifecycle</p>
        </div>
        <Button variant="outline">
          <ClipboardList className="h-4 w-4 mr-2" />
          Stock Opname
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-3">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search inventory..."
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
                  <TableHead>Warehouse</TableHead>
                  <TableHead>Rack</TableHead>
                  <TableHead className="text-center">Qty</TableHead>
                  <TableHead>Condition</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data?.data.map((i) => (
                  <TableRow key={i.id}>
                    <TableCell className="font-medium">{i.asset_nama}</TableCell>
                    <TableCell className="text-muted-foreground">{i.lokasi_gudang}</TableCell>
                    <TableCell className="font-mono text-xs">{i.rak}</TableCell>
                    <TableCell className="text-center font-medium">{i.jumlah}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={kondisiColors[i.kondisi]}>{kondisiLabels[i.kondisi]}</Badge>
                    </TableCell>
                  </TableRow>
                ))}
                {data?.data.length === 0 && (
                  <TableRow><TableCell colSpan={5} className="text-center py-8 text-muted-foreground">No inventory items</TableCell></TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
