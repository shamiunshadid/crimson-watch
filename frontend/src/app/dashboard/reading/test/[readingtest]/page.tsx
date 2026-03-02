"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { useParams } from "next/navigation";
import {ResizableHandle, ResizablePanel, ResizablePanelGroup} from "@/components/ui/resizable"
import { cn } from "@/lib/utils";
import { TestHeader } from "../_components/test-header";
import { PassagePanel } from "../_components/passage-pannel";
import { AnswerPanel } from "../_components/answer-pannel";
import { QuestionNav } from "../_components/question-nav";

interface Answer {
  questionId: number;
  value: string;
  isFlagged: boolean;
}

export default function ReadingTestTakingPage() {
  const params = useParams();
  const testId = params.testId as string;

  const [currentSection, setCurrentSection] = useState(1);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [answers, setAnswers] = useState<Record<number, Answer>>({});
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSectionChange = (section: number) => {
    setCurrentSection(section);
    setCurrentQuestion((section - 1) * 13 + 1);
  };

  const handleQuestionClick = (question: number) => {
    setCurrentQuestion(question);
  };

  return (
    <div className="h-screen flex flex-col bg-background overflow-hidden">
      {/* Test Header */}
      <TestHeader
        currentSection={currentSection}
        totalSections={3}
        onMenuClick={() => setIsMenuOpen(!isMenuOpen)}
        onSectionChange={handleSectionChange}
      />

      {/* Main Content - Resizable Panels */}
      <div className="flex-1 overflow-hidden">
        <ResizablePanelGroup orientation="horizontal" className="h-full">
          {/* Left Panel - Passage */}
          <ResizablePanel defaultSize={55} minSize={35} className="h-full">
            <PassagePanel section={currentSection} />
          </ResizablePanel>

          {/* Resize Handle */}
          <ResizableHandle
            className={cn(
              "w-1 bg-border/50 hover:bg-primary/50 transition-colors relative group",
              "after:absolute after:inset-y-0 after:-left-1 after:-right-1 after:bg-transparent",
            )}
            withHandle
          >
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-12 bg-border rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              whileHover={{ scaleY: 1.2 }}
            />
          </ResizableHandle>

          {/* Right Panel - Answer Sheet */}
          <ResizablePanel defaultSize={45} minSize={30} className="h-full">
            <AnswerPanel section={currentSection} />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>

      {/* Question Navigation */}
      <QuestionNav
        section={currentSection}
        totalQuestions={13}
        answers={answers}
        currentQuestion={currentQuestion}
        onQuestionClick={handleQuestionClick}
      />

      {/* Menu Overlay */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
          onClick={() => setIsMenuOpen(false)}
        >
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            className="absolute left-0 top-0 bottom-0 w-80 bg-card border-r border-border p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-lg font-semibold">Test Menu</h2>
                <p className="text-sm text-muted-foreground">
                  Test ID: {testId}
                </p>
              </div>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="text-muted-foreground hover:text-foreground"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              {/* Test Progress */}
              <div className="p-4 bg-secondary rounded-lg">
                <h3 className="text-sm font-medium mb-2">Test Progress</h3>
                <div className="grid grid-cols-3 gap-2 text-center text-sm">
                  <div className="p-2 bg-background rounded">
                    <div className="font-semibold text-lg">3</div>
                    <div className="text-xs text-muted-foreground">
                      Sections
                    </div>
                  </div>
                  <div className="p-2 bg-background rounded">
                    <div className="font-semibold text-lg">40</div>
                    <div className="text-xs text-muted-foreground">
                      Questions
                    </div>
                  </div>
                  <div className="p-2 bg-background rounded">
                    <div className="font-semibold text-lg">60</div>
                    <div className="text-xs text-muted-foreground">Minutes</div>
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-muted-foreground">
                  Jump to Section
                </h3>
                {[1, 2, 3].map((section) => (
                  <button
                    key={section}
                    onClick={() => {
                      handleSectionChange(section);
                      setIsMenuOpen(false);
                    }}
                    className={`w-full p-3 rounded-lg text-left transition-colors ${
                      currentSection === section
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary hover:bg-secondary/80"
                    }`}
                  >
                    Section {section}
                  </button>
                ))}
              </div>

              {/* Actions */}
              <div className="pt-4 border-t border-border space-y-2">
                <button className="w-full p-3 rounded-lg bg-secondary hover:bg-secondary/80 text-left transition-colors">
                  Pause Test
                </button>
                <button className="w-full p-3 rounded-lg bg-secondary hover:bg-secondary/80 text-left transition-colors">
                  View Instructions
                </button>
                <button className="w-full p-3 rounded-lg bg-destructive/10 text-destructive hover:bg-destructive/20 text-left transition-colors">
                  Exit Test
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
