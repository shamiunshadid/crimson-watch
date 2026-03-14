"use client";

import { motion, Variants } from "motion/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Mic,
  Clock,
  Target,
  TrendingUp,
  History,
  Trophy,
  ChevronRight,
  Star,
  MessageSquare,
  AudioWaveform,
  // Voice,
  Users,
  Brain,
  MessageCircle,
  CheckCircle2,
  Lightbulb,
  Timer,
  Video,
  Sparkles,
  Gauge,
  Zap,
  Podcast,
  Disc2,
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

// Recent speaking sessions
const recentSessions = [
  {
    id: 1,
    title: "Full Speaking Test 3",
    date: "2 days ago",
    bandScore: 6.5,
    duration: "14 min",
    part1Score: 7.0,
    part2Score: 6.0,
    part3Score: 6.5,
    fluency: 72,
    vocabulary: 68,
    grammar: 70,
    pronunciation: 75,
  },
  {
    id: 2,
    title: "Full Speaking Test 2",
    date: "5 days ago",
    bandScore: 6.0,
    duration: "12 min",
    part1Score: 6.5,
    part2Score: 5.5,
    part3Score: 6.0,
    fluency: 65,
    vocabulary: 62,
    grammar: 60,
    pronunciation: 68,
  },
  {
    id: 3,
    title: "Part 2 Practice",
    date: "1 week ago",
    bandScore: 6.0,
    duration: "4 min",
    part1Score: null,
    part2Score: 6.0,
    part3Score: null,
    fluency: 60,
    vocabulary: 58,
    grammar: 55,
    pronunciation: 65,
  },
];

// Available speaking tests
const speakingTests = [
  {
    id: 1,
    title: "Full Speaking Test 1",
    topics: [
      "Home & Hometown",
      "Describe a memorable trip",
      "Tourism & Travel",
    ],
    difficulty: "Medium",
    duration: "11-14 min",
    parts: 3,
    completed: true,
    bestScore: 7.0,
  },
  {
    id: 2,
    title: "Full Speaking Test 2",
    topics: [
      "Work & Studies",
      "Describe a skill you want to learn",
      "Education & Skills",
    ],
    difficulty: "Medium",
    duration: "11-14 min",
    parts: 3,
    completed: true,
    bestScore: 6.5,
  },
  {
    id: 3,
    title: "Full Speaking Test 3",
    topics: [
      "Hobbies & Interests",
      "Describe a book you enjoyed",
      "Reading & Media",
    ],
    difficulty: "Hard",
    duration: "11-14 min",
    parts: 3,
    completed: false,
    bestScore: null,
  },
  {
    id: 4,
    title: "Full Speaking Test 4",
    topics: [
      "Daily Routine",
      "Describe a challenge you faced",
      "Success & Failure",
    ],
    difficulty: "Hard",
    duration: "11-14 min",
    parts: 3,
    completed: false,
    bestScore: null,
  },
];

// Speaking parts info
const speakingParts = [
  {
    id: 1,
    title: "Part 1",
    subtitle: "Introduction & Interview",
    description: "General questions about yourself and familiar topics",
    icon: MessageCircle,
    color: "text-emerald-600 dark:text-emerald-400",
    bgColor: "bg-emerald-100 dark:bg-emerald-950/30",
    duration: "4-5 min",
    questions: "4-6 questions",
    focus: "Personal information, hobbies, interests, daily life",
    tips: [
      "Keep answers concise (2-3 sentences)",
      "Use a variety of vocabulary",
      "Stay relaxed and natural",
    ],
  },
  {
    id: 2,
    title: "Part 2",
    subtitle: "Individual Long Turn",
    description: "Speak about a given topic for 1-2 minutes",
    icon: Mic,
    color: "text-purple-600 dark:text-purple-400",
    bgColor: "bg-purple-100 dark:bg-purple-950/30",
    duration: "3-4 min",
    questions: "1 topic + follow-up",
    focus: "Describing experiences, people, places, objects, events",
    tips: [
      "Use the 1-minute prep time wisely",
      "Cover all bullet points",
      "Use linking words and phrases",
    ],
  },
  {
    id: 3,
    title: "Part 3",
    subtitle: "Two-way Discussion",
    description: "In-depth discussion related to Part 2 topic",
    icon: Users,
    color: "text-amber-600 dark:text-amber-400",
    bgColor: "bg-amber-100 dark:bg-amber-950/30",
    duration: "4-5 min",
    questions: "4-6 questions",
    focus: "Abstract ideas, opinions, social issues",
    tips: [
      "Extend your answers with examples",
      "Express and justify opinions",
      "Use complex grammar structures",
    ],
  },
];

