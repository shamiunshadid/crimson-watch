"use client";

import {
  Card,
  CardDescription,
  CardSkeleton,
  CardTitle,
} from "./Features/card";
import { AllTests } from "./Features/Skeletons/AllTests";
import { InstantResult } from "./Features/Skeletons/InstantResult";
import { LearnWithOther } from "./Features/Skeletons/LearnWithOther";
import { motion } from "motion/react";
import { Mentor } from "./Features/Skeletons/Mentor";

const features = [
  {
    title: "Give all the tests",
    description: "Give all the tests you need to prepare for the IELTS exam.",
    skeleton: <AllTests />,
  },
  {
    title: "Get instant result",
    description: "Get instant result after giving the test.",
    skeleton: <InstantResult />,
  },
  {
    title: "Personal mentor",
    description: "Get personal mentor to help you prepare for the IELTS exam.",
    skeleton: <Mentor />,
  },
  {
    title: "Learn with other",
    description: "Learn with other students to prepare for the IELTS exam.",
    skeleton: <LearnWithOther />,
  },
];

export const FeaturesSection = () => {
  return (
    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 mt-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl font-bold tracking-tight text-foreground mb-4">
          Features
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Everything you need to prepare for the IELTS exam
        </p>
      </motion.div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {features.map((feature, index) => (
          <Card key={index}>
            <CardTitle>{feature.title}</CardTitle>
            <CardDescription>{feature.description}</CardDescription>
            <CardSkeleton>{feature.skeleton}</CardSkeleton>
          </Card>
        ))}
      </div>
    </div>
  );
};
