"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Bell, Search, Calendar } from "lucide-react";

export function DashboardHeader() {
  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8"
    >
      <div>
        <h1 className="text-2xl sm:text-3xl font-semibold text-foreground">
          Welcome back, John!
        </h1>
        <p className="text-muted-foreground mt-1 flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          {formattedDate}
        </p>
      </div>

      <div className="flex items-center gap-3">
        <Button variant="outline" size="sm" className="gap-2">
          <Search className="w-4 h-4" />
          <span className="hidden sm:inline">Search</span>
        </Button>
        <Button variant="outline" size="icon" className="relative">
          <Bell className="w-4 h-4" />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-accent text-accent-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
            3
          </span>
        </Button>
      </div>
    </motion.header>
  );
}