// Assessment criteria
const assessmentCriteria = [
  {
    name: "Fluency & Coherence",
    score: 6.5,
    description: "Smooth flow of speech, logical organization",
    icon: Zap,
    color: "text-blue-500",
    tips: "Practice speaking at length, use connectives",
  },
  {
    name: "Lexical Resource",
    score: 6.0,
    description: "Range and accuracy of vocabulary",
    icon: Brain,
    color: "text-purple-500",
    tips: "Use idioms, collocations, and topic-specific words",
  },
  {
    name: "Grammatical Range",
    score: 6.0,
    description: "Variety and accuracy of grammar",
    icon: MessageSquare,
    color: "text-emerald-500",
    tips: "Mix simple and complex sentence structures",
  },
  {
    name: "Pronunciation",
    score: 6.5,
    description: "Clarity and natural speech patterns",
    icon: Podcast,
    color: "text-amber-500",
    tips: "Focus on word stress, intonation, and rhythm",
  },
];

// Common topics
const commonTopics = [
  { name: "Home & Hometown", practiced: 5, total: 8 },
  { name: "Work & Studies", practiced: 4, total: 7 },
  { name: "Hobbies & Interests", practiced: 6, total: 8 },
  { name: "Travel & Tourism", practiced: 3, total: 6 },
  { name: "Technology", practiced: 2, total: 5 },
  { name: "Environment", practiced: 1, total: 4 },
];

// Practice modes
const practiceModes = [
  {
    id: "full",
    title: "Full Test",
    description: "Complete 3-part speaking test simulation",
    icon: Video,
    duration: "11-14 min",
    color: "text-primary",
  },
  {
    id: "part1",
    title: "Part 1 Only",
    description: "Practice introduction and interview questions",
    icon: MessageCircle,
    duration: "4-5 min",
    color: "text-emerald-600",
  },
  {
    id: "part2",
    title: "Part 2 Only",
    description: "Practice individual long turn with cue card",
    icon: Mic,
    duration: "3-4 min",
    color: "text-purple-600",
  },
  {
    id: "part3",
    title: "Part 3 Only",
    description: "Practice abstract discussion questions",
    icon: Users,
    duration: "4-5 min",
    color: "text-amber-600",
  },
];

