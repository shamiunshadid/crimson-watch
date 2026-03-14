"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  PenTool,
  Clock,
  AlertTriangle,
  Pause,
  Play,
  Save,
  Send,
  ChevronLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface WritingHeaderProps {
  testId?: string;
  currentTask: 1 | 2;
  onTaskChange?: (task: 1 | 2) => void;
  task1Progress: { words: number; completed: boolean };
  task2Progress: { words: number; completed: boolean };
  onSubmit: () => void;
}

export function WritingHeader({
  testId,
  currentTask,
  onTaskChange,
  task1Progress,
  task2Progress,
  onSubmit,
}: WritingHeaderProps) {
  const [timeLeft, setTimeLeft] = useState(60 * 60); // 60 minutes
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

  const isLowTime = timeLeft <= 600;

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-50 bg-card border-b border-border/50"
    >
      {/* Top Bar */}
      <div className="px-4 py-3 flex items-center justify-between">
        {/* Left - Back & Title */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" className="gap-2">
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Exit</span>
          </Button>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-950/30 flex items-center justify-center">
              <PenTool className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-sm font-semibold text-foreground">
                Writing Test {testId}
              </h1>
              <p className="text-xs text-muted-foreground">Academic Module</p>
            </div>
          </div>
        </div>

        {/* Center - Timer */}
        <div className="flex items-center gap-3">
          <motion.div
            className={cn(
              "flex items-center gap-2 px-3 py-1.5 rounded-lg transition-colors",
              isLowTime
                ? "bg-red-100 dark:bg-red-900/30"
                : "bg-secondary"
            )}
            animate={isLowTime ? { scale: [1, 1.02, 1] } : {}}
            transition={{ duration: 0.5, repeat: isLowTime ? Infinity : 0 }}
          >
            {isLowTime && <AlertTriangle className="w-4 h-4 text-red-500" />}
            <Clock className={cn(
              "w-4 h-4",
              isLowTime ? "text-red-500" : "text-muted-foreground"
            )} />
            <span className={cn(
              "font-mono text-base font-semibold",
              isLowTime ? "text-red-600 dark:text-red-400" : "text-foreground"
            )}>
              {formatTime(timeLeft)}
            </span>
          </motion.div>

          <Button
            variant="outline"
            size="icon"
            onClick={() => setIsPaused(!isPaused)}
            className="shrink-0 w-8 h-8"
          >
            {isPaused ? (
              <Play className="w-4 h-4" />
            ) : (
              <Pause className="w-4 h-4" />
            )}
          </Button>
        </div>

        {/* Right - Actions */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="shrink-0 w-8 h-8">
            <Save className="w-4 h-4" />
          </Button>
          <Button 
            size="sm"
            onClick={onSubmit}
            className="gap-2"
          >
            <Send className="w-4 h-4" />
            <span className="hidden sm:inline">Submit</span>
          </Button>
        </div>
      </div>

      {/* Task Tabs */}
      {onTaskChange && (
        <div className="px-4 pb-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => onTaskChange(1)}
              className={cn(
                "flex-1 sm:flex-none px-4 py-2 rounded-lg text-sm font-medium transition-all",
                currentTask === 1
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-secondary text-muted-foreground hover:bg-secondary/80"
              )}
            >
              <div className="flex items-center justify-between sm:justify-start gap-3">
                <span>Task 1</span>
                <div className="flex items-center gap-2">
                  <Badge 
                    variant={currentTask === 1 ? "secondary" : "outline"}
                    className="text-[10px]"
                  >
                    {task1Progress.words} words
                  </Badge>
                  {task1Progress.completed && (
                    <div className="w-2 h-2 rounded-full bg-emerald-500" />
                  )}
                </div>
              </div>
            </button>
            <button
              onClick={() => onTaskChange(2)}
              className={cn(
                "flex-1 sm:flex-none px-4 py-2 rounded-lg text-sm font-medium transition-all",
                currentTask === 2
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-secondary text-muted-foreground hover:bg-secondary/80"
              )}
            >
              <div className="flex items-center justify-between sm:justify-start gap-3">
                <span>Task 2</span>
                <div className="flex items-center gap-2">
                  <Badge 
                    variant={currentTask === 2 ? "secondary" : "outline"}
                    className="text-[10px]"
                  >
                    {task2Progress.words} words
                  </Badge>
                  {task2Progress.completed && (
                    <div className="w-2 h-2 rounded-full bg-emerald-500" />
                  )}
                </div>
              </div>
            </button>
          </div>
        </div>
      )}
    </motion.header>
  )
};