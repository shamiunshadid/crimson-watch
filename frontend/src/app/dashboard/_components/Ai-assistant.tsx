"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Bot,
  X,
  Send,
  Minimize2,
  Maximize2,
  Sparkles,
  Lightbulb,
  BookOpen,
  HelpCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const quickActions = [
  { icon: Lightbulb, label: "Tips for Reading", action: "Give me tips for IELTS Reading" },
  { icon: BookOpen, label: "Writing Task 2", action: "Explain Writing Task 2 structure" },
  { icon: HelpCircle, label: "Band Score", action: "How is band score calculated?" },
];

const initialMessages: Message[] = [
  {
    id: "1",
    role: "assistant",
    content: "Hi! I'm your IELTS study assistant. I can help you with tips, practice questions, and strategies for all four sections. How can I help you today?",
    timestamp: new Date(),
  },
];

interface AIAssistantProps {
  isOpen: boolean;
  onToggle: () => void;
}

export function AIAssistant({ isOpen, onToggle }: AIAssistantProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isMinimized, setIsMinimized] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "That's a great question! I'd be happy to help you with that. Let me provide some detailed guidance...",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiResponse]);
    }, 1000);
  };

  const handleQuickAction = (action: string) => {
    setInput(action);
  };

  return (
    <>
      {/* Toggle Button (when closed) */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed right-6 bottom-6 z-40"
          >
            <Button
              onClick={onToggle}
              className="w-14 h-14 rounded-full shadow-lg bg-primary hover:bg-primary/90 group"
            >
              <Bot className="w-6 h-6 text-primary-foreground group-hover:scale-110 transition-transform" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* AI Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.aside
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className={cn(
              "fixed right-0 top-0 h-screen bg-card border-l border-border/50 flex flex-col z-40 transition-all duration-300",
              isMinimized ? "w-16" : "w-80"
            )}
          >
            {/* Header */}
            <div className="p-4 border-b border-border/50 flex items-center justify-between">
              {!isMinimized && (
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-foreground">AI Assistant</h3>
                    <p className="text-xs text-muted-foreground">Always here to help</p>
                  </div>
                </div>
              )}
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="w-8 h-8"
                >
                  {isMinimized ? (
                    <Maximize2 className="w-4 h-4" />
                  ) : (
                    <Minimize2 className="w-4 h-4" />
                  )}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onToggle}
                  className="w-8 h-8"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Content */}
            {!isMinimized && (
              <>
                {/* Quick Actions */}
                <div className="p-3 border-b border-border/50">
                  <p className="text-xs text-muted-foreground mb-2">Quick Actions</p>
                  <div className="flex flex-wrap gap-2">
                    {quickActions.map((action, index) => (
                      <motion.button
                        key={index}
                        onClick={() => handleQuickAction(action.action)}
                        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-secondary/50 text-xs text-foreground hover:bg-secondary transition-colors"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <action.icon className="w-3 h-3" />
                        {action.label}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Messages */}
                <ScrollArea className="flex-1 p-4" ref={scrollRef}>
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={cn(
                          "flex",
                          message.role === "user" ? "justify-end" : "justify-start"
                        )}
                      >
                        <div
                          className={cn(
                            "max-w-[85%] p-3 rounded-xl text-sm",
                            message.role === "user"
                              ? "bg-primary text-primary-foreground"
                              : "bg-secondary text-foreground"
                          )}
                        >
                          {message.content}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </ScrollArea>

                {/* Input */}
                <div className="p-4 border-t border-border/50">
                  <div className="flex gap-2">
                    <Input
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleSend()}
                      placeholder="Ask anything..."
                      className="flex-1 h-9"
                    />
                    <Button
                      onClick={handleSend}
                      size="icon"
                      className="w-9 h-9"
                      disabled={!input.trim()}
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </>
            )}

            {/* Minimized View */}
            {isMinimized && (
              <div className="flex-1 flex flex-col items-center py-4 gap-4">
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-10 h-10"
                  onClick={() => setIsMinimized(false)}
                >
                  <Bot className="w-5 h-5" />
                </Button>
              </div>
            )}
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}