"use client";

import { motion, Variants } from "motion/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  BookOpen,
  Clock,
  Target,
  TrendingUp,
  History,
  Trophy,
  ChevronRight,
  FileText,
  Star,
  Search,
  Bell,
} from "lucide-react";
import { Sidebar } from "../_components/Sidebar";
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

const recentTests = [
  {
    id: 1,
    title: "Academic Reading Test 5",
    date: "2 days ago",
    score: 7.0,
    totalQuestions: 40,
    correctAnswers: 32,
    duration: "58 min",
  },
  {
    id: 2,
    title: "Academic Reading Test 4",
    date: "5 days ago",
    score: 6.5,
    totalQuestions: 40,
    correctAnswers: 28,
    duration: "55 min",
  },
  {
    id: 3,
    title: "Academic Reading Test 3",
    date: "1 week ago",
    score: 6.0,
    totalQuestions: 40,
    correctAnswers: 25,
    duration: "60 min",
  },
];

const availableTests = [
  {
    id: 1,
    title: "Academic Reading Test 1",
    difficulty: "Easy",
    passages: 3,
    questions: 40,
    duration: "60 min",
    bestScore: 7.0,
  },
  {
    id: 2,
    title: "Academic Reading Test 2",
    difficulty: "Medium",
    passages: 3,
    questions: 40,
    duration: "60 min",
  },
  {
    id: 3,
    title: "Academic Reading Test 3",
    difficulty: "Hard",
    passages: 3,
    questions: 40,
    duration: "60 min",
  },
  {
    id: 4,
    title: "Academic Reading Test 4",
    difficulty: "Hard",
    passages: 3,
    questions: 40,
    duration: "60 min",
  },
];

const alreadyTakenTests = [
  {
    id: 1,
    title: "Academic Reading Test 1",
    difficulty: "Medium",
    passages: 3,
    questions: 40,
    duration: "60 min",
    completed: true,
    bestScore: 7.0,
  },
  {
    id: 2,
    title: "Academic Reading Test 2",
    difficulty: "Medium",
    passages: 3,
    questions: 40,
    duration: "60 min",
    completed: true,
    bestScore: 6.5,
  },
  {
    id: 3,
    title: "Academic Reading Test 3",
    difficulty: "Hard",
    passages: 3,
    questions: 40,
    duration: "60 min",
    completed: true,
    bestScore: 6.0,
  },
  {
    id: 4,
    title: "Academic Reading Test 4",
    difficulty: "Hard",
    passages: 3,
    questions: 40,
    duration: "60 min",
    completed: true,
    bestScore: 6.5,
  },
];

export default function ReadingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />

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
                <div className="w-14 h-14 rounded-xl bg-amber-100 dark:bg-amber-950/30 flex items-center justify-center">
                  <BookOpen className="w-7 h-7 text-amber-600 dark:text-amber-400" />
                </div>
                <div>
                  <h1 className="text-2xl font-semibold text-foreground">
                    Reading Practice
                  </h1>
                  <p className="text-muted-foreground">
                    Improve your reading comprehension skills
                  </p>
                </div>
              </div>
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
                        <FileText className="w-5 h-5 text-amber-600" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">
                          Tests Taken
                        </p>
                        <p className="text-xl font-semibold">12</p>
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
                          Avg Score
                        </p>
                        <p className="text-xl font-semibold">7.0</p>
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
                          +0.5
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-border/50">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                        <Clock className="w-5 h-5 text-blue-500" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">
                          Total Time
                        </p>
                        <p className="text-xl font-semibold">8h 24m</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
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
              <div className="grid md:grid-cols-3 2xl:grid-col-4 gap-4">
                {availableTests.map((test, index) => (
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
                            </div>
                          </div>
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center bg-secondary
                            }`}
                          >
                            <BookOpen className="w-4 h-4 text-muted-foreground" />
                          </div>
                        </div>

                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                          <div className="flex items-center gap-1">
                            <FileText className="w-4 h-4" />
                            {test.passages} passages
                          </div>
                          <div className="flex items-center gap-1">
                            <Target className="w-4 h-4" />
                            {test.questions} questions
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {test.duration}
                          </div>
                        </div>

                          {/* Here I need to put a real link */}
                        <Link href={`/dashboard/reading/test/something`}>
                          <Button className="w-full">
                            Start Test
                            <ChevronRight className="w-4 h-4 ml-1" />
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Already test taken */}
            <motion.div variants={itemVariants}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-foreground">
                  Already Taken Tests
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
              <div className="grid md:grid-cols-3 2xl:grid-col-4 gap-4">
                {alreadyTakenTests.map((test, index) => (
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
                          {test.completed && (
                            <div className="w-8 h-8 rounded-full flex items-center justify-center bg-emerald-100 dark:bg-emerald-950/30">
                              <Trophy className="w-4 h-4 text-emerald-600" />
                            </div>
                          )}
                        </div>

                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                          <div className="flex items-center gap-1">
                            <FileText className="w-4 h-4" />
                            {test.passages} passages
                          </div>
                          <div className="flex items-center gap-1">
                            <Target className="w-4 h-4" />
                            {test.questions} questions
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {test.duration}
                          </div>
                        </div>

                          {/* Here also need to put real link which will come from db */}
                        <Link href={`/dashboard/reading/test/something`}>
                          <Button
                            className="w-full hover:text-white"
                            variant={"outline"}
                          >
                            Retake Test
                            <ChevronRight className="w-4 h-4 ml-1" />
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Recent Tests */}
            <motion.div variants={itemVariants}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-foreground">
                  Recent Results
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
                    {recentTests.map((test) => (
                      <div
                        key={test.id}
                        className="flex items-center justify-between p-4 hover:bg-secondary/50 transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <div
                            className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                              test.score >= 7
                                ? "bg-emerald-100 dark:bg-emerald-950/30"
                                : test.score >= 6
                                  ? "bg-amber-100 dark:bg-amber-950/30"
                                  : "bg-red-100 dark:bg-red-950/30"
                            }`}
                          >
                            <span
                              className={`font-semibold ${
                                test.score >= 7
                                  ? "text-emerald-600"
                                  : test.score >= 6
                                    ? "text-amber-600"
                                    : "text-red-600"
                              }`}
                            >
                              {test.score}
                            </span>
                          </div>
                          <div>
                            <h4 className="font-medium text-foreground">
                              {test.title}
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              {test.correctAnswers}/{test.totalQuestions}{" "}
                              correct • {test.duration}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-sm text-muted-foreground">
                            {test.date}
                          </span>
                          <Button variant="ghost" size="sm">
                            Review
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Tips Section */}
            <motion.div variants={itemVariants}>
              <Card className="border-border/50 bg-linear-to-r from-amber-50 to-amber-100/50 dark:from-amber-950/20 dark:to-amber-900/10">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-amber-200 dark:bg-amber-800/30 flex items-center justify-center shrink-0">
                      <BookOpen className="w-6 h-6 text-amber-700 dark:text-amber-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground mb-1">
                        Reading Tips
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Skim the passage first to get the main idea, then read
                        questions before detailed reading. Manage your time -
                        spend about 20 minutes per passage.
                      </p>
                    </div>
                    <Button variant="outline" className="shrink-0">
                      More Tips
                    </Button>
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
