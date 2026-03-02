"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  CheckCircle2,
  Flag,
  ChevronDown,
  ChevronUp,
  Send,
  HelpCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface AnswerPanelProps {
  section: number;
}

interface Question {
  id: number;
  type: "multiple-choice" | "true-false-not-given" | "fill-blank" | "matching";
  question: string;
  options?: string[];
  answer?: string;
}

interface Answer {
  questionId: number;
  value: string;
  isFlagged: boolean;
}

const questionsData: Record<number, Question[]> = {
  1: [
    {
      id: 1,
      type: "multiple-choice",
      question: "What percentage of marine species depend on coral reefs?",
      options: ["A. Less than 1%", "B. Approximately 25%", "C. About 50%", "D. Nearly 75%"],
    },
    {
      id: 2,
      type: "true-false-not-given",
      question: "Zooxanthellae provide corals with up to 90% of their energy.",
    },
    {
      id: 3,
      type: "fill-blank",
      question: "By 2100, ocean acidity could increase by ______ compared to pre-industrial levels.",
    },
    {
      id: 4,
      type: "true-false-not-given",
      question: "The Great Barrier Reef has lost more than half its coral cover since 1995.",
    },
    {
      id: 5,
      type: "multiple-choice",
      question: "Which of the following is NOT mentioned as a conservation effort?",
      options: [
        "A. Marine protected areas",
        "B. Coral nurseries",
        "C. Artificial reef construction",
        "D. Heat-resistant coral development",
      ],
    },
    {
      id: 6,
      type: "fill-blank",
      question: "The economic value of coral reef ecosystem services is estimated at ______ annually.",
    },
    {
      id: 7,
      type: "true-false-not-given",
      question: "Red Sea coral reefs are more resistant to heat stress than other reefs.",
    },
    {
      id: 8,
      type: "multiple-choice",
      question: "What causes coral bleaching?",
      options: [
        "A. Ocean acidification",
        "B. Rising ocean temperatures",
        "C. Overfishing",
        "D. Pollution",
      ],
    },
    {
      id: 9,
      type: "fill-blank",
      question: "Coral polyps secrete ______ to form hard, protective skeletons.",
    },
    {
      id: 10,
      type: "true-false-not-given",
      question: "Ocean acidification helps corals build stronger skeletons.",
    },
    {
      id: 11,
      type: "multiple-choice",
      question: "How many people worldwide depend on coral reefs?",
      options: [
        "A. 100 million",
        "B. 250 million",
        "C. 500 million",
        "D. 1 billion",
      ],
    },
    {
      id: 12,
      type: "fill-blank",
      question: "Coral reefs cover less than ______ of the ocean floor.",
    },
    {
      id: 13,
      type: "true-false-not-given",
      question: "All coral species are equally vulnerable to warming waters.",
    },
  ],
  2: [
    {
      id: 14,
      type: "multiple-choice",
      question: "According to rational choice theory, individuals should:",
      options: ["A. Follow their emotions", "B. Choose randomly", "C. Maximize utility", "D. Minimize effort"],
    },
    {
      id: 15,
      type: "true-false-not-given",
      question: "The framing effect only influences uneducated people.",
    },
    {
      id: 16,
      type: "fill-blank",
      question: "Prospect theory was developed by Kahneman and ______.",
    },
    {
      id: 17,
      type: "multiple-choice",
      question: "What did Damasio's research reveal about emotions?",
      options: [
        "A. Emotions always lead to bad decisions",
        "B. Emotions are unnecessary for decisions",
        "C. Emotions help in decision-making",
        "D. Emotions only affect minor choices",
      ],
    },
    {
      id: 18,
      type: "true-false-not-given",
      question: "Decision fatigue improves decision quality.",
    },
    {
      id: 19,
      type: "fill-blank",
      question: "Sleep deprivation impairs judgment by reducing activity in the ______ brain regions.",
    },
    {
      id: 20,
      type: "multiple-choice",
      question: "What percentage of decisions does the average person make daily?",
      options: [
        "A. Hundreds",
        "B. Thousands",
        "C. Millions",
        "D. The passage doesn't say",
      ],
    },
  ],
  3: [
    {
      id: 21,
      type: "multiple-choice",
      question: "What percentage of Earth's land surface does traditional agriculture use?",
      options: ["A. 28%", "B. 38%", "C. 48%", "D. 58%"],
    },
    {
      id: 22,
      type: "fill-blank",
      question: "Vertical farming was popularized by professor ______ in 1999.",
    },
    {
      id: 23,
      type: "true-false-not-given",
      question: "Vertical farms can grow wheat and rice efficiently.",
    },
    {
      id: 24,
      type: "multiple-choice",
      question: "How much less water do hydroponic systems use?",
      options: [
        "A. Up to 50%",
        "B. Up to 75%",
        "C. Up to 90%",
        "D. Up to 95%",
      ],
    },
    {
      id: 25,
      type: "true-false-not-given",
      question: "Singapore imports most of its food.",
    },
    {
      id: 26,
      type: "fill-blank",
      question: "LED lights provide precisely tuned ______ for photosynthesis.",
    },
    {
      id: 27,
      type: "multiple-choice",
      question: "Which is NOT a challenge of vertical farming?",
      options: [
        "A. High energy costs",
        "B. Limited crop varieties",
        "C. Water scarcity",
        "D. High initial investment",
      ],
    },
  ],
};

