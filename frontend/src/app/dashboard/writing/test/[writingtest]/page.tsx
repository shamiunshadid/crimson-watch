"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { motion,  } from "motion/react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertCircle,
  CheckCircle2,
  Send,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { WritingHeader } from "../_components/writing-header";
import { TaskInstruction } from "../_components/test-instruction";
import { WritingEditor } from "../_components/writing-editor";

export default function WritingTestPage() {
  const params = useParams();
  const testId = params.writingtest as string;

  const [currentTask, setCurrentTask] = useState<1 | 2>(1);
  const [task1Content, setTask1Content] = useState("");
  const [task2Content, setTask2Content] = useState("");
  const [showSubmitDialog, setShowSubmitDialog] = useState(false);
//   const [showExitDialog, setShowExitDialog] = useState(false);

  const task1Words = task1Content.trim() 
    ? task1Content.trim().split(/\s+/).length 
    : 0;
  const task2Words = task2Content.trim() 
    ? task2Content.trim().split(/\s+/).length 
    : 0;

  const task1Completed = task1Words >= 150;
  const task2Completed = task2Words >= 250;

  const canSubmit = task1Completed && task2Completed;

  const handleSubmit = () => {
    setShowSubmitDialog(true);
  };

  const confirmSubmit = () => {
    // Handle submission logic here
    console.log("Submitting test...", {
      testId,
      task1: task1Content,
      task2: task2Content,
    });
    setShowSubmitDialog(false);
  };

  const handleNextTask = () => {
    if (currentTask === 1) {
      setCurrentTask(2);
    }
  };

  const handlePrevTask = () => {
    if (currentTask === 2) {
      setCurrentTask(1);
    }
  };

  const currentContent = currentTask === 1 ? task1Content : task2Content;
  const setCurrentContent = currentTask === 1 ? setTask1Content : setTask2Content;

  return (
    <div className="h-screen flex flex-col bg-background overflow-hidden">
      {/* Header */}
      <WritingHeader
        testId={testId}
        currentTask={currentTask}
        onTaskChange={setCurrentTask}
        task1Progress={{ words: task1Words, completed: task1Completed }}
        task2Progress={{ words: task2Words, completed: task2Completed }}
        onSubmit={handleSubmit}
      />

      {/* Main Content - Resizable Panels */}
      <div className="flex-1 overflow-hidden">
        <ResizablePanelGroup orientation="horizontal" className="h-full">
          {/* Left Panel - Task Instructions */}
          <ResizablePanel defaultSize={300} minSize={200} maxSize={900} className="h-full">
            <TaskInstruction task={currentTask} />
          </ResizablePanel>

          {/* Resize Handle */}
          <ResizableHandle 
            className={cn(
              "w-1 bg-border/50 hover:bg-primary/50 transition-colors relative group",
              "after:absolute after:inset-y-0 after:-left-1 after:-right-1 after:bg-transparent"
            )}
          >
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-12 bg-border rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              whileHover={{ scaleY: 1.2 }}
            />
          </ResizableHandle >

          {/* Right Panel - Writing Editor */}
          <ResizablePanel defaultSize={60} minSize={40} className="h-full">
            <WritingEditor
              task={currentTask}
              content={currentContent}
              onChange={setCurrentContent}
            />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>

      {/* Bottom Navigation Bar */}
      <div className="border-t border-border/50 bg-card p-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Task Progress Indicator */}
            <div className="flex items-center gap-2">
              <div
                className={cn(
                  "flex items-center gap-2 px-3 py-1.5 rounded-lg transition-colors",
                  currentTask === 1
                    ? "bg-primary/10 text-primary"
                    : task1Completed
                    ? "bg-emerald-100 dark:bg-emerald-950/30 text-emerald-600"
                    : "bg-secondary text-muted-foreground"
                )}
              >
                {task1Completed ? (
                  <CheckCircle2 className="w-4 h-4" />
                ) : (
                  <span className="text-sm font-medium">1</span>
                )}
                <span className="text-sm hidden sm:inline">Task 1</span>
                <span className="text-xs opacity-70">({task1Words} words)</span>
              </div>

              <ArrowRight className="w-4 h-4 text-muted-foreground" />

              <div
                className={cn(
                  "flex items-center gap-2 px-3 py-1.5 rounded-lg transition-colors",
                  currentTask === 2
                    ? "bg-primary/10 text-primary"
                    : task2Completed
                    ? "bg-emerald-100 dark:bg-emerald-950/30 text-emerald-600"
                    : "bg-secondary text-muted-foreground"
                )}
              >
                {task2Completed ? (
                  <CheckCircle2 className="w-4 h-4" />
                ) : (
                  <span className="text-sm font-medium">2</span>
                )}
                <span className="text-sm hidden sm:inline">Task 2</span>
                <span className="text-xs opacity-70">({task2Words} words)</span>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center gap-3">
            {currentTask === 1 && !task1Completed && task1Words > 0 && (
              <div className="hidden sm:flex items-center gap-2 text-xs text-amber-600 dark:text-amber-400">
                <AlertCircle className="w-3 h-3" />
                <span>Minimum 150 words required</span>
              </div>
            )}
            
            {currentTask === 2 && !task2Completed && task2Words > 0 && (
              <div className="hidden sm:flex items-center gap-2 text-xs text-amber-600 dark:text-amber-400">
                <AlertCircle className="w-3 h-3" />
                <span>Minimum 250 words required</span>
              </div>
            )}

            {currentTask === 1 && (
              <Button onClick={handleNextTask} className="gap-2">
                Continue to Task 2
                <ArrowRight className="w-4 h-4" />
              </Button>
            )}

            {currentTask === 2 && (
              <div className="flex items-center gap-2">
                <Button variant="outline" onClick={handlePrevTask} className="gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  Back to Task 1
                </Button>
                <Button
                  onClick={() => setShowSubmitDialog(true)}
                  disabled={!canSubmit}
                  className="gap-2"
                >
                  <Send className="w-4 h-4" />
                  Submit Test
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Submit Confirmation Dialog */}
      <Dialog open={showSubmitDialog} onOpenChange={setShowSubmitDialog}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Send className="w-5 h-5 text-primary" />
              Submit Writing Test
            </DialogTitle>
            <DialogDescription>
              Please review your answers before submitting.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {/* Task 1 Summary */}
            <Card className={cn(
              "border",
              task1Completed ? "border-emerald-500/50" : "border-amber-500/50"
            )}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">Task 1</span>
                  {task1Completed ? (
                    <div className="flex items-center gap-1 text-emerald-600 text-sm">
                      <CheckCircle2 className="w-4 h-4" />
                      Complete
                    </div>
                  ) : (
                    <div className="flex items-center gap-1 text-amber-600 text-sm">
                      <AlertCircle className="w-4 h-4" />
                      Below minimum
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>{task1Words} words</span>
                  <span>{task1Content.length} characters</span>
                </div>
              </CardContent>
            </Card>

            {/* Task 2 Summary */}
            <Card className={cn(
              "border",
              task2Completed ? "border-emerald-500/50" : "border-amber-500/50"
            )}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">Task 2</span>
                  {task2Completed ? (
                    <div className="flex items-center gap-1 text-emerald-600 text-sm">
                      <CheckCircle2 className="w-4 h-4" />
                      Complete
                    </div>
                  ) : (
                    <div className="flex items-center gap-1 text-amber-600 text-sm">
                      <AlertCircle className="w-4 h-4" />
                      Below minimum
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>{task2Words} words</span>
                  <span>{task2Content.length} characters</span>
                </div>
              </CardContent>
            </Card>

            {/* Warning */}
            {!canSubmit && (
              <div className="flex items-start gap-2 p-3 rounded-lg bg-amber-100 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400">
                <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                <p className="text-sm">
                  Please ensure both tasks meet the minimum word count requirements before submitting.
                </p>
              </div>
            )}
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              variant="outline"
              onClick={() => setShowSubmitDialog(false)}
            >
              Continue Editing
            </Button>
            <Button
              onClick={confirmSubmit}
              disabled={!canSubmit}
              className="gap-2"
            >
              <Send className="w-4 h-4" />
              Submit Test
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}