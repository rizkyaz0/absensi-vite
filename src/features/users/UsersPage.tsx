"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { userService } from "@/services/userService";
import { Search, UserPlus, Users, Shield, Wrench, UserCheck } from "lucide-react";
import { cn } from "@/lib/utils";

const roleIcons: Record<string, any> = {
  admin: Shield,
  manager: UserCheck,
  teknisi: Wrench,
  staff: Users,
};
const roleLabels: Record<string, string> = {
  admin: "Admin",
  manager: "Manager",
  teknisi: "Technician",
  staff: "Staff",
};
const roleColors: Record<string, string> = {
  admin: "bg-purple-500/10 text-purple-600 border-purple-200",
  manager: "bg-blue-500/10 text-blue-600 border-blue-200",
  teknisi: "bg-amber-500/10 text-amber-600 border-amber-200",
  staff: "bg-gray-500/10 text-gray-600 border-gray-200",
};

export function UsersPage() {
  const [search, setSearch] = useState("");
  const { data, isLoading } = useQuery({
    queryKey: ["users", { search }],
    queryFn: () => userService.list({ search: search || undefined }),
  });

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Users</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage system users & employees
          </p>
        </div>
        <Button>
          <UserPlus className="h-4 w-4 mr-2" />
          Add User
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-3">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search users..."
                className="pl-8"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <Skeleton key={i} className="h-14 w-full" />
              ))}
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee</TableHead>
                  <TableHead className="hidden md:table-cell">NIP</TableHead>
                  <TableHead className="hidden md:table-cell">Department</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data?.data.map((user) => {
                  const RoleIcon = roleIcons[user.role] || Users;
                  const initials = user.nama
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .slice(0, 2);
                  return (
                    <TableRow key={user.id} className="hover:bg-muted/50">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="bg-primary/10 text-primary text-xs font-medium">
                              {initials}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium">{user.nama}</p>
                            <p className="text-xs text-muted-foreground">
                              {user.email}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell font-mono text-xs text-muted-foreground">
                        {user.nip}
                      </TableCell>
                      <TableCell className="hidden md:table-cell text-sm">
                        {user.departemen}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={cn(
                            "flex items-center gap-1 w-fit",
                            roleColors[user.role]
                          )}
                        >
                          <RoleIcon className="h-3 w-3" />
                          {roleLabels[user.role]}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={user.aktif ? "default" : "secondary"}
                          className={cn(
                            "text-xs",
                            user.aktif &&
                              "bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20"
                          )}
                        >
                          {user.aktif ? "Active" : "Inactive"}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  );
                })}
                {(!data || data.data.length === 0) && (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      className="text-center py-8 text-muted-foreground"
                    >
                      No users found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
