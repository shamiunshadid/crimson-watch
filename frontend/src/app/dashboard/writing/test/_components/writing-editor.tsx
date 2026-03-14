"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import {
  Type,
  CheckCircle2,
  AlertCircle,
  Undo2,
  Redo2,
  Copy,
  Trash2,
  Minimize2,
  Maximize2,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface WritingEditorProps {
  task: 1 | 2;
  content: string;
  onChange: (content: string) => void;
}

export function WritingEditor({ task, content, onChange }: WritingEditorProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const minWords = task === 1 ? 150 : 250;
  const suggestedWords = task === 1 ? 170 : 280;

  // Count words
  const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0;

  // Count characters
  const charCount = content.length;

  // Count paragraphs
  const paragraphCount = content.trim()
    ? content.trim().split(/\n\n+/).length
    : 0;

  // Count sentences (rough estimate)
  const sentenceCount = content.trim()
    ? content
        .trim()
        .split(/[.!?]+/)
        .filter((s) => s.trim()).length
    : 0;

  const wordProgress = Math.min((wordCount / suggestedWords) * 100, 100);
  const isWordCountMet = wordCount >= minWords;
  const showWordWarning = wordCount > 0 && wordCount < minWords;

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
  };

  const handleClear = () => {
    if (confirm("Are you sure you want to clear all content?")) {
      onChange("");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "h-full flex flex-col bg-card",
        isFullscreen && "fixed inset-0 z-50 p-4",
      )}
    >
      {/* Toolbar */}
      <div className="p-3 border-b border-border/50 flex items-center justify-between">
        <div className="flex items-center gap-1">
          <div className="flex items-center gap-1 ml-2">
            <Button variant="ghost" size="icon" className="w-8 h-8">
              <Undo2 className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon" className="w-8 h-8">
              <Redo2 className="w-4 h-4" />
            </Button>
          </div>

          <div className="h-6 w-px bg-border hidden sm:block mx-2" />

          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="w-8 h-8"
              onClick={handleCopy}
            >
              <Copy className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="w-8 h-8 text-destructive hover:text-destructive"
              onClick={handleClear}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsFullscreen(!isFullscreen)}
          className="w-8 h-8"
        >
          {isFullscreen ? (
            <Minimize2 className="w-4 h-4" />
          ) : (
            <Maximize2 className="w-4 h-4" />
          )}
        </Button>
      </div>

      {/* Editor Area */}
      <div className="flex-1 p-4">
        <Textarea
          value={content}
          onChange={(e) => onChange(e.target.value)}
          placeholder={`Start writing your Task ${task} response here...

${
  task === 1
    ? "Remember to describe the visual information and make comparisons."
    : "Remember to plan your essay structure before writing."
}`}
          className="w-full h-full min-h-[300px] resize-none border-0 focus-visible:ring-0 text-base leading-relaxed p-2 bg-transparent"
        />
      </div>

      {/* Status Bar */}
      <div className="p-3 border-t border-border/50">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          {/* Word Count Progress */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Type
                className={cn(
                  "w-4 h-4",
                  isWordCountMet ? "text-emerald-500" : "text-muted-foreground",
                )}
              />
              <span
                className={cn(
                  "font-medium",
                  isWordCountMet
                    ? "text-emerald-600 dark:text-emerald-400"
                    : "text-foreground",
                )}
              >
                {wordCount}
              </span>
              <span className="text-muted-foreground text-sm">
                / {minWords} min words
              </span>
              {isWordCountMet && (
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              )}
            </div>

            {/* Word Progress Bar */}
            <div className="hidden sm:block w-32">
              <Progress
                value={wordProgress}
                className={cn(
                  "h-2",
                  isWordCountMet
                    ? "[&>div]:bg-emerald-500"
                    : "[&>div]:bg-primary",
                )}
              />
            </div>
          </div>

          {/* Additional Stats */}
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span>{charCount} characters</span>
            <span>{paragraphCount} paragraphs</span>
            <span>{sentenceCount} sentences</span>
          </div>
        </div>

        {/* Warning Message */}
        {showWordWarning && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-2 flex items-center gap-2 text-xs text-amber-600 dark:text-amber-400"
          >
            <AlertCircle className="w-3 h-3" />
            <span>
              Write at least {minWords} words. Current: {wordCount} words.
            </span>
          </motion.div>
        )}

        {/* Success Message */}
        {isWordCountMet && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-2 flex items-center gap-2 text-xs text-emerald-600 dark:text-emerald-400"
          >
            <CheckCircle2 className="w-3 h-3" />
            <span>Minimum word count met! ({wordCount} words)</span>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
