"use client";

import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  LayoutDashboard,
  Package,
  Tags,
  Users,
  Wrench,
  ShoppingCart,
  Warehouse,
  BarChart3,
  FileSpreadsheet,
  Settings,
  ChevronLeft,
  ChevronDown,
  Menu,
  Database,
  ArrowLeftRight,
  FileText,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";


interface NavGroup {
  label: string;
  icon: any;
  items: { to: string; icon: any; label: string }[];
}

const navGroups: NavGroup[] = [
  {
    label: "",
    icon: LayoutDashboard,
    items: [{ to: "/", icon: LayoutDashboard, label: "Dashboard" }],
  },
  {
    label: "Master Data",
    icon: Database,
    items: [
      { to: "/assets", icon: Package, label: "Assets" },
      { to: "/categories", icon: Tags, label: "Categories" },
      { to: "/users", icon: Users, label: "Users" },
    ],
  },
  {
    label: "Transactions",
    icon: ArrowLeftRight,
    items: [
      { to: "/assignments", icon: Users, label: "Assignments" },
      { to: "/maintenance", icon: Wrench, label: "Maintenance" },
      { to: "/procurement", icon: ShoppingCart, label: "Procurement" },
    ],
  },
  {
    label: "Reports",
    icon: FileText,
    items: [
      { to: "/reports", icon: BarChart3, label: "Reports" },
      { to: "/bast", icon: FileSpreadsheet, label: "BAST" },
    ],
  },
  {
    label: "Inventory & Settings",
    icon: Settings,
    items: [
      { to: "/inventory", icon: Warehouse, label: "Inventory" },
      { to: "/settings", icon: Settings, label: "Settings" },
    ],
  },
];

