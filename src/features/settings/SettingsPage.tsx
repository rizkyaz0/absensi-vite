"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useThemeStore } from "@/stores/themeStore";
import { Sun, Moon, User, Bell } from "lucide-react";

export function SettingsPage() {
  const { theme, toggleTheme } = useThemeStore();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Settings</h1>
        <p className="text-sm text-muted-foreground mt-1">System configuration</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Sun className="h-4 w-4 text-muted-foreground" />
            <CardTitle className="text-sm font-medium">Appearance</CardTitle>
          </div>
          <CardDescription>Toggle between light and dark mode</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-muted p-2">
                {theme === "light" ? (
                  <Sun className="h-4 w-4 text-amber-500" />
                ) : (
                  <Moon className="h-4 w-4 text-blue-400" />
                )}
              </div>
              <div>
                <p className="text-sm font-medium capitalize">{theme} mode</p>
                <p className="text-xs text-muted-foreground">
                  {theme === "light"
                    ? "Light colors for daytime use"
                    : "Dark colors for reduced eye strain"}
                </p>
              </div>
            </div>
            <button
              onClick={toggleTheme}
              className="relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input"
              role="switch"
              aria-checked={theme === "dark"}
              data-state={theme === "dark" ? "checked" : "unchecked"}
            >
              <span className="pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform duration-200 data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0" data-state={theme === "dark" ? "checked" : "unchecked"} />
            </button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-muted-foreground" />
            <CardTitle className="text-sm font-medium">Profile</CardTitle>
          </div>
          <CardDescription>Manage your account</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">Profile settings will be available after backend integration.</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Bell className="h-4 w-4 text-muted-foreground" />
            <CardTitle className="text-sm font-medium">Notifications</CardTitle>
          </div>
          <CardDescription>Notification preferences</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">Notification settings will be available after backend integration.</p>
        </CardContent>
      </Card>
    </div>
  );
}
