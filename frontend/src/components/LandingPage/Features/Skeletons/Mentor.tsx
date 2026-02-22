"use client";

import React from "react";
import { motion } from "motion/react";
import Image from "next/image";

const conversations = [
  {
    role: "student",
    message: "I got a problem with my database schema design.",
    image: "https://i.pravatar.cc/150?u=student",
  },
  {
    role: "mentor",
    message: "Just tell me about it, and I'll try to solve it.",
    image: "https://i.pravatar.cc/150?u=mentor",
  },
  {
    role: "student",
    message:
      "The API calls are returning 404 errors even though the endpoint exists.",
    image: "https://i.pravatar.cc/150?u=student",
  },
  {
    role: "mentor",
    message:
      "Check your base URL configuration; it might be missing a trailing slash.",
    image: "https://i.pravatar.cc/150?u=mentor",
  },
  {
    role: "student",
    message: "My CSS grid isn't responsive on mobile devices.",
    image: "https://i.pravatar.cc/150?u=student",
  },
  // {
  //   role: "mentor",
  //   message: "Try using minmax() or media queries to adjust the column count.",
  //   image: "https://i.pravatar.cc/150?u=mentor",
  // },
  // {
  //   role: "student",
  //   message:
  //     "I'm struggling to understand how to handle authentication tokens securely.",
  //   image: "https://i.pravatar.cc/150?u=student",
  // },
  // {
  //   role: "mentor",
  //   message:
  //     "Store them in HttpOnly cookies to prevent XSS attacks. Let's set it up.",
  //   image: "https://i.pravatar.cc/150?u=mentor",
  // },
];

export const Mentor = () => {
  return (
    <div className="flex flex-col gap-4 w-full h-full overflow-hidden px-6 py-2 mt-4 relative">
      {conversations.map((chat, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: idx * 0.1, ease: "easeOut" }}
          viewport={{ once: true }}
          className={`flex items-end gap-2 z-10 ${
            chat.role === "student" ? "flex-row-reverse" : "flex-row"
          }`}
        >
          <Image
            height={100}
            width={100}
            src={chat.image}
            alt={chat.role}
            className="w-8 h-8 rounded-full object-cover border border-border shadow-sm"
          />
          <div
            className={`px-4 py-2 text-sm max-w-[80%] shadow-sm ${
              chat.role === "student"
                ? "bg-blue-600 text-white rounded-2xl rounded-br-xs"
                : "bg-gray-100 text-gray-800 rounded-2xl rounded-bl-xs dark:bg-neutral-800 dark:text-neutral-200"
            }`}
          >
            {chat.message}
          </div>
        </motion.div>
      ))}

      {/* Background decorations */}
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-white/50 to-white/80 pointer-events-none" />
    </div>
  );
};
