"use client";

import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import {Flag, } from "lucide-react";

interface QuestionNavProps {
  section: number;
  totalQuestions: number;
  answers: Record<number, { value: string; isFlagged: boolean }>;
  currentQuestion: number;
  onQuestionClick: (question: number) => void;
}

export function QuestionNav({
  section,
  totalQuestions,
  answers,
  currentQuestion,
  onQuestionClick,
}: QuestionNavProps) {
  // Calculate question range for current section
  const sectionStart = (section - 1) * 13 + 1;
  const questionNumbers = Array.from(
    { length: Math.min(totalQuestions, 13) },
    (_, i) => sectionStart + i
  );

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-card border-t border-border/50 p-4"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium text-foreground">
            Question Navigator
          </span>
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-emerald-500" />
              <span>Answered</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-amber-500" />
              <span>Flagged</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full border border-border" />
              <span>Unanswered</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            Previous
          </Button>
          <Button variant="outline" size="sm">
            Next
          </Button>
        </div>
      </div>

      <ScrollArea className="w-full whitespace-nowrap">
        <div className="flex gap-2 p-1">
          {questionNumbers.map((num) => {
            const answer = answers[num];
            const isAnswered = answer?.value;
            const isFlagged = answer?.isFlagged;

            return (
              <Button
                key={num}
                variant="outline"
                size="sm"
                onClick={() => onQuestionClick(num)}
                className={cn(
                  "w-9 h-9 p-0 shrink-0 relative transition-all hover:text-white",
                  currentQuestion === num && "ring-2 ring-primary",
                  isAnswered && !isFlagged && "bg-emerald-500 border-emerald-500 text-white hover:bg-emerald-600 hover:border-emerald-600",
                  isFlagged && "bg-amber-500 border-amber-500 text-white hover:bg-amber-600 hover:border-amber-600"
                )}
              >
                {num}
                {isFlagged && (
                  <Flag className="absolute -top-1 -right-1 w-3 h-3 text-amber-500 fill-amber-500" />
                )}
              </Button>
            );
          })}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </motion.div>
  );
}
