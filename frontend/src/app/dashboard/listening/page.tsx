"use client";

import { motion, Variants } from "motion/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Headphones,
  Clock,
  Target,
  TrendingUp,
  History,
  Trophy,
  ChevronRight,
  FileText,
  Star,
  Volume2,
  AudioLines,
  Radio,
  Mic2,
  Ear,
  CheckCircle2,
  Lightbulb,
  Timer,
  RefreshCw,
  AudioWaveform,
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

// Recent listening tests
const recentTests = [
  {
    id: 1,
    title: "Academic Listening Test 5",
    date: "Yesterday",
    score: 7.5,
    totalQuestions: 40,
    correctAnswers: 35,
    duration: "30 min",
    sections: [
      { section: 1, score: 9, total: 10 },
      { section: 2, score: 8, total: 10 },
      { section: 3, score: 9, total: 10 },
      { section: 4, score: 9, total: 10 },
    ],
  },
  {
    id: 2,
    title: "Academic Listening Test 4",
    date: "3 days ago",
    score: 7.0,
    totalQuestions: 40,
    correctAnswers: 32,
    duration: "28 min",
    sections: [
      { section: 1, score: 8, total: 10 },
      { section: 2, score: 8, total: 10 },
      { section: 3, score: 8, total: 10 },
      { section: 4, score: 8, total: 10 },
    ],
  },
  {
    id: 3,
    title: "Academic Listening Test 3",
    date: "1 week ago",
    score: 6.5,
    totalQuestions: 40,
    correctAnswers: 28,
    duration: "30 min",
    sections: [
      { section: 1, score: 8, total: 10 },
      { section: 2, score: 7, total: 10 },
      { section: 3, score: 7, total: 10 },
      { section: 4, score: 6, total: 10 },
    ],
  },
];

// Available listening tests
const listeningTests = [
  {
    id: 1,
    title: "Academic Listening Test 1",
    topics: [
      "Campus Life",
      "University Lecture",
      "Academic Discussion",
      "Research Presentation",
    ],
    difficulty: "Medium",
    duration: "30 min",
    questions: 40,
    completed: true,
    bestScore: 7.5,
  },
  {
    id: 2,
    title: "Academic Listening Test 2",
    topics: [
      "Travel Booking",
      "City Tour",
      "Student Services",
      "Biology Lecture",
    ],
    difficulty: "Medium",
    duration: "30 min",
    questions: 40,
    completed: true,
    bestScore: 7.0,
  },
  {
    id: 3,
    title: "Academic Listening Test 3",
    topics: [
      "Job Interview",
      "Workplace Tour",
      "Business Meeting",
      "Psychology Lecture",
    ],
    difficulty: "Hard",
    duration: "30 min",
    questions: 40,
    completed: false,
    bestScore: null,
  },
  {
    id: 4,
    title: "Academic Listening Test 4",
    topics: [
      "Library Services",
      "Housing Info",
      "Group Project",
      "Environmental Science",
    ],
    difficulty: "Hard",
    duration: "30 min",
    questions: 40,
    completed: false,
    bestScore: null,
  },
];

