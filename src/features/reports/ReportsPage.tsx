"use client";

import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { reportService } from "@/services/reportService";
import { maintenanceService } from "@/services/maintenanceService";
import { formatRupiah, formatDate } from "@/lib/utils";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { FileSpreadsheet, TrendingDown, Wrench, Package } from "lucide-react";
import { cn } from "@/lib/utils";

// ─── Filter Chip ────────────────────────────────────────────────

function FilterChip({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "inline-flex items-center px-3 py-1 text-xs font-medium rounded-full border transition-all duration-200",
        "hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1",
        active
          ? "bg-primary text-primary-foreground border-primary shadow-sm"
          : "bg-background text-muted-foreground border-border"
      )}
    >
      {label}
    </button>
  );
}

function FilterBar({
  options,
  value,
  onChange,
}: {
  options: { value: string; label: string }[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-wrap items-center gap-1.5">
      {options.map((opt) => (
        <FilterChip
          key={opt.value}
          label={opt.label}
          active={value === opt.value}
          onClick={() => onChange(opt.value)}
        />
      ))}
    </div>
  );
}

// ─── Shared ─────────────────────────────────────────────────────

const assetChartConfig = {
  nilai: { label: "Total Value", color: "var(--chart-1)" },
};

const assetFilterOptions = [
  { value: "all", label: "All" },
  { value: "Dipinjam", label: "Borrowed" },
  { value: "Tersedia", label: "Available" },
  { value: "Rusak", label: "Damaged" },
  { value: "Dipelihara", label: "Maintenance" },
  { value: "Pensiun", label: "Retired" },
];

const deprFilterOptions = [
  { value: "all", label: "All Assets" },
  { value: "<1", label: "< 1yr" },
  { value: "1-3", label: "1–3 yrs" },
  { value: "3+", label: "3+ yrs" },
];

const maintFilterOptions = [
  { value: "all", label: "All" },
  { value: "rutin", label: "Routine" },
  { value: "perbaikan", label: "Repair" },
  { value: "darurat", label: "Emergency" },
];

const maintStatusFilterOptions = [
  { value: "all_status", label: "Any Status" },
  { value: "dijadwalkan", label: "Scheduled" },
  { value: "berlangsung", label: "In Progress" },
  { value: "selesai", label: "Completed" },
  { value: "dibatalkan", label: "Cancelled" },
];

// ─── Asset Report Tab ───────────────────────────────────────────

function AssetReport() {
  const [filter, setFilter] = useState("all");

  const { data: chartData, isLoading: chartLoading } = useQuery({
    queryKey: ["chart-data"],
    queryFn: () => reportService.getChartData(),
  });

  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: () => reportService.getDashboardStats(),
  });

  const isLoading = chartLoading || statsLoading;

  const statusData = chartData?.assetByStatus ?? [];

  const filteredStatusData = useMemo(
    () => (filter === "all" ? statusData : statusData.filter((s: any) => s.name === filter)),
    [filter, statusData]
  );

  const selectedStatusValue = useMemo(
    () => statusData.find((s: any) => s.name === filter)?.value ?? 0,
    [filter, statusData]
  );

  return (
    <div className="space-y-5">
      {/* Top-level filter */}
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-muted-foreground">Filter by status:</span>
        <FilterBar options={assetFilterOptions} value={filter} onChange={setFilter} />
      </div>

      {isLoading ? (
        <div className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <Card key={i}><CardHeader className="pb-2"><Skeleton className="h-4 w-24" /></CardHeader>
                <CardContent><Skeleton className="h-8 w-32" /></CardContent></Card>
            ))}
          </div>
          <Skeleton className="h-[400px] w-full rounded-lg" />
        </div>
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 stagger-children">
            <Card className="card-hover-lift">
              <CardHeader className="pb-2 flex flex-row items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Assets</CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">
                  {filter === "all" ? (stats?.total ?? 0) : selectedStatusValue}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {filter === "all" ? "All registered assets" : `Status: ${filter}`}
                </p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-2 flex flex-row items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">Acquisition Value</CardTitle>
                <TrendingDown className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{formatRupiah(stats?.total_nilai_perolehan ?? 0)}</p>
                <p className="text-xs text-muted-foreground mt-1">Total purchase cost</p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-2 flex flex-row items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">Current Value</CardTitle>
                <FileSpreadsheet className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{formatRupiah(stats?.total_nilai_saat_ini ?? 0)}</p>
                <p className="text-xs text-muted-foreground mt-1">After depreciation</p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-2 flex flex-row items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">Depreciation</CardTitle>
                <TrendingDown className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">
                  {formatRupiah((stats?.total_nilai_perolehan ?? 0) - (stats?.total_nilai_saat_ini ?? 0))}
                </p>
                <p className="text-xs text-muted-foreground mt-1">Total value lost</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Asset Value by Category</CardTitle>
              <CardDescription>Comparison of total asset value across categories</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={assetChartConfig} className="h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData?.assetByCategory}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="name" tick={{ fontSize: 10 }} angle={-25} textAnchor="end" height={70} />
                    <YAxis tick={{ fontSize: 11 }} tickFormatter={(v: number) => `${(v / 1000000).toFixed(0)}M`} />
                    <ChartTooltip content={<ChartTooltipContent formatter={(v: any) => formatRupiah(v)} />} />
                    <Bar dataKey="nilai" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]} maxBarSize={50} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2 stagger-children">
            <Card className="card-hover-lift">
              <CardHeader>
                <CardTitle className="text-sm font-medium">Status Distribution</CardTitle>
                <CardDescription>Assets grouped by availability</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {filteredStatusData.map((s: any) => (
                    <div key={s.name} className="flex items-center justify-between">
                      <span className="text-sm">{s.name}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-2 rounded-full bg-muted overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all"
                            style={{
                              width: `${(s.value / (stats?.total ?? 1)) * 100}%`,
                              backgroundColor: s.fill || "hsl(var(--chart-1))",
                            }}
                          />
                        </div>
                        <span className="text-sm font-medium w-6 text-right">{s.value}</span>
                      </div>
                    </div>
                  ))}
                  {filteredStatusData.length === 0 && (
                    <p className="text-sm text-muted-foreground text-center py-4">No assets match this status</p>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">Category Breakdown</CardTitle>
                <CardDescription>Assets per category</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {chartData?.assetByCategory.map((c: any) => (
                    <div key={c.name} className="flex items-center justify-between py-1">
                      <span className="text-sm truncate max-w-[200px]">{c.name}</span>
                      <Badge variant="secondary">{c.total} items</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </div>
  );
}

// ─── Depreciation Report Tab ────────────────────────────────────

function DepreciationReport() {
  const [filter, setFilter] = useState("all");

  const { data, isLoading } = useQuery({
    queryKey: ["depreciation-report"],
    queryFn: () => reportService.getDepreciationReport(),
  });

  const { data: stats } = useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: () => reportService.getDashboardStats(),
  });

  const filteredData = useMemo(() => {
    const items = data ?? [];
    if (filter === "<1") return items.filter((a: any) => a.sisa_manfaat <= 1);
    if (filter === "1-3") return items.filter((a: any) => a.sisa_manfaat > 1 && a.sisa_manfaat <= 3);
    if (filter === "3+") return items.filter((a: any) => a.sisa_manfaat > 3);
    return items;
  }, [filter, data]);

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="grid gap-4 md:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Card key={i}><CardHeader className="pb-2"><Skeleton className="h-4 w-24" /></CardHeader>
              <CardContent><Skeleton className="h-8 w-32" /></CardContent></Card>
          ))}
        </div>
        <Skeleton className="h-[300px] w-full rounded-lg" />
      </div>
    );
  }

  const totalDepr = (stats?.total_nilai_perolehan ?? 0) - (stats?.total_nilai_saat_ini ?? 0);
  const deprRate = stats?.total_nilai_perolehan
    ? ((totalDepr / stats.total_nilai_perolehan) * 100).toFixed(1)
    : "0";

  return (
    <div className="space-y-5">
      {/* Top-level filter */}
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-muted-foreground">Remaining useful life:</span>
        <FilterBar options={deprFilterOptions} value={filter} onChange={setFilter} />
      </div>

      <div className="grid gap-4 sm:grid-cols-3 stagger-children">
        <Card className="card-hover-lift">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Depreciation</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{formatRupiah(totalDepr)}</p>
            <p className="text-xs text-muted-foreground mt-1">Value lost to date</p>
          </CardContent>
        </Card>
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Depreciation Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{deprRate}%</p>
            <p className="text-xs text-muted-foreground mt-1">Of total acquisition value</p>
          </CardContent>
        </Card>
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Remaining Value</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{formatRupiah(stats?.total_nilai_saat_ini ?? 0)}</p>
            <p className="text-xs text-muted-foreground mt-1">Current book value</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-sm font-medium">Depreciation Table</CardTitle>
              <CardDescription>All non-retired assets sorted by current value</CardDescription>
            </div>
            <Badge variant="outline" className="text-xs">{filteredData.length} assets</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Code</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Acquired</TableHead>
                <TableHead className="text-right">Acq. Value</TableHead>
                <TableHead className="text-right">Current Value</TableHead>
                <TableHead className="text-right hidden md:table-cell">Annual Depr.</TableHead>
                <TableHead className="text-right hidden md:table-cell">Remaining</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.slice(0, 20).map((a: any) => (
                <TableRow key={a.id} className="hover:bg-muted/50">
                  <TableCell className="font-mono text-xs">{a.kode}</TableCell>
                  <TableCell className="font-medium">{a.nama}</TableCell>
                  <TableCell className="text-xs text-muted-foreground">{formatDate(a.tanggal_perolehan)}</TableCell>
                  <TableCell className="text-right font-mono text-sm">{formatRupiah(a.nilai_perolehan)}</TableCell>
                  <TableCell className="text-right font-mono text-sm font-semibold">{formatRupiah(a.nilai_saat_ini)}</TableCell>
                  <TableCell className="text-right font-mono text-sm hidden md:table-cell">{formatRupiah(a.depresiasi_per_tahun)}</TableCell>
                  <TableCell className="text-right text-sm hidden md:table-cell">
                    <Badge variant={a.sisa_manfaat <= 1 ? "destructive" : a.sisa_manfaat <= 3 ? "secondary" : "outline"}
                      className="text-xs">{a.sisa_manfaat} yrs</Badge>
                  </TableCell>
                </TableRow>
              ))}
              {filteredData.length === 0 && (
                <TableRow><TableCell colSpan={7} className="text-center py-8 text-muted-foreground">No data available</TableCell></TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

// ─── Maintenance Report Tab ─────────────────────────────────────

function MaintenanceReport() {
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all_status");

  const { data: maintenances, isLoading } = useQuery({
    queryKey: ["maintenance"],
    queryFn: () => maintenanceService.list({ limit: 100 }),
  });

  const typeLabels: Record<string, string> = { rutin: "Routine", perbaikan: "Repair", darurat: "Emergency" };

  const { allRecords, totalCost, scheduled, inProgress, completed, filteredRecords } = useMemo(() => {
    const records = maintenances?.data ?? [];
    const cost = records.reduce((s: number, r: any) => s + r.biaya, 0);
    const sched = records.filter((r: any) => r.status === "dijadwalkan").length;
    const prog = records.filter((r: any) => r.status === "berlangsung").length;
    const comp = records.filter((r: any) => r.status === "selesai").length;

    let filtered = records;
    if (typeFilter !== "all") filtered = filtered.filter((r: any) => r.tipe === typeFilter);
    if (statusFilter !== "all_status") filtered = filtered.filter((r: any) => r.status === statusFilter);

    return {
      allRecords: records,
      totalCost: cost,
      scheduled: sched,
      inProgress: prog,
      completed: comp,
      filteredRecords: filtered,
    };
  }, [maintenances, typeFilter, statusFilter]);

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="grid gap-4 md:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i}><CardHeader className="pb-2"><Skeleton className="h-4 w-24" /></CardHeader>
              <CardContent><Skeleton className="h-8 w-28" /></CardContent></Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Top-level dual filter */}
      <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-muted-foreground">Type:</span>
          <FilterBar options={maintFilterOptions} value={typeFilter} onChange={setTypeFilter} />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-muted-foreground">Status:</span>
          <FilterBar options={maintStatusFilterOptions} value={statusFilter} onChange={setStatusFilter} />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 stagger-children">
        <Card className="card-hover-lift">
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Records</CardTitle>
            <Wrench className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{allRecords.length}</p>
          </CardContent>
        </Card>
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Cost</CardTitle>
            <TrendingDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{formatRupiah(totalCost)}</p>
          </CardContent>
        </Card>
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Scheduled</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-blue-600">{scheduled}</p>
          </CardContent>
        </Card>
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">In Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-amber-600">{inProgress}</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">Recent Maintenance</CardTitle>
          <CardDescription>
            {typeFilter !== "all" || statusFilter !== "all_status"
              ? `Filtered: ${filteredRecords.length} of ${allRecords.length} records`
              : "Latest maintenance activities"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Asset</TableHead>
                <TableHead>Title</TableHead>
                <TableHead className="hidden md:table-cell">Type</TableHead>
                <TableHead className="hidden md:table-cell">Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Cost</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRecords.slice(0, 10).map((m: any) => (
                <TableRow key={m.id} className="hover:bg-muted/50">
                  <TableCell className="font-medium">{m.asset_nama}</TableCell>
                  <TableCell>{m.judul}</TableCell>
                  <TableCell className="hidden md:table-cell"><Badge variant="secondary">{typeLabels[m.tipe]}</Badge></TableCell>
                  <TableCell className="hidden md:table-cell text-xs text-muted-foreground">{formatDate(m.tanggal_mulai)}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={cn(
                      m.status === "selesai" && "bg-emerald-500/10 text-emerald-600",
                      m.status === "berlangsung" && "bg-amber-500/10 text-amber-600",
                      m.status === "dijadwalkan" && "bg-blue-500/10 text-blue-600",
                      m.status === "dibatalkan" && "bg-gray-500/10 text-gray-600",
                    )}>
                      {m.status === "selesai" ? "Completed" : m.status === "berlangsung" ? "In Progress" : m.status === "dijadwalkan" ? "Scheduled" : "Cancelled"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right font-mono">{formatRupiah(m.biaya)}</TableCell>
                </TableRow>
              ))}
              {filteredRecords.length === 0 && (
                <TableRow><TableCell colSpan={6} className="text-center py-8 text-muted-foreground">No maintenance data</TableCell></TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

// ─── Main Reports Page ──────────────────────────────────────────

const tabOptions = [
  { value: "asset", label: "Asset Report" },
  { value: "depreciation", label: "Depreciation" },
  { value: "maintenance", label: "Maintenance" },
];

export function ReportsPage() {
  const [tab, setTab] = useState("asset");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Reports</h1>
        <p className="text-sm text-muted-foreground mt-1">Asset reports & analytics</p>
      </div>

      <FilterBar options={tabOptions} value={tab} onChange={setTab} />

      {tab === "asset" && <AssetReport />}
      {tab === "depreciation" && <DepreciationReport />}
      {tab === "maintenance" && <MaintenanceReport />}
    </div>
  );
}
