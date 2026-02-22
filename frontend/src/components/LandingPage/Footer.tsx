"use client";

import { useState } from "react";
import { motion } from "motion/react";
import {
  Github,
  Twitter,
  Linkedin,
  Mail,
  ChevronRight,
  ArrowUp,
} from "lucide-react";
import Link from "next/link";

const footerSections = [
  {
    title: "Product",
    links: [
      { label: "Mock Tests", href: "#" },
      { label: "Practice Materials", href: "#" },
      { label: "Band Calculator", href: "#" },
      { label: "Study Plans", href: "#" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "IELTS Tips", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Free Samples", href: "#" },
      { label: "Success Stories", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "#" },
      { label: "Contact", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Privacy Policy", href: "#" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Help Center", href: "#" },
      { label: "FAQ", href: "#" },
      { label: "Terms of Service", href: "#" },
      { label: "Cookie Policy", href: "#" },
    ],
  },
];

const companyName = "BLABLABLA";

const CoolText = () => {
  const [hoveredLetter, setHoveredLetter] = useState<number | null>(null);

  const letters = companyName.split("");

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2,
      },
    },
  };

  const letterVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.5,
      rotateX: 90,
    },
    visible: {
      opacity: 0.08,
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 100,
      },
    },
  };

  const letterHoverVariants = {
    normal: {
      opacity: 0.08,
      scale: 1,
      rotate: 0,
      filter: "blur(0px)",
    },
    hover: {
      opacity: 0.15,
      scale: 1.2,
      rotate: [-5, 5, -5, 5, 0],
      filter: "blur(2px)",
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <motion.div
      className="absolute bottom-0 left-0 right-0 flex items-center justify-center pointer-events-none select-none"
      style={{ zIndex: 0 }}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      <div className="relative overflow-hidden">
        <motion.div
          className="font-black tracking-wider whitespace-nowrap"
          style={{
            fontSize: "clamp(4rem, 15vw, 12rem)",
            lineHeight: 1,
            fontWeight: 900,
            textTransform: "uppercase",
            background:
              "linear-gradient(135deg, currentColor 0%, currentColor 100%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
          }}
        >
          {letters.map((letter: string, index: number) => (
            <motion.span
              key={index}
              className="inline-block cursor-pointer pointer-events-auto transition-colors duration-300 hover:text-primary"
            //   variants={letterVariants}
            variants={letterVariants}
              animate={
                hoveredLetter === index
                  ? letterHoverVariants.hover
                  : letterHoverVariants.normal
              }
              onHoverStart={() => setHoveredLetter(index)}
              onHoverEnd={() => setHoveredLetter(null)}
              style={{
                display: "inline-block",
                originY: 0.5,
                originX: 0.5,
                color: "currentColor",
              }}
            >
              {letter === " " ? "\u00A0" : letter}
            </motion.span>
          ))}
        </motion.div>

        {/* Subtle glow effect behind text */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-1/2 rounded-full blur-[100px] bg-primary/5"
          animate={{
            opacity: [0.3, 0.5, 0.3],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>
    </motion.div>
  );
};

const FooterSection = ({
  section,
}: {
  section: { title: string; links: Array<{ label: string; href: string }> };
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="space-y-4"
    >
      {/* <h3 className="font-semibold text-foreground mb-4 ml-4">{section.title}</h3> */}
      <ul className="space-y-3">
        {section.links.map(
          (link: { label: string; href: string }, index: number) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <Link
                href={link.href}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
              >
                <ChevronRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                <span>{link.label}</span>
              </Link>
            </motion.li>
          ),
        )}
      </ul>
    </motion.div>
  );
};

const SocialLink = ({
  icon: Icon,
  href,
  label,
}: {
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  label: string;
}) => {
  return (
    <motion.a
      href={href}
      aria-label={label}
      className="relative flex items-center justify-center w-10 h-10 rounded-full bg-muted/50 hover:bg-primary hover:text-primary-foreground transition-all duration-300 group overflow-hidden"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        className="absolute inset-0 bg-linear-to-br from-primary/0 via-primary/20 to-primary/0 opacity-0 group-hover:opacity-100"
        animate={{
          x: ["-100%", "100%"],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      <Icon className="w-4 h-4 relative z-10" />
    </motion.a>
  );
};

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative w-full mt-auto bg-background border-t border-border/50 overflow-hidden">
      {/* Big Background Text - Lowest z-index */}
      <CoolText />

      {/* Main Footer Content - Higher z-index */}
      <div className="relative z-10">
        {/* Newsletter Section */}
        {/* <div className="border-b border-border/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-2xl mx-auto space-y-6"
            >
              <h2 className="text-3xl font-bold tracking-tight text-foreground">
                Ready to Ace Your IELTS?
              </h2>
              <p className="text-muted-foreground">
                Join thousands of students who achieved their target scores with
                our comprehensive mock tests.
              </p>
              <motion.div
                className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
                // whileHover={{ scale: 1.02 }}
                // transition={{ type: "spring", stiffness: 400 }}
              >
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-sm bg-muted/50 border border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{
                    duration: 0.3
                  }}
                  className="px-6 py-3 bg-primary text-primary-foreground rounded-full font-medium hover:bg-primary/90 transition-colors whitespace-nowrap"
                >
                  Get Started
                </motion.button>
              </motion.div>
            </motion.div>
          </div>
        </div> */}

        {/* Main Links Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {footerSections.map((section, index) => (
              <FooterSection key={index} section={section} />
            ))}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              {/* Copyright */}
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-sm text-muted-foreground"
              >
                © {new Date().getFullYear()} IELTS Mastery. All rights reserved.
              </motion.p>

              {/* Social Links */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-4"
              >
                <SocialLink icon={Twitter} href="#" label="Twitter" />
                <SocialLink icon={Linkedin} href="#" label="LinkedIn" />
                <SocialLink icon={Github} href="#" label="GitHub" />
                <SocialLink icon={Mail} href="#" label="Email" />
              </motion.div>

              {/* Scroll to Top Button */}
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.9 }}
                transition={{
                  duration: 0.3,
                }}
                onClick={scrollToTop}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-muted/50 hover:bg-primary hover:text-primary-foreground transition-all duration-300 group cursor-pointer"
                aria-label="Scroll to top"
              >
                <span className="text-sm font-medium">Top</span>
                <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform duration-300" />
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
