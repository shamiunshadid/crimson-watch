"use client";

import React from "react";
import { motion } from "motion/react";
import {
  BarChart3,
  ScanEye,
  Gauge,
  Clock,
  TrendingUp,
  BookOpen,
} from "lucide-react";
import { BenefitCard } from "./Cards/BenefitCard";

const benefits = [
  {
    id: 1,
    title: "Real-time Analytics",
    description:
      "Get instant insights into your performance with detailed graphical breakdowns.",
    icon: BarChart3,
    type: "analytics",
  },
  {
    id: 2,
    title: "AI Feedback",
    description:
      "Receive personalized, AI-driven corrections for your writing and speaking tasks.",
    icon: ScanEye,
    type: "ai-feedback",
  },
  {
    id: 3,
    title: "Band Score Predictor",
    description:
      "Accurately predict your IELTS band score based on your mock test performance.",
    icon: Gauge,
    type: "band-score",
  },
  {
    id: 4,
    title: "Time Management",
    description:
      "Master the clock with simulated timed tests that mimic exam conditions.",
    icon: Clock,
    type: "time-management",
  },
  {
    id: 5,
    title: "Progress Tracking",
    description:
      "Visualise your improvement over time and identify areas that need focus.",
    icon: TrendingUp,
    type: "progress",
  },
  {
    id: 6,
    title: "Study Material",
    description:
      "Access a library of curated study materials and practice questions.",
    icon: BookOpen,
    type: "study-material",
  },
];


export const BenefitsSection = () => {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
            Why Students Prefer Our Mock Tests
          </h2>
          <p className="text-slate-600 text-lg">
            Experience the most realistic IELTS simulation with advanced
            analytics to skyrocket your band score.
          </p>
        </div>

        {/* Grid Container */}
        <div className="relative">
          {/* Flow Animation Layer */}
          {/* <GlowingRay /> */}

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-y-16 lg:gap-x-12 relative z-10">
            {benefits.map((benefit, index) => (
              <div key={benefit.id} className="h-full">
                <BenefitCard {...benefit} index={index} />
              </div>
            ))}
          </div>
        </div>

        {/* Social Proof */}
        <div className="mt-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            // whileInView={{ opacity: 1, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="inline-flex items-center gap-3 bg-blue-50 border border-blue-100 px-6 py-3 rounded-full"
          >
            <div className="flex -space-x-2">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full bg-slate-300 border-2 border-white"
                />
              ))}
            </div>
            <span className="text-sm font-medium text-slate-700">
              Users who complete{" "}
              <span className="text-blue-600 font-bold">3+ mocks</span> see an
              average band increase of{" "}
              <span className="text-blue-600 font-bold">0.5</span>
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
