"use client";

import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { reportService } from "@/services/reportService";
import { formatRupiah } from "@/lib/utils";
import {
  Package,
  TrendingUp,
  Wrench,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

const chartConfig = {
  status: { label: "By Status", color: "var(--chart-1)" },
  category: { label: "By Category", color: "var(--chart-2)" },
  acquisition: { label: "Acquisition", color: "var(--chart-1)" },
  maintenance: { label: "Maintenance", color: "var(--chart-3)" },
};

const statusColors: Record<string, string> = {
  Tersedia: "hsl(var(--chart-2))",
  Digunakan: "hsl(var(--chart-1))",
  "Dalam Perawatan": "hsl(var(--chart-3))",
  Rusak: "hsl(var(--chart-4))",
  Dihapus: "hsl(var(--chart-5))",
};

function AnalyticsCards() {
  const { data: stats, isLoading } = useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: () => reportService.getDashboardStats(),
  });

  const cards = [
    {
      title: "Total Assets",
      value: stats?.total ?? 0,
      icon: Package,
      trend: "+3",
      trendUp: true,
      description: "All registered assets",
    },
    {
      title: "Total Value",
      value: formatRupiah(stats?.total_nilai_perolehan ?? 0),
      icon: TrendingUp,
      trend: "+12.5%",
      trendUp: true,
      description: "Acquisition value",
    },
    {
      title: "In Maintenance",
      value: stats?.dalam_perawatan ?? 0,
      icon: Wrench,
      trend: "+1",
      trendUp: false,
      description: "Under maintenance",
    },
    {
      title: "Damaged",
      value: stats?.rusak ?? 0,
      icon: AlertTriangle,
      trend: "0",
      trendUp: false,
      description: "Needs attention",
    },
  ];

  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i}>
            <CardHeader className="pb-2">
              <Skeleton className="h-4 w-24" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-20" />
              <Skeleton className="h-3 w-32 mt-2" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 stagger-children">
      {cards.map((card) => (
        <Card key={card.title} className="card-hover-lift">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {card.title}
            </CardTitle>
            <card.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{card.value}</div>
            <div className="flex items-center gap-1 mt-1">
              <Badge
                variant="secondary"
                className={cn(
                  "text-xs font-medium",
                  card.trendUp ? "text-emerald-600" : "text-red-600"
                )}
              >
                {card.trendUp ? (
                  <ArrowUpRight className="h-3 w-3 mr-0.5" />
                ) : (
                  <ArrowDownRight className="h-3 w-3 mr-0.5" />
                )}
                {card.trend}
              </Badge>
              <span className="text-xs text-muted-foreground">{card.description}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function AssetStatusChart() {
  const { data, isLoading } = useQuery({
    queryKey: ["chart-data"],
    queryFn: () => reportService.getChartData(),
  });

  if (isLoading) return <Skeleton className="h-[300px] w-full rounded-lg" />;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-medium">Asset Status</CardTitle>
        <CardDescription>Distribution by current status</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data?.assetByStatus}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
              >
                {data?.assetByStatus.map((entry: any) => (
                  <Cell key={entry.name} fill={statusColors[entry.name] || "hsl(var(--chart-1))"} />
                ))}
              </Pie>
              <ChartTooltip content={<ChartTooltipContent />} />
              <ChartLegend content={<ChartLegendContent />} />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

function AssetValueChart() {
  const { data, isLoading } = useQuery({
    queryKey: ["chart-data"],
    queryFn: () => reportService.getChartData(),
  });

  if (isLoading) return <Skeleton className="h-[300px] w-full rounded-lg" />;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-medium">Asset Value by Category</CardTitle>
        <CardDescription>Total value per category (IDR)</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data?.assetByCategory}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="name" tick={{ fontSize: 10 }} angle={-20} textAnchor="end" height={60} />
              <YAxis tick={{ fontSize: 11 }} tickFormatter={(v: number) => `${(v / 1000000).toFixed(0)}M`} />
              <ChartTooltip
                content={<ChartTooltipContent formatter={(v: number) => formatRupiah(v)} />}
              />
              <Bar dataKey="nilai" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

function AcquisitionTrend() {
  const { data, isLoading } = useQuery({
    queryKey: ["chart-data"],
    queryFn: () => reportService.getChartData(),
  });

  if (isLoading) return <Skeleton className="h-[300px] w-full rounded-lg" />;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-medium">Monthly Acquisition Trend</CardTitle>
        <CardDescription>Assets acquired per month (2024)</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data?.monthlyAcquisition}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} allowDecimals={false} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line
                type="monotone"
                dataKey="jumlah"
                stroke="hsl(var(--chart-1))"
                strokeWidth={2}
                dot={{ r: 3 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

function RecentActivities() {
  const { data: activities, isLoading } = useQuery({
    queryKey: ["recent-activities"],
    queryFn: () => reportService.getRecentActivities(),
  });

  if (isLoading) return <Skeleton className="h-[300px] w-full rounded-lg" />;

  const typeColors: Record<string, string> = {
    create: "bg-emerald-500/10 text-emerald-600",
    delete: "bg-red-500/10 text-red-600",
    maintenance: "bg-amber-500/10 text-amber-600",
    assignment: "bg-blue-500/10 text-blue-600",
    procurement: "bg-purple-500/10 text-purple-600",
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-medium">Recent Activities</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities?.slice(0, 6).map((activity: any) => (
            <div key={activity.id} className="flex items-start gap-3">
              <div className={cn("h-2 w-2 rounded-full mt-1.5", typeColors[activity.type]?.split(" ")[0] || "bg-muted")} />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{activity.action}</p>
                <p className="text-xs text-muted-foreground truncate">{activity.detail}</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {new Date(activity.time).toLocaleDateString("id-ID", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Asset Management Overview
        </p>
      </div>
      <AnalyticsCards />
      <div className="grid gap-4 md:grid-cols-2 stagger-children">
        <AssetStatusChart />
        <AssetValueChart />
      </div>
      <div className="grid gap-4 md:grid-cols-2 stagger-children">
        <AcquisitionTrend />
        <RecentActivities />
      </div>
    </div>
  );
}
