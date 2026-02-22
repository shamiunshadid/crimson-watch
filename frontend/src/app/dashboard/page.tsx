"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Sidebar } from "./_components/Sidebar";
import { DashboardHeader } from "./_components/Dashboard-header";
import { TestCards } from "./_components/Test-cards";
import { StatsSection } from "./_components/Stats-section";
import { AIAssistant } from "./_components/Ai-assistant";

export default function DashboardPage() {
  const [isAIOpen, setIsAIOpen] = useState(true);

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main
        className={cn(
          "transition-all duration-300 min-h-screen",
          "ml-64", // Sidebar width
          isAIOpen ? "mr-80" : "mr-0" // AI panel width
        )}
      >
        <div className="p-6 lg:p-8">
          {/* Header */}
          <DashboardHeader />

          {/* Give Test Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold text-foreground">Give Test</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Choose a test type to practice
                </p>
              </div>
            </div>
            <TestCards />
          </motion.section>

          {/* Stats Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold text-foreground">Your Stats</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Track your progress and performance
                </p>
              </div>
            </div>
            <StatsSection />
          </motion.section>
        </div>
      </main>

      {/* AI Assistant */}
      <AIAssistant isOpen={isAIOpen} onToggle={() => setIsAIOpen(!isAIOpen)} />
    </div>
  );
}