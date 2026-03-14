"use client";

import { motion } from "motion/react";
import { Card, CardContent, } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  FileChartColumn,
  PenTool,
  ChevronDown,
  ChevronUp,
  Clock,
  Target,
  Maximize2,
  Minimize2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface TaskInstructionProps {
  task: 1 | 2;
}

const taskData = {
  1: {
    title: "Task 1 - Report Writing",
    type: "Report",
    timeLimit: "20 minutes",
    minWords: 150,
    instruction: "The chart below shows the percentage of households in owned and rented accommodation in England and Wales between 1918 and 2011.\n\nSummarise the information by selecting and reporting the main features, and make comparisons where relevant.",
    tips: [
      "Write at least 150 words",
      "Spend about 20 minutes on this task",
      "Describe the main trends and features",
      "Make comparisons where relevant",
      "Do NOT give opinions",
    ],
    chartData: {
      type: "line-chart",
      title: "Household Tenure in England and Wales (1918-2011)",
      description: "Percentage of households in owned and rented accommodation",
    },
  },
  2: {
    title: "Task 2 - Essay Writing",
    type: "Essay",
    timeLimit: "40 minutes",
    minWords: 250,
    instruction: "Some people believe that universities should focus on providing academic skills rather than preparing students for employment.\n\nTo what extent do you agree or disagree with this statement?\n\nGive reasons for your answer and include any relevant examples from your own knowledge or experience.",
    tips: [
      "Write at least 250 words",
      "Spend about 40 minutes on this task",
      "Give reasons and examples",
      "Support your arguments",
      "Use a clear paragraph structure",
    ],
  },
};

export function TaskInstruction({ task }: TaskInstructionProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const data = taskData[task];

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "h-full flex flex-col bg-card",
        isFullscreen && "fixed inset-0 z-50 p-4"
      )}
    >
      {/* Header */}
      <div className="p-4 border-b border-border/50 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={cn(
            "w-10 h-10 rounded-lg flex items-center justify-center",
            task === 1 
              ? "bg-blue-100 dark:bg-blue-950/30" 
              : "bg-purple-100 dark:bg-purple-950/30"
          )}>
            {task === 1 ? (
              <FileChartColumn className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            ) : (
              <PenTool className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            )}
          </div>
          <div>
            <h2 className="font-semibold text-foreground">{data.title}</h2>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Badge variant="secondary" className="text-[10px]">
                {data.type}
              </Badge>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {data.timeLimit}
              </span>
              <span className="flex items-center gap-1">
                <Target className="w-3 h-3" />
                {data.minWords}+ words
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1">
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
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-8 h-8"
          >
            {isExpanded ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </Button>
        </div>
      </div>

      {isExpanded && (
        <ScrollArea className="flex-1 h-full">
          <div className="p-4 space-y-4">
            {/* Instruction */}
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">
                Question
              </h3>
              <Card className="bg-secondary/50">
                <CardContent className="p-4">
                  <p className="text-foreground leading-relaxed whitespace-pre-line">
                    {data.instruction}
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Chart/Data for Task 1 */}
            {task === 1 && (
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-2">
                  Visual Information
                </h3>
                <Card className="border-dashed">
                  <CardContent className="p-4">
                    <div className="aspect-video bg-secondary/50 rounded-lg flex flex-col items-center justify-center">
                      <FileChartColumn className="w-12 h-12 text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground text-center">
                        {/* {data.chartData?.title} */}
                      </p>
                      <p className="text-xs text-muted-foreground text-center mt-1">
                        {/* {data.chartData?.description} */}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Tips */}
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">
                Tips
              </h3>
              <ul className="space-y-2">
                {data.tips.map((tip, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-2 text-sm text-foreground"
                  >
                    <span className="w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center shrink-0 text-xs text-accent font-medium">
                      {index + 1}
                    </span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </ScrollArea>
      )}
    </motion.div>
  );
}