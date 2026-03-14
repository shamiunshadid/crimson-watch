"use client";

import { motion, Variants } from "motion/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
// import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  PenTool,
  Target,
  TrendingUp,
  History,
  Trophy,
  ChevronRight,
  FileText,
  Star,
  Type,
  SpellCheck,
  FileChartColumn,
  BookOpenCheck,
  Lightbulb,
  CheckCircle2,
  Timer,
  Search,
  Bell,
} from "lucide-react";
import { cn } from "@/lib/utils";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
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

// Recent writing submissions
const recentSubmissions = [
  {
    id: 1,
    taskType: "Task 2",
    topic:
      "Some people believe that universities should focus on providing academic skills...",
    date: "1 day ago",
    bandScore: 7.0,
    wordCount: 285,
    grammarScore: 85,
    coherenceScore: 78,
    lexResourceScore: 82,
    duration: "38 min",
  },
  {
    id: 2,
    taskType: "Task 1",
    topic:
      "The chart shows the percentage of households in owned and rented accommodation...",
    date: "3 days ago",
    bandScore: 6.5,
    wordCount: 172,
    grammarScore: 80,
    coherenceScore: 75,
    lexResourceScore: 78,
    duration: "18 min",
  },
  {
    id: 3,
    taskType: "Task 2",
    topic:
      "In many countries, people are now living longer than ever before...",
    date: "5 days ago",
    bandScore: 6.0,
    wordCount: 268,
    grammarScore: 72,
    coherenceScore: 70,
    lexResourceScore: 68,
    duration: "42 min",
  },
];

// Available writing tests
const writingTests = [
  {
    id: 1,
    title: "Academic Writing Test 1",
    task1Topic: "Bar Chart - Population Growth",
    task2Topic: "Education & Technology",
    difficulty: "Medium",
    duration: "60 min",
    completed: true,
    bestScore: 7.0,
  },
  {
    id: 2,
    title: "Academic Writing Test 2",
    task1Topic: "Line Graph - Energy Consumption",
    task2Topic: "Environmental Issues",
    difficulty: "Medium",
    duration: "60 min",
    completed: true,
    bestScore: 6.5,
  },
  {
    id: 3,
    title: "Academic Writing Test 3",
    task1Topic: "Pie Chart - Global Spending",
    task2Topic: "Health & Lifestyle",
    difficulty: "Hard",
    duration: "60 min",
    completed: false,
    bestScore: null,
  },
  {
    id: 4,
    title: "Academic Writing Test 4",
    task1Topic: "Diagram - Process Description",
    task2Topic: "Work & Career",
    difficulty: "Hard",
    duration: "60 min",
    completed: false,
    bestScore: null,
  },
];

// Common writing topics
const commonTopics = [
  { name: "Education", count: 15, color: "bg-blue-500" },
  { name: "Technology", count: 12, color: "bg-purple-500" },
  { name: "Environment", count: 10, color: "bg-emerald-500" },
  { name: "Health", count: 8, color: "bg-rose-500" },
  { name: "Society", count: 14, color: "bg-amber-500" },
  { name: "Work", count: 9, color: "bg-cyan-500" },
];

// Task types overview
const taskTypes = [
  {
    id: "task1",
    title: "Task 1 - Report Writing",
    description: "Describe visual information in at least 150 words",
    icon: FileChartColumn,
    color: "text-blue-600 dark:text-blue-400",
    bgColor: "bg-blue-100 dark:bg-blue-950/30",
    stats: {
      completed: 12,
      avgScore: 6.5,
      avgWords: 178,
      timeLimit: "20 min",
    },
    skills: [
      "Data interpretation",
      "Comparisons",
      "Trends description",
      "Overview writing",
    ],
  },
  {
    id: "task2",
    title: "Task 2 - Essay Writing",
    description: "Write an essay in response to a point of view or problem",
    icon: PenTool,
    color: "text-purple-600 dark:text-purple-400",
    bgColor: "bg-purple-100 dark:bg-purple-950/30",
    stats: {
      completed: 10,
      avgScore: 6.8,
      avgWords: 272,
      timeLimit: "40 min",
    },
    skills: [
      "Argument development",
      "Opinion expression",
      "Problem solving",
      "Critical thinking",
    ],
  },
];

