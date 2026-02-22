"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
} from "recharts";
import {
  TrendingUp,
  Target,
  Clock,
  Award,
  ChevronDown,
} from "lucide-react";

// Mock data
const progressData = [
  { month: "Jan", reading: 6.0, writing: 5.5, listening: 6.5, speaking: 5.0 },
  { month: "Feb", reading: 6.5, writing: 6.0, listening: 7.0, speaking: 5.5 },
  { month: "Mar", reading: 7.0, writing: 6.5, listening: 7.0, speaking: 6.0 },
  { month: "Apr", reading: 7.0, writing: 6.5, listening: 7.5, speaking: 6.0 },
  { month: "May", reading: 7.5, writing: 7.0, listening: 7.5, speaking: 6.5 },
  { month: "Jun", reading: 7.5, writing: 7.0, listening: 8.0, speaking: 7.0 },
];

const testDistribution = [
  { name: "Reading", tests: 12, color: "#D4A574" },
  { name: "Writing", tests: 8, color: "#10B981" },
  { name: "Listening", tests: 15, color: "#3B82F6" },
  { name: "Speaking", tests: 6, color: "#8B5CF6" },
];

const skillRadar = [
  { skill: "Reading", score: 75, fullMark: 100 },
  { skill: "Writing", score: 68, fullMark: 100 },
  { skill: "Listening", score: 82, fullMark: 100 },
  { skill: "Speaking", score: 60, fullMark: 100 },
  { skill: "Vocabulary", score: 70, fullMark: 100 },
  { skill: "Grammar", score: 72, fullMark: 100 },
];

const stats = [
  {
    title: "Total Tests",
    value: "41",
    change: "+8 this month",
    icon: Target,
    trend: "up",
  },
  {
    title: "Average Score",
    value: "7.0",
    change: "+0.5 improvement",
    icon: TrendingUp,
    trend: "up",
  },
  {
    title: "Practice Time",
    value: "24h",
    change: "6h this week",
    icon: Clock,
    trend: "neutral",
  },
  {
    title: "Current Level",
    value: "B2",
    change: "Target: C1",
    icon: Award,
    trend: "up",
  },
];

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

export function StatsSection() {
  return (
    <motion.div
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Quick Stats */}
      <motion.div
        className="grid grid-cols-2 lg:grid-cols-4 gap-4"
        variants={containerVariants}
      >
        {stats.map((stat) => (
          <motion.div key={stat.title} variants={itemVariants}>
            <Card className="border-border/50 hover:border-border transition-colors">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">{stat.title}</p>
                    <p className="text-2xl font-semibold text-foreground">{stat.value}</p>
                    <p
                      className={`text-xs mt-1 ${
                        stat.trend === "up"
                          ? "text-emerald-600 dark:text-emerald-400"
                          : "text-muted-foreground"
                      }`}
                    >
                      {stat.change}
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                    <stat.icon className="w-5 h-5 text-accent" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Progress Chart */}
        <motion.div variants={itemVariants}>
          <Card className="border-border/50">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-base font-semibold">Score Progress</CardTitle>
              <Select defaultValue="6months">
                <SelectTrigger className="w-32 h-8 text-xs">
                  <SelectValue placeholder="Period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1month">Last Month</SelectItem>
                  <SelectItem value="3months">Last 3 Months</SelectItem>
                  <SelectItem value="6months">Last 6 Months</SelectItem>
                  <SelectItem value="1year">Last Year</SelectItem>
                </SelectContent>
              </Select>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={progressData}>
                    <defs>
                      <linearGradient id="colorReading" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#D4A574" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#D4A574" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="colorListening" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-border/50" />
                    <XAxis
                      dataKey="month"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12 }}
                      className="text-muted-foreground"
                    />
                    <YAxis
                      domain={[4, 9]}
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12 }}
                      className="text-muted-foreground"
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "var(--card)",
                        border: "1px solid var(--border)",
                        borderRadius: "8px",
                        fontSize: "12px",
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="reading"
                      stroke="#D4A574"
                      strokeWidth={2}
                      fill="url(#colorReading)"
                      name="Reading"
                    />
                    <Area
                      type="monotone"
                      dataKey="listening"
                      stroke="#3B82F6"
                      strokeWidth={2}
                      fill="url(#colorListening)"
                      name="Listening"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="flex items-center justify-center gap-6 mt-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#D4A574]" />
                  <span className="text-xs text-muted-foreground">Reading</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#3B82F6]" />
                  <span className="text-xs text-muted-foreground">Listening</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Skill Radar */}
        <motion.div variants={itemVariants}>
          <Card className="border-border/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-semibold">Skill Analysis</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={skillRadar}>
                    <PolarGrid className="stroke-border/50" />
                    <PolarAngleAxis
                      dataKey="skill"
                      tick={{ fontSize: 11 }}
                      className="text-muted-foreground"
                    />
                    <PolarRadiusAxis
                      angle={30}
                      domain={[0, 100]}
                      tick={{ fontSize: 10 }}
                      className="text-muted-foreground"
                    />
                    <Radar
                      name="Score"
                      dataKey="score"
                      stroke="#D4A574"
                      fill="#D4A574"
                      fillOpacity={0.3}
                      strokeWidth={2}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Tests Distribution */}
      <motion.div variants={itemVariants}>
        <Card className="border-border/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">Tests Distribution</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={testDistribution}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border/50" />
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12 }}
                    className="text-muted-foreground"
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12 }}
                    className="text-muted-foreground"
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--card)",
                      border: "1px solid var(--border)",
                      borderRadius: "8px",
                      fontSize: "12px",
                    }}
                  />
                  <Bar
                    dataKey="tests"
                    fill="#D4A574"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}