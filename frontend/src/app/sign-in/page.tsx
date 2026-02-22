"use client";

import { motion, Variants } from "motion/react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight,
  GraduationCap,
  BookOpen,
} from "lucide-react";
// import { useTheme } from "next-themes";
import Link from "next/link";

// Animation variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 24,
    },
  },
};

const fadeInVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
};

const scaleInVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 25,
    },
  },
};

export default function SignInPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  // const [isHovered, setIsHovered] = useState<string | null>(null);
  // const { theme, setTheme } = useTheme();
  // const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  // useState(() => {
  //   setMounted(true);
  // });

  const stats = [
    { value: "50K+", label: "Students" },
    { value: "4.9", label: "Rating" },
    { value: "100+", label: "Mock Tests" },
  ];

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-background">
      {/* Left Side - Sign In Form */}
      <motion.div 
        className="flex-1 flex items-center justify-center p-6 lg:p-12"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div 
          className="w-full max-w-md"
          variants={scaleInVariants}
        >
          {/* Mobile Logo */}
          <motion.div 
            className="lg:hidden flex items-center justify-center gap-3 mb-8"
            variants={itemVariants}
          >
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-md">
              <GraduationCap className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-semibold text-foreground">IELTS Master</span>
          </motion.div>

          {/* Theme Toggle */}
          {/* <motion.div 
            className="flex justify-end mb-6"
            variants={itemVariants}
          >
            {mounted && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="rounded-full w-9 h-9"
              >
                {theme === "dark" ? (
                  <Sun className="w-4 h-4" />
                ) : (
                  <Moon className="w-4 h-4" />
                )}
              </Button>
            )}
          </motion.div> */}

          {/* Form Card */}
          <motion.div 
            className="bg-card rounded-2xl border border-border/50 p-8 card-shadow"
            variants={itemVariants}
          >
            {/* Header */}
            <motion.div className="mb-8" variants={itemVariants}>
              <h2 className="text-2xl font-semibold text-foreground mb-2">
                Welcome back
              </h2>
              <p className="text-muted-foreground">
                Continue your IELTS preparation journey
              </p>
            </motion.div>

            {/* Form */}
            <motion.form className="space-y-5" variants={containerVariants}>
              {/* Email Field */}
              <motion.div className="space-y-2" variants={itemVariants}>
                <Label htmlFor="email" className="text-sm font-medium text-foreground">
                  Email address
                </Label>
                <div className="relative group">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground transition-colors group-focus-within:text-primary" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 h-11 rounded-lg border-border/60 bg-background transition-all duration-200 hover:border-border focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </motion.div>

              {/* Password Field */}
              <motion.div className="space-y-2" variants={itemVariants}>
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-sm font-medium text-foreground">
                    Password
                  </Label>
                  <Link 
                    href="/forgot-password" 
                    className="text-xs text-muted-foreground hover:text-accent transition-colors"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative group">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground transition-colors group-focus-within:text-primary" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10 h-11 rounded-lg border-border/60 bg-background transition-all duration-200 hover:border-border focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </motion.div>

              {/* Remember Me */}
              <motion.div 
                className="flex items-center gap-2"
                variants={itemVariants}
              >
                <Checkbox 
                  id="remember" 
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                  className="border-border/60 data-[state=checked]:bg-primary data-[state=checked]:border-primary cursor-pointer"
                />
                <Label 
                  htmlFor="remember" 
                  className="text-sm text-muted-foreground cursor-pointer select-none"
                >
                  Remember me for 30 days
                </Label>
              </motion.div>

              {/* Sign In Button */}
              <motion.div variants={itemVariants}>
                <Button
                  type="submit"
                  className="w-full h-11 rounded-lg bg-primary text-primary-foreground font-medium shadow-sm transition-all duration-200 hover:bg-primary/90 hover:shadow-md active:scale-[0.98] group cursor-pointer"
                >
                  <span>Sign in</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </Button>
              </motion.div>
            </motion.form>

            {/* Divider */}
            <motion.div className="relative my-6" variants={itemVariants}>
              <Separator />
              <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-3 text-xs text-muted-foreground">
                or continue with
              </span>
            </motion.div>

            {/* Social Buttons */}
            <motion.div className="grid grid-cols-2 gap-3" variants={itemVariants}>
              {/* Google Button */}
              <motion.button
                type="button"
                className="flex items-center justify-center gap-2 h-11 rounded-lg border border-border/60 bg-background font-medium text-sm text-foreground transition-all duration-200 hover:bg-secondary hover:border-border hover:shadow-sm active:scale-[0.98] cursor-pointer"
                // onMouseEnter={() => setIsHovered("google")}
                // onMouseLeave={() => setIsHovered(null)}
                // whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                <motion.span
                //   animate={{ x: isHovered === "google" ? 2 : 0 }}
                //   transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  Google
                </motion.span>
              </motion.button>

              {/* LinkedIn Button */}
              <motion.button
                type="button"
                className="flex items-center justify-center gap-2 h-11 rounded-lg border border-border/60 bg-background font-medium text-sm text-foreground transition-all duration-200 hover:bg-secondary hover:border-border hover:shadow-sm active:scale-[0.98] cursor-pointer"
                // onMouseEnter={() => setIsHovered("linkedin")}
                // onMouseLeave={() => setIsHovered(null)}
                // whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                <motion.span
                //   animate={{ x: isHovered === "linkedin" ? 2 : 0 }}
                //   transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  LinkedIn
                </motion.span>
              </motion.button>
            </motion.div>

            {/* Sign Up Link */}
            <motion.p 
              className="text-center text-sm text-muted-foreground mt-6"
              variants={itemVariants}
            >
              Don&apos;t have an account?{" "}
              <Link 
                href="/sign-up" 
                className="text-foreground font-medium hover:text-accent transition-colors underline-offset-4 hover:underline"
              >
                Sign up
              </Link>
            </motion.p>
          </motion.div>

          {/* Terms */}
          <motion.p 
            className="text-center text-xs text-muted-foreground mt-6 px-4"
            variants={itemVariants}
          >
            By signing in, you agree to our{" "}
            <a href="#" className="underline underline-offset-2 hover:text-foreground transition-colors">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="underline underline-offset-2 hover:text-foreground transition-colors">
              Privacy Policy
            </a>
          </motion.p>
        </motion.div>
      </motion.div>

      {/* Right Side - Branding */}
      <motion.div 
        className="hidden lg:flex lg:w-1/2 xl:w-[55%] relative overflow-hidden bg-linear-to-bl from-primary/5 via-background to-accent/10"
        initial="hidden"
        animate="visible"
        variants={fadeInVariants}
      >
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div 
            className="absolute -top-20 -left-20 w-96 h-96 rounded-full bg-accent/20 blur-3xl"
            animate={{ 
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ 
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div 
            className="absolute -bottom-32 -right-32 w-80 h-80 rounded-full bg-primary/10 blur-3xl"
            animate={{ 
              scale: [1, 1.15, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{ 
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center px-12 xl:px-20 items-end text-right">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-lg"
          >
            {/* Logo */}
            <div className="flex items-center gap-3 mb-8 justify-end">
              <span className="text-2xl font-semibold text-foreground tracking-tight">
                IELTS Master
              </span>
              <motion.div 
                className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center shadow-lg"
                whileHover={{ scale: 1.05, rotate: -2 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <GraduationCap className="w-6 h-6 text-primary-foreground" />
              </motion.div>
            </div>

            {/* Tagline */}
            <h1 className="text-4xl xl:text-5xl font-light text-foreground leading-tight mb-6">
              Your path to <br />
              <span className="font-serif text-accent">IELTS success</span>
            </h1>

            <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
              Join thousands of students who have achieved their target scores. Our adaptive learning platform personalizes your preparation journey.
            </p>

            {/* Stats */}
            <div className="flex gap-8 justify-end">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1, duration: 0.4 }}
                >
                  <div className="text-3xl font-semibold text-foreground mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Decorative elements */}
          <motion.div 
            className="absolute bottom-20 left-20 opacity-10"
            animate={{ 
              rotate: [0, -5, 0, 5, 0],
            }}
            transition={{ 
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <BookOpen className="w-32 h-32 text-primary" />
          </motion.div>

          {/* Sparkle decoration */}
          {/* <motion.div 
            className="absolute top-1/3 left-1/4"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Sparkles className="w-8 h-8 text-accent" />
          </motion.div> */}
        </div>
      </motion.div>
    </div>
  );
}