export default function WritingPage() {
  return (
    <div className="min-h-screen bg-background">
      <div
        className={cn(
          "transition-all duration-300 min-h-screen",
          "ml-64", // Sidebar width
        )}
      >
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card border-b border-border/50 px-6 py-4"
        >
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-emerald-100 dark:bg-emerald-950/30 flex items-center justify-center">
                  <PenTool className="w-7 h-7 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <h1 className="text-2xl font-semibold text-foreground">
                    Writing Practice
                  </h1>
                  <p className="text-muted-foreground">
                    Master Task 1 and Task 2 writing skills
                  </p>
                </div>
              </div>
              {/* right side search and notification */}
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2 hover:text-white"
                >
                  <Search className="w-4 h-4" />
                  <span className="hidden sm:inline">Search</span>
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="relative hover:text-white"
                >
                  <Bell className="w-4 h-4" />
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-accent text-accent-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
                    3
                  </span>
                </Button>
              </div>
            </div>
          </div>
        </motion.header>

        {/* Main Content */}
        <main className="max-w-6xl mx-auto px-6 py-8">
          <motion.div
            className="space-y-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Stats Overview */}
            <motion.div variants={itemVariants}>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card className="border-border/50">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                        <FileText className="w-5 h-5 text-emerald-600" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">
                          Tests Completed
                        </p>
                        <p className="text-xl font-semibold">22</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-border/50">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                        <Target className="w-5 h-5 text-accent" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">
                          Avg Band Score
                        </p>
                        <p className="text-xl font-semibold">6.8</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-border/50">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                        <Type className="w-5 h-5 text-blue-500" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">
                          Total Words
                        </p>
                        <p className="text-xl font-semibold">9,450</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-border/50">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                        <TrendingUp className="w-5 h-5 text-emerald-500" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">
                          Improvement
                        </p>
                        <p className="text-xl font-semibold text-emerald-600">
                          +0.8
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>

            {/* Task Types */}
            <motion.div variants={itemVariants}>
              <h2 className="text-lg font-semibold text-foreground mb-4">
                Writing Task Types
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {taskTypes.map((task, index) => (
                  <motion.div
                    key={task.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="border-border/50 hover:border-border hover:shadow-md transition-all h-full">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4 mb-4">
                          <div
                            className={`w-12 h-12 rounded-xl ${task.bgColor} flex items-center justify-center shrink-0`}
                          >
                            <task.icon className={`w-6 h-6 ${task.color}`} />
                          </div>
                          <div>
                            <h3 className="font-semibold text-foreground">
                              {task.title}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {task.description}
                            </p>
                          </div>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-2 gap-3 mb-4">
                          <div className="p-3 bg-secondary/50 rounded-lg">
                            <p className="text-xs text-muted-foreground">
                              Completed
                            </p>
                            <p className="text-lg font-semibold">
                              {task.stats.completed}
                            </p>
                          </div>
                          <div className="p-3 bg-secondary/50 rounded-lg">
                            <p className="text-xs text-muted-foreground">
                              Avg Score
                            </p>
                            <p className="text-lg font-semibold">
                              {task.stats.avgScore}
                            </p>
                          </div>
                          <div className="p-3 bg-secondary/50 rounded-lg">
                            <p className="text-xs text-muted-foreground">
                              Avg Words
                            </p>
                            <p className="text-lg font-semibold">
                              {task.stats.avgWords}
                            </p>
                          </div>
                          <div className="p-3 bg-secondary/50 rounded-lg">
                            <p className="text-xs text-muted-foreground">
                              Time Limit
                            </p>
                            <p className="text-lg font-semibold">
                              {task.stats.timeLimit}
                            </p>
                          </div>
                        </div>

                        {/* Skills */}
                        <div>
                          <p className="text-xs text-muted-foreground mb-2">
                            Key Skills
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {task.skills.map((skill) => (
                              <Badge
                                key={skill}
                                variant="secondary"
                                className="text-xs"
                              >
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Score Breakdown */}
            <motion.div variants={itemVariants}>
              <Card className="border-border/50">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-semibold">
                    Writing Assessment Criteria
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-4 gap-6">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">
                          Task Achievement
                        </span>
                        <span className="text-sm text-accent font-semibold">
                          7.0
                        </span>
                      </div>
                      <Progress value={70} className="h-2" />
                      <p className="text-xs text-muted-foreground">
                        Addresses all parts of the task
                      </p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">
                          Coherence & Cohesion
                        </span>
                        <span className="text-sm text-accent font-semibold">
                          6.5
                        </span>
                      </div>
                      <Progress value={65} className="h-2" />
                      <p className="text-xs text-muted-foreground">
                        Logical organization of ideas
                      </p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">
                          Lexical Resource
                        </span>
                        <span className="text-sm text-accent font-semibold">
                          6.8
                        </span>
                      </div>
                      <Progress value={68} className="h-2" />
                      <p className="text-xs text-muted-foreground">
                        Range of vocabulary used
                      </p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">
                          Grammar Range
                        </span>
                        <span className="text-sm text-accent font-semibold">
                          6.5
                        </span>
                      </div>
                      <Progress value={65} className="h-2" />
                      <p className="text-xs text-muted-foreground">
                        Accuracy & variety of structures
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Available Tests */}
            <motion.div variants={itemVariants}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-foreground">
                  Available Tests
                </h2>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground"
                >
                  View All
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {writingTests.map((test, index) => (
                  <motion.div
                    key={test.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="border-border/50 hover:border-border hover:shadow-md transition-all group">
                      <CardContent className="p-5">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="font-semibold text-foreground mb-1">
                              {test.title}
                            </h3>
                            <div className="flex items-center gap-2">
                              <Badge
                                variant={
                                  test.difficulty === "Hard"
                                    ? "destructive"
                                    : "secondary"
                                }
                                className="text-xs"
                              >
                                {test.difficulty}
                              </Badge>
                              {test.completed && (
                                <Badge
                                  variant="outline"
                                  className="text-xs border-emerald-500 text-emerald-600"
                                >
                                  <Star className="w-3 h-3 mr-1" />
                                  Best: {test.bestScore}
                                </Badge>
                              )}
                            </div>
                          </div>
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              test.completed
                                ? "bg-emerald-100 dark:bg-emerald-950/30"
                                : "bg-secondary"
                            }`}
                          >
                            {test.completed ? (
                              <Trophy className="w-4 h-4 text-emerald-600" />
                            ) : (
                              <PenTool className="w-4 h-4 text-muted-foreground" />
                            )}
                          </div>
                        </div>

                        {/* Task Topics */}
                        <div className="space-y-2 mb-4">
                          <div className="flex items-center gap-2 text-sm">
                            <Badge variant="outline" className="text-xs">
                              Task 1
                            </Badge>
                            <span className="text-muted-foreground truncate">
                              {test.task1Topic}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Badge variant="outline" className="text-xs">
                              Task 2
                            </Badge>
                            <span className="text-muted-foreground truncate">
                              {test.task2Topic}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                          <div className="flex items-center gap-1">
                            <Timer className="w-4 h-4" />
                            {test.duration}
                          </div>
                          <div className="flex items-center gap-1">
                            <FileText className="w-4 h-4" />2 tasks
                          </div>
                        </div>

                        <Link href={`/dashboard/writing/test/${test.id}`}>
                          <Button
                            className="w-full"
                            variant={test.completed ? "outline" : "default"}
                          >
                            {test.completed ? "Retake Test" : "Start Test"}
                            <ChevronRight className="w-4 h-4 ml-1" />
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Recent Submissions */}
            <motion.div variants={itemVariants}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-foreground">
                  Recent Submissions
                </h2>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground"
                >
                  <History className="w-4 h-4 mr-1" />
                  View History
                </Button>
              </div>
              <Card className="border-border/50">
                <CardContent className="p-0">
                  <div className="divide-y divide-border/50">
                    {recentSubmissions.map((submission) => (
                      <div
                        key={submission.id}
                        className="p-4 hover:bg-secondary/50 transition-colors"
                      >
                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                          <div className="flex items-start gap-4">
                            <div
                              className={`w-12 h-12 rounded-lg flex items-center justify-center shrink-0 ${
                                submission.bandScore >= 7
                                  ? "bg-emerald-100 dark:bg-emerald-950/30"
                                  : submission.bandScore >= 6
                                    ? "bg-amber-100 dark:bg-amber-950/30"
                                    : "bg-red-100 dark:bg-red-950/30"
                              }`}
                            >
                              <span
                                className={`text-lg font-semibold ${
                                  submission.bandScore >= 7
                                    ? "text-emerald-600"
                                    : submission.bandScore >= 6
                                      ? "text-amber-600"
                                      : "text-red-600"
                                }`}
                              >
                                {submission.bandScore}
                              </span>
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <Badge
                                  variant={
                                    submission.taskType === "Task 2"
                                      ? "default"
                                      : "secondary"
                                  }
                                  className="text-xs"
                                >
                                  {submission.taskType}
                                </Badge>
                                <span className="text-xs text-muted-foreground">
                                  {submission.date}
                                </span>
                              </div>
                              <p className="text-sm text-foreground line-clamp-2 mb-2">
                                {submission.topic}
                              </p>
                              <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                                <span className="flex items-center gap-1">
                                  <Type className="w-3 h-3" />
                                  {submission.wordCount} words
                                </span>
                                <span className="flex items-center gap-1">
                                  <Timer className="w-3 h-3" />
                                  {submission.duration}
                                </span>
                                <span className="flex items-center gap-1">
                                  <SpellCheck className="w-3 h-3" />
                                  Grammar: {submission.grammarScore}%
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Score Breakdown */}
                          <div className="flex items-center gap-4 lg:gap-6">
                            <div className="flex items-center gap-4">
                              <div className="text-center">
                                <p className="text-xs text-muted-foreground">
                                  Grammar
                                </p>
                                <p className="text-sm font-semibold text-foreground">
                                  {submission.grammarScore}%
                                </p>
                              </div>
                              <div className="text-center">
                                <p className="text-xs text-muted-foreground">
                                  Coherence
                                </p>
                                <p className="text-sm font-semibold text-foreground">
                                  {submission.coherenceScore}%
                                </p>
                              </div>
                              <div className="text-center">
                                <p className="text-xs text-muted-foreground">
                                  Vocabulary
                                </p>
                                <p className="text-sm font-semibold text-foreground">
                                  {submission.lexResourceScore}%
                                </p>
                              </div>
                            </div>
                            <Button variant="ghost" size="sm">
                              Review
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Common Topics & Tips */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Common Topics */}
              <motion.div variants={itemVariants}>
                <Card className="border-border/50 h-full">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base font-semibold">
                      Common Essay Topics
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {commonTopics.map((topic) => (
                        <div
                          key={topic.name}
                          className="flex items-center justify-between"
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-3 h-3 rounded-full ${topic.color}`}
                            />
                            <span className="text-sm text-foreground">
                              {topic.name}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-24 h-1.5 bg-secondary rounded-full overflow-hidden">
                              <div
                                className={`h-full ${topic.color} rounded-full`}
                                style={{
                                  width: `${(topic.count / 15) * 100}%`,
                                }}
                              />
                            </div>
                            <span className="text-xs text-muted-foreground w-8">
                              {topic.count}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Writing Tips */}
              <motion.div variants={itemVariants}>
                <Card className="border-border/50 bg-linear-to-br from-emerald-50 to-emerald-100/50 dark:from-emerald-950/20 dark:to-emerald-900/10 h-full">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-emerald-200 dark:bg-emerald-800/30 flex items-center justify-center">
                        <Lightbulb className="w-5 h-5 text-emerald-700 dark:text-emerald-400" />
                      </div>
                      <h3 className="font-semibold text-foreground">
                        Writing Tips
                      </h3>
                    </div>
                    <ul className="space-y-3">
                      {[
                        "Plan your essay before writing - spend 2-3 minutes outlining",
                        "Task 2 carries more weight - allocate 40 minutes to it",
                        "Use a variety of sentence structures and vocabulary",
                        "Always proofread for grammar and spelling errors",
                        "Practice writing within time limits regularly",
                      ].map((tip, index) => (
                        <li
                          key={index}
                          className="flex items-start gap-2 text-sm text-foreground"
                        >
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Quick Practice */}
            <motion.div variants={itemVariants}>
              <Card className="border-border/50">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center">
                        <BookOpenCheck className="w-6 h-6 text-accent" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">
                          Quick Practice
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Practice individual tasks without time pressure
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Link href="/dashboard/writing/practice/task1">
                        <Button variant="outline" className="gap-2">
                          <FileChartColumn className="w-4 h-4" />
                          Task 1
                        </Button>
                      </Link>
                      <Link href="/dashboard/writing/practice/task2">
                        <Button variant="outline" className="gap-2">
                          <PenTool className="w-4 h-4" />
                          Task 2
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
