"use client";

import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Menu,
  Clock,
  ChevronLeft,
  ChevronRight,
  AlertTriangle,
  Pause,
  Play,
  Settings,
  Flag,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface TestHeaderProps {
  currentSection: number;
  totalSections: number;
  onMenuClick: () => void;
  onSectionChange: (section: number) => void;
}

export function TestHeader({
  currentSection,
  totalSections,
  onMenuClick,
  onSectionChange,
}: TestHeaderProps) {
  const [timeLeft, setTimeLeft] = useState(60 * 60); // 60 minutes in seconds
  const [isPaused, setIsPaused] = useState(false);
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) return 0;
        if (prev <= 600 && !showWarning) {
          setShowWarning(true);
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isPaused, showWarning]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const isLowTime = timeLeft <= 600; // 10 minutes or less

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-50 bg-card border-b border-border/50 px-4 py-3"
    >
      <div className="flex items-center justify-between">
        {/* Left Section - Menu & Title */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onMenuClick}
            className="shrink-0"
          >
            <Menu className="w-5 h-5" />
          </Button>

          <div className="hidden sm:block">
            <h1 className="text-lg font-semibold text-foreground">
              IELTS Academic Reading
            </h1>
            <p className="text-xs text-muted-foreground">
              Practice Test 1
            </p>
          </div>
        </div>

        {/* Center Section - Timer */}
        <div className="flex items-center gap-3">
          <motion.div
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-lg transition-colors",
              isLowTime
                ? "bg-red-100 dark:bg-red-900/30"
                : "bg-secondary"
            )}
            animate={isLowTime ? { scale: [1, 1.02, 1] } : {}}
            transition={{ duration: 0.5, repeat: isLowTime ? Infinity : 0 }}
          >
            {isLowTime && (
              <AlertTriangle className="w-4 h-4 text-red-500" />
            )}
            <Clock className={cn(
              "w-4 h-4",
              isLowTime ? "text-red-500" : "text-muted-foreground"
            )} />
            <span className={cn(
              "font-mono text-lg font-semibold",
              isLowTime ? "text-red-600 dark:text-red-400" : "text-foreground"
            )}>
              {formatTime(timeLeft)}
            </span>
          </motion.div>

          <Button
            variant="outline"
            size="icon"
            onClick={() => setIsPaused(!isPaused)}
            className="shrink-0"
          >
            {isPaused ? (
              <Play className="w-4 h-4" />
            ) : (
              <Pause className="w-4 h-4" />
            )}
          </Button>
        </div>

        {/* Right Section - Section Navigation & Actions */}
        <div className="flex items-center gap-2">
          {/* Section Navigation */}
          <div className="hidden md:flex items-center gap-1 bg-secondary rounded-lg p-1">
            <Button
              variant="ghost"
              size="icon"
              className="w-7 h-7"
              disabled={currentSection === 1}
              onClick={() => onSectionChange(currentSection - 1)}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>

            {Array.from({ length: totalSections }, (_, i) => i + 1).map((section) => (
              <Button
                key={section}
                variant={currentSection === section ? "default" : "ghost"}
                size="sm"
                className="w-8 h-7 text-xs"
                onClick={() => onSectionChange(section)}
              >
                {section}
              </Button>
            ))}

            <Button
              variant="ghost"
              size="icon"
              className="w-7 h-7"
              disabled={currentSection === totalSections}
              onClick={() => onSectionChange(currentSection + 1)}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>

          {/* Settings */}
          <Button variant="ghost" size="icon" className="shrink-0">
            <Settings className="w-4 h-4" />
          </Button>

          {/* Flag for Review */}
          <Button variant="ghost" size="icon" className="shrink-0">
            <Flag className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Mobile Section Navigation */}
      <div className="flex md:hidden items-center justify-center gap-1 mt-3 pt-3 border-t border-border/50">
        <span className="text-xs text-muted-foreground mr-2">Section:</span>
        {Array.from({ length: totalSections }, (_, i) => i + 1).map((section) => (
          <Button
            key={section}
            variant={currentSection === section ? "default" : "outline"}
            size="sm"
            className="w-8 h-7 text-xs"
            onClick={() => onSectionChange(section)}
          >
            {section}
          </Button>
        ))}
      </div>
    </motion.header>
  );
}