function NavGroupItem({
  group,
  collapsed,
  defaultOpen,
}: {
  group: NavGroup;
  collapsed: boolean;
  defaultOpen: boolean;
}) {
  const location = useLocation();
  const [open, setOpen] = useState(defaultOpen);

  const isActive = group.items.some(
    (item) =>
      location.pathname === item.to ||
      (item.to !== "/" && location.pathname.startsWith(item.to))
  );

  if (collapsed) {
    // Collapsed mode: show first icon with tooltip-style indicator
    return (
      <div className="flex flex-col gap-0.5">
        {group.items.map((item) => {
          const itemActive =
            location.pathname === item.to ||
            (item.to !== "/" && location.pathname.startsWith(item.to));
          return (
            <NavLink
              key={item.to}
              to={item.to}
              icon={item.icon}
              label={item.label}
              collapsed={true}
              isActive={itemActive}
            />
          );
        })}
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <button
        onClick={() => setOpen(!open)}
        className={cn(
          "flex items-center justify-between w-full rounded-lg px-3 py-1.5 text-xs font-medium",
          "text-muted-foreground/70 hover:text-foreground transition-colors",
          isActive && "text-foreground"
        )}
      >
        <span className="uppercase tracking-wider">{group.label}</span>
        {group.label && (
          <ChevronDown
            className={cn(
              "h-3 w-3 transition-transform duration-200",
              open && "rotate-180"
            )}
          />
        )}
      </button>

      <div
        className={cn(
          "overflow-hidden transition-all duration-300 ease-in-out",
          open ? "max-h-96 opacity-100 mt-0.5" : "max-h-0 opacity-0"
        )}
      >
        <div className="flex flex-col gap-0.5 pl-2 border-l border-muted ml-2">
          {group.items.map((item) => {
            const itemActive =
              location.pathname === item.to ||
              (item.to !== "/" && location.pathname.startsWith(item.to));
            return (
              <NavLink
                key={item.to}
                to={item.to}
                icon={item.icon}
                label={item.label}
                collapsed={false}
                isActive={itemActive}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

function NavLink({
  to,
  icon: Icon,
  label,
  collapsed,
  isActive,
}: {
  to: string;
  icon: any;
  label: string;
  collapsed: boolean;
  isActive: boolean;
}) {
  return (
    <Link
      to={to}
      className={cn(
        "group relative flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium",
        "transition-all duration-200 ease-out",
        "hover:bg-accent hover:text-accent-foreground",
        "active:scale-[0.97]",
        collapsed && "justify-center px-2",
        isActive
          ? "bg-accent text-accent-foreground"
          : "text-muted-foreground"
      )}
    >
      {isActive && (
        <span className="absolute left-0 top-1/2 -translate-y-1/2 h-4 w-0.5 rounded-full bg-primary animate-slide-in" />
      )}
      <Icon
        className={cn(
          "h-4 w-4 shrink-0 transition-transform duration-200",
          "group-hover:scale-110"
        )}
      />
      <span
        className={cn(
          "whitespace-nowrap transition-all duration-300",
          collapsed ? "w-0 opacity-0 overflow-hidden" : "w-auto opacity-100"
        )}
      >
        {label}
      </span>
    </Link>
  );
}

function NavContent({ collapsed }: { collapsed: boolean }) {
  const location = useLocation();

  const isDashboardActive = location.pathname === "/";

  return (
    <div className="flex h-full flex-col">
      {/* Logo */}
      <div
        className={cn(
          "flex h-14 items-center border-b overflow-hidden transition-all duration-300 shrink-0",
          collapsed ? "justify-center px-2" : "gap-2 px-4"
        )}
      >
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground text-xs font-bold transition-transform duration-300 hover:scale-105">
          A
        </div>
        <span
          className={cn(
            "font-semibold text-sm whitespace-nowrap transition-all duration-300",
            collapsed
              ? "w-0 opacity-0 overflow-hidden"
              : "w-auto opacity-100"
          )}
        >
          AssetMS
        </span>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 px-2 py-2">
        <nav className="flex flex-col gap-2">
          {navGroups.map((group, idx) => (
            <NavGroupItem
              key={group.label || "dashboard"}
              group={group}
              collapsed={collapsed}
              defaultOpen={
                group.label === ""
                  ? true
                  : group.items.some(
                      (item) =>
                        location.pathname === item.to ||
                        (item.to !== "/" &&
                          location.pathname.startsWith(item.to))
                    )
              }
            />
          ))}
        </nav>
      </ScrollArea>

      {/* Bottom section */}
      <div className="border-t shrink-0">
        <div
          className={cn(
            "p-2",
            collapsed && "flex flex-col items-center gap-1"
          )}
        >
          <CollapseButton collapsed={collapsed} />
        </div>
      </div>
    </div>
  );
}

function CollapseButton({ collapsed }: { collapsed: boolean }) {
  return (
    <Button
      variant="ghost"
      size={collapsed ? "icon" : "sm"}
      className={cn(
        "w-full justify-start gap-2 transition-all duration-200 hover:bg-accent",
        collapsed && "w-9 justify-center"
      )}
      onClick={() => {
        const event = new CustomEvent("sidebar-toggle");
        window.dispatchEvent(event);
      }}
    >
      <ChevronLeft
        className={cn(
          "h-4 w-4 shrink-0 transition-all duration-300",
          collapsed && "rotate-180"
        )}
      />
      {!collapsed && <span className="text-xs">Collapse</span>}
    </Button>
  );
}

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const sidebarRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handler = () => setCollapsed((prev) => !prev);
    window.addEventListener("sidebar-toggle", handler);
    return () => window.removeEventListener("sidebar-toggle", handler);
  }, []);

  return (
    <>
      <aside
        ref={sidebarRef}
        className={cn(
          "hidden md:flex h-screen flex-col border-r bg-background relative",
          "transition-[width] duration-300 ease-in-out",
          collapsed ? "w-16" : "w-60"
        )}
      >
        <NavContent collapsed={collapsed} />
      </aside>

      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-60 p-0 animate-slide-in-left">
          <NavContent collapsed={false} />
        </SheetContent>
      </Sheet>
    </>
  );
}
