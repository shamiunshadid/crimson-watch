"use client";

import { motion } from "motion/react";
import type {Variants} from "motion/react"
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  PenTool,
  Headphones,
  Mic,
  Clock,
  Target,
  TrendingUp,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface TestCardProps {
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
  bgColor: string;
  stats: {
    testsCompleted: number;
    avgScore: number;
    improvement: number;
  };
  totalTests: number;
  duration: string;
  href: string;
}

const testTypes: Omit<TestCardProps, "icon">[] = [
  {
    title: "Reading",
    description: "Practice reading comprehension with academic passages",
    color: "text-amber-600 dark:text-amber-400",
    bgColor: "bg-amber-50 dark:bg-amber-950/30",
    stats: { testsCompleted: 12, avgScore: 7.0, improvement: 0.5 },
    totalTests: 45,
    duration: "60 min",
    href: "/dashboard/reading",
  },
  {
    title: "Writing",
    description: "Improve your writing skills with Task 1 & Task 2",
    color: "text-emerald-600 dark:text-emerald-400",
    bgColor: "bg-emerald-50 dark:bg-emerald-950/30",
    stats: { testsCompleted: 8, avgScore: 6.5, improvement: 0.8 },
    totalTests: 30,
    duration: "60 min",
    href: "/dashboard/writing",
  },
  {
    title: "Listening",
    description: "Enhance listening skills with audio recordings",
    color: "text-blue-600 dark:text-blue-400",
    bgColor: "bg-blue-50 dark:bg-blue-950/30",
    stats: { testsCompleted: 15, avgScore: 7.5, improvement: 1.0 },
    totalTests: 40,
    duration: "30 min",
    href: "/dashboard/listening",
  },
  {
    title: "Speaking",
    description: "Practice speaking with AI-powered feedback",
    color: "text-purple-600 dark:text-purple-400",
    bgColor: "bg-purple-50 dark:bg-purple-950/30",
    stats: { testsCompleted: 6, avgScore: 6.0, improvement: 0.3 },
    totalTests: 25,
    duration: "15 min",
    href: "/dashboard/speaking",
  },
];

const iconMap = {
  Reading: BookOpen,
  Writing: PenTool,
  Listening: Headphones,
  Speaking: Mic,
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 24,
    },
  },
};

function TestCard({
  title,
  description,
  icon: Icon,
  color,
  bgColor,
  stats,
  totalTests,
  duration,
  href,
}: TestCardProps) {
  return (
    <motion.div variants={itemVariants}>
      <Card className="group overflow-hidden border-border/50 hover:border-border hover:shadow-lg transition-all duration-300">
        <CardContent className="p-0">
          {/* Header */}
          <div className={cn("p-6", bgColor)}>
            <div className="flex items-start justify-between mb-4">
              <motion.div
                className={cn(
                  "w-12 h-12 rounded-xl flex items-center justify-center",
                  "bg-background dark:bg-background/50 shadow-sm"
                )}
                whileHover={{ scale: 1.05, rotate: 3 }}
              >
                <Icon className={cn("w-6 h-6", color)} />
              </motion.div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="w-3 h-3" />
                {duration}
              </div>
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-1">{title}</h3>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>

          {/* Stats */}
          <div className="p-6 bg-card">
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Completed</p>
                <p className="text-lg font-semibold text-foreground">
                  {stats.testsCompleted}
                  <span className="text-xs text-muted-foreground font-normal">
                    /{totalTests}
                  </span>
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Avg Score</p>
                <div className="flex items-center gap-1">
                  <Target className="w-3 h-3 text-accent" />
                  <p className="text-lg font-semibold text-foreground">{stats.avgScore}</p>
                </div>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Improvement</p>
                <div className="flex items-center gap-1">
                  <TrendingUp className="w-3 h-3 text-emerald-500" />
                  <p className="text-lg font-semibold text-emerald-600 dark:text-emerald-400">
                    +{stats.improvement}
                  </p>
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-4">
              <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                <motion.div
                  className={cn("h-full rounded-full", color.replace("text-", "bg-"))}
                  initial={{ width: 0 }}
                  animate={{ width: `${(stats.testsCompleted / totalTests) * 100}%` }}
                  transition={{ duration: 1, delay: 0.3 }}
                />
              </div>
            </div>

            {/* CTA */}
            <Button
              className="w-full group/btn"
              variant="outline"
            >
              <span>Start Practice</span>
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover/btn:translate-x-1" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export function TestCards() {
  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {testTypes.map((test) => (
        <TestCard
          key={test.title}
          {...test}
          icon={iconMap[test.title as keyof typeof iconMap]}
        />
      ))}
    </motion.div>
  );
}