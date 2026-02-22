"use client";
import React from "react";
import { motion } from "motion/react";
import { Check, FileText, } from "lucide-react";

export const InstantResult = () => {
  return (
    <div className="relative w-full h-full flex items-center justify-center bg-neutral-50/50 overflow-hidden rounded-lg pt-5 mt-4">
      {/* Background Ambience */}
      {/* <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] bg-size:[16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-50" /> */}

      <div className="relative z-10 w-64">
        <ResultCard />
      </div>

      {/* Floating abstract decorative elements */}
      <motion.div
    //     className="absolute top-6 left-12 w-2 h-2 rounded-full bg-blue-400"
    //     animate={{ opacity: [0, 1, 0], scale: [0, 1.5, 0] }}
    //     transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
    //   />
    //   <motion.div
    //     className="absolute bottom-10 right-12 w-1.5 h-1.5 rounded-full bg-green-400"
    //     animate={{ opacity: [0, 1, 0], scale: [0, 1.5, 0] }}
    //     transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
      />
       {/* Background decorations */}
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-white/50 to-white/80 pointer-events-none" />
    </div>
  );
};

const ResultCard = () => {
  return (
    <div className="relative bg-white rounded-2xl border border-neutral-200/60 shadow-sm overflow-hidden transform-gpu">
      {/* Card Content (Skeleton) */}
      <div className="p-4 border-b border-neutral-100 flex items-center justify-between bg-neutral-50/30">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center">
            <FileText className="w-4 h-4 text-blue-500" />
          </div>
          <div className="w-24 h-2.5 bg-neutral-200 rounded-full" />
        </div>
        <div className="w-8 h-2 bg-neutral-100 rounded-full" />
      </div>

      <div className="p-5 space-y-4">
        {[1, 2, 3].map((item) => (
          <div key={item} className="flex gap-3 items-start opacity-40">
            <div className="w-4 h-4 rounded bg-neutral-100 shrink-0 transform translate-y-0.5" />
            <div className="flex-1 space-y-2">
              <div className="w-full h-2 bg-neutral-200 rounded-full" />
              <div className="w-2/3 h-2 bg-neutral-100 rounded-full" />
            </div>
          </div>
        ))}
      </div>

      {/* Scanning Line */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-0.5 bg-linear-to-r from-transparent via-blue-500 to-transparent shadow-[0_2px_10px_rgba(59,130,246,0.3)] z-10"
        animate={{ top: ["0%", "150%"] }}
        transition={{
          duration: 1.5,
          ease: "easeInOut",
          repeat: Infinity,
          repeatDelay: 1.5, // Total cycle ~3s
        }}
      />

      {/* Result Pop-up */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center bg-white/50 backdrop-blur-[1px] z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 1, 0] }}
        transition={{
          duration: 3,
          times: [0.35, 0.45, 0.85, 1], // Appear after scan (approx 1s), stay, then fade
          repeat: Infinity,
        }}
      >
        <motion.div
          className="bg-white p-5 rounded-2xl shadow-xl border border-neutral-100 text-center relative min-w-37.5"
          initial={{ scale: 0.8, y: 10 }}
          animate={{ scale: [0.8, 1, 1, 0.9], y: [10, 0, 0, 10] }}
          transition={{
            duration: 3,
            times: [0.35, 0.45, 0.85, 1],
            ease: "backOut",
            repeat: Infinity,
          }}
        >
            <div className="flex items-center justify-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wide">
              Result Ready
            </span>
          </div>
          <div className="text-5xl font-bold tracking-tighter text-neutral-800 mt-2 flex items-center justify-center relative">
            <span className="bg-linear-to-br from-neutral-800 to-neutral-600 bg-clip-text text-transparent">
              8.5
            </span>

            {/* <motion.div
              className="absolute -right-3 -top-1"
              animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
            >
              <Zap className="w-5 h-5 fill-yellow-400 text-yellow-500 drop-shadow-sm" />
            </motion.div> */}
          </div>
          

          {/* Success Badge */}
          <div className="absolute -top-3 -right-3">
            <motion.div
              className="bg-green-500 text-white p-1.5 rounded-full shadow-lg border-2 border-white"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1, duration: 0.3 }}
            >
              <Check className="w-3.5 h-3.5" strokeWidth={4} />
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};
