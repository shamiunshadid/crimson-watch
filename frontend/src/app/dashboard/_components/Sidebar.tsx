"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Home,
  BookOpen,
  PenTool,
  Headphones,
  Mic,
  BarChart3,
  Settings,
  User,
  HelpCircle,
  LogOut,
  GraduationCap,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const mainNavItems = [
  { href: "/dashboard", label: "Dashboard", icon: Home },
  { href: "/dashboard/reading", label: "Reading", icon: BookOpen },
  { href: "/dashboard/writing", label: "Writing", icon: PenTool },
  { href: "/dashboard/listening", label: "Listening", icon: Headphones },
  { href: "/dashboard/speaking", label: "Speaking", icon: Mic },
];

const secondaryNavItems = [
  { href: "/dashboard/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/dashboard/profile", label: "Profile", icon: User },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
  { href: "/dashboard/help", label: "Help & Support", icon: HelpCircle },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <motion.aside
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="w-64 h-screen bg-card border-r border-border/50 flex flex-col fixed left-0 top-0 z-30"
    >
      {/* Logo */}
      <div className="p-6 border-b border-border/50">
        <Link href="/dashboard" className="flex items-center gap-3 group">
          <motion.div
            className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-md"
            whileHover={{ scale: 1.05, rotate: 2 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <GraduationCap className="w-5 h-5 text-primary-foreground" />
          </motion.div>
          <span className="text-lg font-semibold text-foreground group-hover:text-accent transition-colors">
            IELTS Master
          </span>
        </Link>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        <div className="mb-4">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider px-3 mb-2">
            Main Menu
          </p>
          {mainNavItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.href} href={item.href}>
                <motion.div
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                    isActive
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  )}
                  whileHover={{ x: isActive ? 0 : 4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="ml-auto w-1.5 h-1.5 rounded-full bg-accent"
                    />
                  )}
                </motion.div>
              </Link>
            );
          })}
        </div>

        <div className="pt-4 border-t border-border/50">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider px-3 mb-2">
            Account
          </p>
          {secondaryNavItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.href} href={item.href}>
                <motion.div
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                    isActive
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  )}
                  whileHover={{ x: isActive ? 0 : 4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </motion.div>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* User Profile & Logout */}
      <div className="p-4 border-t border-border/50">
        <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50 mb-3">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-accent to-accent/70 flex items-center justify-center">
            <span className="text-sm font-semibold text-accent-foreground">JD</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground truncate">John Doe</p>
            <p className="text-xs text-muted-foreground truncate">john@example.com</p>
          </div>
        </div>
        <Button
          variant="ghost"
          className="w-full justify-start text-muted-foreground hover:text-foreground hover:bg-secondary"
        >
          <LogOut className="w-4 h-4 mr-3" />
          Sign Out
        </Button>
      </div>
    </motion.aside>
  );
}