// Listening sections info
const listeningSections = [
  {
    id: 1,
    title: "Section 1",
    subtitle: "Social Conversation",
    description: "A conversation between two people in a social context",
    icon: Headphones,
    color: "text-emerald-600 dark:text-emerald-400",
    bgColor: "bg-emerald-100 dark:bg-emerald-950/30",
    examples: [
      "Booking a hotel",
      "Making travel arrangements",
      "Discussing weekend plans",
    ],
    questionTypes: ["Form completion", "Note completion", "Multiple choice"],
    difficulty: "Easy-Medium",
    avgScore: 7.8,
  },
  {
    id: 2,
    title: "Section 2",
    subtitle: "Social Monologue",
    description: "A monologue on a general topic in a social context",
    icon: Mic2,
    color: "text-blue-600 dark:text-blue-400",
    bgColor: "bg-blue-100 dark:bg-blue-950/30",
    examples: ["Tour guide speech", "Radio broadcast", "Welcome presentation"],
    questionTypes: ["Sentence completion", "Matching", "Labeling"],
    difficulty: "Medium",
    avgScore: 7.2,
  },
  {
    id: 3,
    title: "Section 3",
    subtitle: "Educational Discussion",
    description: "A discussion between 2-4 people in an educational context",
    icon: Radio,
    color: "text-purple-600 dark:text-purple-400",
    bgColor: "bg-purple-100 dark:bg-purple-950/30",
    examples: [
      "Student-tutor discussion",
      "Research group meeting",
      "Assignment feedback",
    ],
    questionTypes: ["Multiple choice", "Matching", "Summary completion"],
    difficulty: "Medium-Hard",
    avgScore: 6.8,
  },
  {
    id: 4,
    title: "Section 4",
    subtitle: "Academic Lecture",
    description: "A monologue on an academic subject",
    icon: Volume2,
    color: "text-amber-600 dark:text-amber-400",
    bgColor: "bg-amber-100 dark:bg-amber-950/30",
    examples: ["University lecture", "Research presentation", "Academic talk"],
    questionTypes: ["Note completion", "Summary completion", "Short answer"],
    difficulty: "Hard",
    avgScore: 6.5,
  },
];

// Question type performance
const questionTypeStats = [
  { type: "Multiple Choice", accuracy: 82, completed: 45 },
  { type: "Form Completion", accuracy: 88, completed: 38 },
  { type: "Note Completion", accuracy: 75, completed: 52 },
  { type: "Matching", accuracy: 70, completed: 30 },
  { type: "Sentence Completion", accuracy: 78, completed: 42 },
];

// Audio features
const audioFeatures = [
  {
    icon: Ear,
    title: "Accent Variety",
    description: "British, American, Australian accents",
    status: "Practicing",
  },
  {
    icon: AudioWaveform,
    title: "Audio Quality",
    description: "Studio-quality recordings",
    status: "Premium",
  },
  {
    icon: RefreshCw,
    title: "Playback Speed",
    description: "Adjustable speed for practice",
    status: "Available",
  },
];