export default function SpeakingPage() {
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
                <div className="w-14 h-14 rounded-xl bg-purple-100 dark:bg-purple-950/30 flex items-center justify-center">
                  <Mic className="w-7 h-7 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <h1 className="text-2xl font-semibold text-foreground">
                    Speaking Practice
                  </h1>
                  <p className="text-muted-foreground">
                    Practice with AI-powered speaking tests and feedback
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
                        <Mic className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">
                          Tests Completed
                        </p>
                        <p className="text-xl font-semibold">8</p>
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
                        <p className="text-xl font-semibold">6.5</p>
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
                          Practice Time
                        </p>
                        <p className="text-xl font-semibold">2h 45m</p>
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
              </div>
            </motion.div>

            {/* Speaking Test Parts */}
            <motion.div variants={itemVariants}>
              <h2 className="text-lg font-semibold text-foreground mb-4">
                Speaking Test Structure
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                {speakingParts.map((part, index) => (
                  <motion.div
                    key={part.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="border-border/50 hover:border-border hover:shadow-md transition-all h-full">
                      <CardContent className="p-5">
                        <div className="flex items-center gap-3 mb-4">
                          <div
                            className={`w-12 h-12 rounded-xl ${part.bgColor} flex items-center justify-center`}
                          >
                            <part.icon className={`w-6 h-6 ${part.color}`} />
                          </div>
                          <div>
                            <h3 className="font-semibold text-foreground">
                              {part.title}
                            </h3>
                            <p className="text-xs text-muted-foreground">
                              {part.subtitle}
                            </p>
                          </div>
                        </div>

                        <p className="text-sm text-muted-foreground mb-4">
                          {part.description}
                        </p>

                        <div className="grid grid-cols-2 gap-3 mb-4">
                          <div className="p-2 bg-secondary/50 rounded-lg text-center">
                            <p className="text-xs text-muted-foreground">
                              Duration
                            </p>
                            <p className="text-sm font-medium">
                              {part.duration}
                            </p>
                          </div>
                          <div className="p-2 bg-secondary/50 rounded-lg text-center">
                            <p className="text-xs text-muted-foreground">
                              Questions
                            </p>
                            <p className="text-sm font-medium">
                              {part.questions}
                            </p>
                          </div>
                        </div>

                        <div className="mb-3">
                          <p className="text-xs text-muted-foreground mb-1">
                            Focus Topics:
                          </p>
                          <p className="text-sm text-foreground">
                            {part.focus}
                          </p>
                        </div>

                        <div>
                          <p className="text-xs text-muted-foreground mb-2">
                            Tips:
                          </p>
                          <ul className="space-y-1">
                            {part.tips.map((tip, idx) => (
                              <li
                                key={idx}
                                className="text-xs text-foreground flex items-start gap-1"
                              >
                                <CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0 mt-0.5" />
                                {tip}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Assessment Criteria */}
            <motion.div variants={itemVariants}>
              <Card className="border-border/50">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base font-semibold">
                      Assessment Criteria
                    </CardTitle>
                    <Badge variant="secondary" className="text-xs">
                      Overall: 6.5
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {assessmentCriteria.map((criteria) => (
                      <div key={criteria.name} className="space-y-3">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center">
                            <criteria.icon
                              className={`w-4 h-4 ${criteria.color}`}
                            />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-foreground">
                              {criteria.name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {criteria.description}
                            </p>
                          </div>
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-muted-foreground">
                              Score
                            </span>
                            <span className="text-sm font-semibold">
                              {criteria.score}
                            </span>
                          </div>
                          <Progress
                            value={criteria.score * 10}
                            className="h-2"
                          />
                        </div>
                        <p className="text-xs text-muted-foreground">
                          💡 {criteria.tips}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Practice Modes & Topics Row */}
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Practice Modes */}
              <motion.div variants={itemVariants} className="lg:col-span-2">
                <Card className="border-border/50 h-full">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base font-semibold">
                      Practice Modes
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      {practiceModes.map((mode) => (
                        <Link
                          key={mode.id}
                          href={`/dashboard/speaking/test/1?mode=${mode.id}`}
                        >
                          <motion.div
                            className="p-4 rounded-xl border border-border/50 hover:border-border hover:bg-secondary/50 transition-all cursor-pointer group"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <div className="flex items-start gap-3">
                              <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                                <mode.icon
                                  className={`w-5 h-5 ${mode.color}`}
                                />
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center justify-between">
                                  <h4 className="font-medium text-foreground group-hover:text-accent transition-colors">
                                    {mode.title}
                                  </h4>
                                  <Badge
                                    variant="secondary"
                                    className="text-[10px]"
                                  >
                                    {mode.duration}
                                  </Badge>
                                </div>
                                <p className="text-xs text-muted-foreground mt-1">
                                  {mode.description}
                                </p>
                              </div>
                              <ChevronRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                          </motion.div>
                        </Link>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Common Topics */}
              <motion.div variants={itemVariants}>
                <Card className="border-border/50 h-full">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base font-semibold">
                      Common Topics
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {commonTopics.map((topic) => (
                        <div key={topic.name} className="space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-foreground">
                              {topic.name}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {topic.practiced}/{topic.total}
                            </span>
                          </div>
                          <Progress
                            value={(topic.practiced / topic.total) * 100}
                            className="h-1.5"
                          />
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
                {speakingTests.map((test, index) => (
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
                              <Mic className="w-4 h-4 text-muted-foreground" />
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
                            <AudioWaveform className="w-4 h-4" />
                            {test.parts} parts
                          </div>
                          <div className="flex items-center gap-1">
                            <Sparkles className="w-4 h-4" />
                            AI Feedback
                          </div>
                        </div>

                        <Link href={`/dashboard/speaking/test/${test.id}`}>
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

            {/* Recent Sessions */}
            <motion.div variants={itemVariants}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-foreground">
                  Recent Sessions
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
                    {recentSessions.map((session) => (
                      <div
                        key={session.id}
                        className="p-4 hover:bg-secondary/50 transition-colors"
                      >
                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                          <div className="flex items-start gap-4">
                            <div
                              className={`w-12 h-12 rounded-lg flex items-center justify-center shrink-0 ${
                                session.bandScore >= 7
                                  ? "bg-emerald-100 dark:bg-emerald-950/30"
                                  : session.bandScore >= 6
                                    ? "bg-amber-100 dark:bg-amber-950/30"
                                    : "bg-red-100 dark:bg-red-950/30"
                              }`}
                            >
                              <span
                                className={`text-lg font-semibold ${
                                  session.bandScore >= 7
                                    ? "text-emerald-600"
                                    : session.bandScore >= 6
                                      ? "text-amber-600"
                                      : "text-red-600"
                                }`}
                              >
                                {session.bandScore}
                              </span>
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <h4 className="font-medium text-foreground">
                                  {session.title}
                                </h4>
                                <Badge
                                  variant="outline"
                                  className="text-[10px]"
                                >
                                  <Disc2 className="w-3 h-3 mr-1" />
                                  Recorded
                                </Badge>
                              </div>
                              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                                <span>{session.date}</span>
                                <span>•</span>
                                <span>{session.duration}</span>
                              </div>
                            </div>
                          </div>

                          {/* Part Scores */}
                          <div className="flex items-center gap-6">
                            <div className="flex items-center gap-3">
                              {session.part1Score && (
                                <div className="text-center">
                                  <p className="text-[10px] text-muted-foreground mb-1">
                                    Part 1
                                  </p>
                                  <div className="w-8 h-8 rounded bg-secondary flex items-center justify-center">
                                    <span className="text-xs font-medium">
                                      {session.part1Score}
                                    </span>
                                  </div>
                                </div>
                              )}
                              {session.part2Score && (
                                <div className="text-center">
                                  <p className="text-[10px] text-muted-foreground mb-1">
                                    Part 2
                                  </p>
                                  <div className="w-8 h-8 rounded bg-secondary flex items-center justify-center">
                                    <span className="text-xs font-medium">
                                      {session.part2Score}
                                    </span>
                                  </div>
                                </div>
                              )}
                              {session.part3Score && (
                                <div className="text-center">
                                  <p className="text-[10px] text-muted-foreground mb-1">
                                    Part 3
                                  </p>
                                  <div className="w-8 h-8 rounded bg-secondary flex items-center justify-center">
                                    <span className="text-xs font-medium">
                                      {session.part3Score}
                                    </span>
                                  </div>
                                </div>
                              )}
                            </div>

                            {/* Criteria mini scores */}
                            <div className="hidden xl:flex items-center gap-2">
                              <div className="text-center px-2">
                                <p className="text-[10px] text-muted-foreground">
                                  Fluency
                                </p>
                                <p className="text-xs font-medium">
                                  {session.fluency}%
                                </p>
                              </div>
                              <div className="text-center px-2">
                                <p className="text-[10px] text-muted-foreground">
                                  Vocab
                                </p>
                                <p className="text-xs font-medium">
                                  {session.vocabulary}%
                                </p>
                              </div>
                              <div className="text-center px-2">
                                <p className="text-[10px] text-muted-foreground">
                                  Grammar
                                </p>
                                <p className="text-xs font-medium">
                                  {session.grammar}%
                                </p>
                              </div>
                              <div className="text-center px-2">
                                <p className="text-[10px] text-muted-foreground">
                                  Pronun.
                                </p>
                                <p className="text-xs font-medium">
                                  {session.pronunciation}%
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

            {/* Tips & AI Features */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Speaking Tips */}
              <motion.div variants={itemVariants}>
                <Card className="border-border/50 bg-linear-to-br from-purple-50 to-purple-100/50 dark:from-purple-950/20 dark:to-purple-900/10 h-full">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-purple-200 dark:bg-purple-800/30 flex items-center justify-center">
                        <Lightbulb className="w-5 h-5 text-purple-700 dark:text-purple-400" />
                      </div>
                      <h3 className="font-semibold text-foreground">
                        Speaking Tips
                      </h3>
                    </div>
                    <ul className="space-y-3">
                      {[
                        "Speak clearly and at a natural pace",
                        "Extend your answers with examples",
                        "Don't memorize scripts - be natural",
                        "Use a variety of vocabulary and expressions",
                        "Practice with a timer regularly",
                      ].map((tip, index) => (
                        <li
                          key={index}
                          className="flex items-start gap-2 text-sm text-foreground"
                        >
                          <CheckCircle2 className="w-4 h-4 text-purple-600 dark:text-purple-400 shrink-0 mt-0.5" />
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>

              {/* AI Features */}
              <motion.div variants={itemVariants}>
                <Card className="border-border/50 h-full">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center">
                        <Sparkles className="w-5 h-5 text-accent" />
                      </div>
                      <h3 className="font-semibold text-foreground">
                        AI-Powered Features
                      </h3>
                    </div>
                    <div className="space-y-3">
                      {[
                        {
                          icon: Gauge,
                          text: "Real-time band score estimation",
                        },
                        {
                          icon: Podcast,
                          text: "Pronunciation analysis & feedback",
                        },
                        { icon: Brain, text: "Vocabulary suggestions" },
                        {
                          icon: MessageSquare,
                          text: "Grammar correction tips",
                        },
                        { icon: Disc2, text: "Session recording for review" },
                      ].map((feature, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-3 p-2 rounded-lg bg-secondary/50"
                        >
                          <feature.icon className="w-4 h-4 text-accent" />
                          <span className="text-sm text-foreground">
                            {feature.text}
                          </span>
                        </div>
                      ))}
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