export function AnswerPanel({ section }: AnswerPanelProps) {
  const questions = questionsData[section] || questionsData[1];
  const [answers, setAnswers] = useState<Record<number, Answer>>({});
  const [expandedQuestion, setExpandedQuestion] = useState<number | null>(1);

  const handleAnswer = (questionId: number, value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: {
        questionId,
        value,
        isFlagged: prev[questionId]?.isFlagged || false,
      },
    }));
  };

  const toggleFlag = (questionId: number) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: {
        questionId,
        value: prev[questionId]?.value || "",
        isFlagged: !prev[questionId]?.isFlagged,
      },
    }));
  };

  const answeredCount = Object.values(answers).filter((a) => a.value).length;
  const flaggedCount = Object.values(answers).filter((a) => a.isFlagged).length;

  const renderQuestion = (question: Question) => {
    const isAnswered = answers[question.id]?.value;
    const isFlagged = answers[question.id]?.isFlagged;
    const isExpanded = expandedQuestion === question.id;

    return (
      <motion.div
        key={question.id}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-3"
      >
        <Card
          className={cn(
            "border transition-all cursor-pointer",
            isFlagged ? "border-amber-500 bg-amber-50/50 dark:bg-amber-950/20" : "border-border/50",
            isAnswered && !isFlagged ? "border-emerald-500/50" : ""
          )}
          onClick={() => setExpandedQuestion(isExpanded ? null : question.id)}
        >
          <CardHeader className="p-4">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <div
                  className={cn(
                    "w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-sm font-medium",
                    isAnswered
                      ? "bg-emerald-500 text-white"
                      : "bg-secondary text-muted-foreground"
                  )}
                >
                  {isAnswered ? (
                    <CheckCircle2 className="w-4 h-4" />
                  ) : (
                    question.id
                  )}
                </div>
                <div>
                  <Badge variant="outline" className="text-xs mb-2">
                    {question.type.replace("-", " ").toUpperCase()}
                  </Badge>
                  <CardTitle className="text-sm font-medium leading-snug">
                    {question.question}
                  </CardTitle>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn("w-8 h-8", isFlagged && "text-amber-500")}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFlag(question.id);
                  }}
                >
                  <Flag className="w-4 h-4" />
                </Button>
                {isExpanded ? (
                  <ChevronUp className="w-4 h-4 text-muted-foreground" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-muted-foreground" />
                )}
              </div>
            </div>
          </CardHeader>

          {isExpanded && (
            <CardContent className="pt-0 pb-4 px-4">
              <Separator className="mb-4" />

              {question.type === "multiple-choice" && question.options && (
                <RadioGroup
                  value={answers[question.id]?.value || ""}
                  onValueChange={(value) => handleAnswer(question.id, value)}
                  onClick={(e) => e.stopPropagation()}
                >
                  {question.options.map((option, idx) => (
                    <div
                      key={idx}
                      className="flex items-center space-x-2 p-2 rounded-lg hover:bg-secondary/50 transition-colors"
                    >
                      <RadioGroupItem value={option} id={`q${question.id}-${idx}`} />
                      <Label
                        htmlFor={`q${question.id}-${idx}`}
                        className="text-sm cursor-pointer flex-1"
                      >
                        {option}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              )}

              {question.type === "true-false-not-given" && (
                <RadioGroup
                  value={answers[question.id]?.value || ""}
                  onValueChange={(value) => handleAnswer(question.id, value)}
                  onClick={(e) => e.stopPropagation()}
                  className="flex gap-4"
                >
                  {["True", "False", "Not Given"].map((option) => (
                    <div
                      key={option}
                      className="flex items-center space-x-2 p-2 px-4 rounded-lg hover:bg-secondary/50 transition-colors border border-border/50"
                    >
                      <RadioGroupItem value={option} id={`q${question.id}-${option}`} />
                      <Label
                        htmlFor={`q${question.id}-${option}`}
                        className="text-sm cursor-pointer"
                      >
                        {option}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              )}

              {question.type === "fill-blank" && (
                <div onClick={(e) => e.stopPropagation()}>
                  <Input
                    placeholder="Type your answer..."
                    value={answers[question.id]?.value || ""}
                    onChange={(e) => handleAnswer(question.id, e.target.value)}
                    className="h-10"
                  />
                  <p className="text-xs text-muted-foreground mt-2">
                    Enter the exact word(s) from the passage
                  </p>
                </div>
              )}
            </CardContent>
          )}
        </Card>
      </motion.div>
    );
  };

  return (
    <div className="h-full flex flex-col bg-card">
      {/* Answer Sheet Header */}
      <div className="p-4 border-b border-border/50">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="font-semibold text-foreground">Answer Sheet</h3>
            <p className="text-xs text-muted-foreground">
              Section {section} • {questions.length} questions
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="text-xs">
              {answeredCount}/{questions.length} answered
            </Badge>
            {flaggedCount > 0 && (
              <Badge variant="outline" className="text-xs text-amber-600 border-amber-500">
                <Flag className="w-3 h-3 mr-1" />
                {flaggedCount}
              </Badge>
            )}
          </div>
        </div>

        {/* Progress bar */}
        <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-emerald-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${(answeredCount / questions.length) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Questions List */}
      <ScrollArea className="flex-1 p-4 h-full">
        {questions.map(renderQuestion)}
      </ScrollArea>

      {/* Submit Footer */}
      <div className="p-4 border-t border-border/50 space-y-3">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{questions.length - answeredCount} questions remaining</span>
          <Button variant="ghost" size="sm" className="h-7 text-xs">
            <HelpCircle className="w-3 h-3 mr-1" />
            How to answer
          </Button>
        </div>
        <Button className="w-full" size="lg">
          <Send className="w-4 h-4 mr-2" />
          Submit Section {section}
        </Button>
      </div>
    </div>
  );
}