export default function ListeningPage() {
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
                <div className="w-14 h-14 rounded-xl bg-blue-100 dark:bg-blue-950/30 flex items-center justify-center">
                  <Headphones className="w-7 h-7 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h1 className="text-2xl font-semibold text-foreground">
                    Listening Practice
                  </h1>
                  <p className="text-muted-foreground">
                    Improve your listening comprehension with audio tests
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
                        <Headphones className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">
                          Tests Completed
                        </p>
                        <p className="text-xl font-semibold">15</p>
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
                        <p className="text-xl font-semibold">7.5</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-border/50">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                        <Clock className="w-5 h-5 text-purple-500" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">
                          Listening Time
                        </p>
                        <p className="text-xl font-semibold">7h 30m</p>
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
                          +1.0
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>

            {/* Listening Sections */}
            <motion.div variants={itemVariants}>
              <h2 className="text-lg font-semibold text-foreground mb-4">
                Listening Test Structure
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {listeningSections.map((section, index) => (
                  <motion.div
                    key={section.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="border-border/50 hover:border-border hover:shadow-md transition-all h-full">
                      <CardContent className="p-5">
                        <div className="flex items-center gap-3 mb-3">
                          <div
                            className={`w-10 h-10 rounded-lg ${section.bgColor} flex items-center justify-center`}
                          >
                            <section.icon
                              className={`w-5 h-5 ${section.color}`}
                            />
                          </div>
                          <div>
                            <h3 className="font-semibold text-foreground">
                              {section.title}
                            </h3>
                            <p className="text-xs text-muted-foreground">
                              {section.subtitle}
                            </p>
                          </div>
                        </div>

                        <p className="text-sm text-muted-foreground mb-3">
                          {section.description}
                        </p>

                        <div className="flex items-center justify-between mb-3">
                          <Badge variant="outline" className="text-xs">
                            {section.difficulty}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            Avg: {section.avgScore}
                          </span>
                        </div>

                        <div className="space-y-2">
                          <p className="text-xs font-medium text-muted-foreground">
                            Examples:
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {section.examples.slice(0, 2).map((example) => (
                              <Badge
                                key={example}
                                variant="secondary"
                                className="text-[10px]"
                              >
                                {example}
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

            {/* Performance & Available Tests Row */}
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Question Type Performance */}
              <motion.div variants={itemVariants} className="lg:col-span-2">
                <Card className="border-border/50 h-full">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base font-semibold">
                      Performance by Question Type
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {questionTypeStats.map((stat) => (
                        <div key={stat.type} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-foreground">
                              {stat.type}
                            </span>
                            <div className="flex items-center gap-3">
                              <span className="text-xs text-muted-foreground">
                                {stat.completed} completed
                              </span>
                              <span
                                className={`text-sm font-semibold ${
                                  stat.accuracy >= 80
                                    ? "text-emerald-600"
                                    : stat.accuracy >= 70
                                      ? "text-amber-600"
                                      : "text-red-600"
                                }`}
                              >
                                {stat.accuracy}%
                              </span>
                            </div>
                          </div>
                          <Progress
                            value={stat.accuracy}
                            className={`h-2 ${
                              stat.accuracy >= 80
                                ? "[&>div]:bg-emerald-500"
                                : stat.accuracy >= 70
                                  ? "[&>div]:bg-amber-500"
                                  : "[&>div]:bg-red-500"
                            }`}
                          />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Audio Features */}
              <motion.div variants={itemVariants}>
                <Card className="border-border/50 h-full">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base font-semibold">
                      Audio Features
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {audioFeatures.map((feature) => (
                        <div
                          key={feature.title}
                          className="flex items-start gap-3"
                        >
                          <div className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                            <feature.icon className="w-4 h-4 text-blue-600" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <p className="text-sm font-medium text-foreground">
                                {feature.title}
                              </p>
                              <Badge
                                variant="secondary"
                                className="text-[10px]"
                              >
                                {feature.status}
                              </Badge>
                            </div>
                            <p className="text-xs text-muted-foreground">
                              {feature.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

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
                {listeningTests.map((test, index) => (
                  <motion.div
                    key={test.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="border-border/50 hover:border-border hover:shadow-md transition-all group">
                      <CardContent className="p-5">
                        <div className="flex items-start justify-between mb-3">
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
                              <Headphones className="w-4 h-4 text-muted-foreground" />
                            )}
                          </div>
                        </div>

                        {/* Topics Preview */}
                        <div className="mb-4">
                          <p className="text-xs text-muted-foreground mb-2">
                            Topics covered:
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {test.topics.map((topic) => (
                              <Badge
                                key={topic}
                                variant="secondary"
                                className="text-[10px]"
                              >
                                {topic}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                          <div className="flex items-center gap-1">
                            <Timer className="w-4 h-4" />
                            {test.duration}
                          </div>
                          <div className="flex items-center gap-1">
                            <FileText className="w-4 h-4" />
                            {test.questions} questions
                          </div>
                          <div className="flex items-center gap-1">
                            <AudioLines className="w-4 h-4" />4 sections
                          </div>
                        </div>

                        <Link href={`/dashboard/listening/test/${test.id}`}>
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

            {/* Recent Results */}
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
                        className="p-4 hover:bg-secondary/50 transition-colors"
                      >
                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                          <div className="flex items-start gap-4">
                            <div
                              className={`w-12 h-12 rounded-lg flex items-center justify-center shrink-0 ${
                                test.score >= 7
                                  ? "bg-emerald-100 dark:bg-emerald-950/30"
                                  : test.score >= 6
                                    ? "bg-amber-100 dark:bg-amber-950/30"
                                    : "bg-red-100 dark:bg-red-950/30"
                              }`}
                            >
                              <span
                                className={`text-lg font-semibold ${
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
                            <div className="flex-1 min-w-0">
                              <h4 className="font-medium text-foreground mb-1">
                                {test.title}
                              </h4>
                              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                                <span>{test.date}</span>
                                <span>•</span>
                                <span>
                                  {test.correctAnswers}/{test.totalQuestions}{" "}
                                  correct
                                </span>
                                <span>•</span>
                                <span>{test.duration}</span>
                              </div>
                            </div>
                          </div>

                          {/* Section Scores */}
                          <div className="flex items-center gap-6">
                            <div className="flex items-center gap-3">
                              {test.sections.map((section) => (
                                <div
                                  key={section.section}
                                  className="text-center"
                                >
                                  <p className="text-[10px] text-muted-foreground mb-1">
                                    S{section.section}
                                  </p>
                                  <div className="w-8 h-8 rounded bg-secondary flex items-center justify-center">
                                    <span className="text-xs font-medium">
                                      {section.score}/{section.total}
                                    </span>
                                  </div>
                                </div>
                              ))}
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

            {/* Tips & Quick Practice */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Listening Tips */}
              <motion.div variants={itemVariants}>
                <Card className="border-border/50 bg-linear-to-br from-blue-50 to-blue-100/50 dark:from-blue-950/20 dark:to-blue-900/10 h-full">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-blue-200 dark:bg-blue-800/30 flex items-center justify-center">
                        <Lightbulb className="w-5 h-5 text-blue-700 dark:text-blue-400" />
                      </div>
                      <h3 className="font-semibold text-foreground">
                        Listening Tips
                      </h3>
                    </div>
                    <ul className="space-y-3">
                      {[
                        "Read questions before the audio starts",
                        "Listen for keywords and synonyms",
                        "Pay attention to signpost words",
                        "Don't worry if you miss something - move on",
                        "Use the 10-minute transfer time wisely",
                      ].map((tip, index) => (
                        <li
                          key={index}
                          className="flex items-start gap-2 text-sm text-foreground"
                        >
                          <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Quick Practice */}
              <motion.div variants={itemVariants}>
                <Card className="border-border/50 h-full">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center">
                        <AudioLines className="w-5 h-5 text-accent" />
                      </div>
                      <h3 className="font-semibold text-foreground">
                        Quick Practice
                      </h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">
                      Practice specific sections or question types without a
                      full test.
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                      <Link href="/dashboard/listening/practice/section1">
                        <Button
                          variant="outline"
                          className="w-full h-auto py-3 flex-col gap-1"
                        >
                          <span className="text-xs text-muted-foreground">
                            Section 1
                          </span>
                          <span className="text-sm">Social</span>
                        </Button>
                      </Link>
                      <Link href="/dashboard/listening/practice/section2">
                        <Button
                          variant="outline"
                          className="w-full h-auto py-3 flex-col gap-1"
                        >
                          <span className="text-xs text-muted-foreground">
                            Section 2
                          </span>
                          <span className="text-sm">Monologue</span>
                        </Button>
                      </Link>
                      <Link href="/dashboard/listening/practice/section3">
                        <Button
                          variant="outline"
                          className="w-full h-auto py-3 flex-col gap-1"
                        >
                          <span className="text-xs text-muted-foreground">
                            Section 3
                          </span>
                          <span className="text-sm">Discussion</span>
                        </Button>
                      </Link>
                      <Link href="/dashboard/listening/practice/section4">
                        <Button
                          variant="outline"
                          className="w-full h-auto py-3 flex-col gap-1"
                        >
                          <span className="text-xs text-muted-foreground">
                            Section 4
                          </span>
                          <span className="text-sm">Lecture</span>
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
