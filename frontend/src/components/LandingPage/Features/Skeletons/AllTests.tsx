"use client";

import { motion } from "motion/react";
import { MousePointer2 } from "lucide-react";

interface Tests{
    name: string,
    color: string,
    bg: string
}

const tests: Tests[] = [
  { name: "Listening", color: "text-blue-500", bg: "bg-blue-500/10" },
  { name: "Reading", color: "text-green-500", bg: "bg-green-500/10" },
  { name: "Writing", color: "text-orange-500", bg: "bg-orange-500/10" },
  { name: "Speaking", color: "text-purple-500", bg: "bg-purple-500/10" },
];

export const AllTests = () => {
  return (
    <div className="relative w-full h-full flex items-center justify-center bg-neutral-50/50 overflow-hidden rounded-lg pt-5 mt-4">
      <div className="relative w-64 space-y-3 z-10">
        {tests.map((test, index) => (
          <TestItem
            key={index}
            test={test}
            index={index}
            total={tests.length}
          />
        ))}

        {/* Floating Cursor - Positioned relative to the list container */}
        <Cursor total={tests.length} />
      </div>

      {/* Background decorations */}
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-white/50 to-white/80 pointer-events-none" />
    </div>
  );
};

const TestItem = ({ test, index, total }: {test: Tests, index: number, total: number}) => {
  return (
    <motion.div
      className="group flex items-center gap-4 p-3 rounded-xl bg-white border border-neutral-200/60 shadow-sm relative z-0"
      animate={{
        scale: [1, 1.02, 1],
        borderColor: [
          "rgba(229,229,229,0.6)",
          "rgba(59,130,246,0.5)",
          "rgba(229,229,229,0.6)",
        ],
        backgroundColor: [
          "rgba(255,255,255,1)",
          "rgba(245,250,255,1)",
          "rgba(255,255,255,1)",
        ],
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        delay: index * 1.5,
        repeatDelay: (total - 1) * 1.5,
        ease: "easeInOut",
      }}
    >
      <div
        className={`w-10 h-10 rounded-full flex items-center justify-center ${test.bg}`}
      >
        <span className={`font-bold text-lg ${test.color}`}>
          {test.name.charAt(0)}
        </span>
      </div>
      <div className="flex flex-col">
        <span className="font-semibold text-neutral-800 text-sm">
          {test.name}
        </span>
        <span className="text-xs text-neutral-400">Start Test</span>
      </div>

      {/* Active Indicator Dot */}
      <motion.div
        className="absolute right-3 w-2 h-2 rounded-full bg-blue-500"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          delay: index * 1.5,
          repeatDelay: (total - 1) * 1.5,
          ease: "easeInOut",
        }}
      />
    </motion.div>
  );
};

const Cursor = ({ total }: {total: number}) => {
  return (
    <motion.div
      className="absolute -right-6 top-8 z-20 pointer-events-none"
      animate={{
        y: [0, 76, 152, 228, 0], // Steps of approx card height + gap
        scale: [1, 0.9, 1, 0.9, 1, 0.9, 1, 0.9, 1], // Click feedback
      }}
      transition={{
        duration: total * 1.5,
        repeat: Infinity,
        ease: "linear",
        times: [0, 0.25, 0.5, 0.75, 1],
      }}
    >
      <MousePointer2 className="w-6 h-6 fill-black text-white drop-shadow-md" />
    </motion.div>
  );
};
