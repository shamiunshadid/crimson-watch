import type { Metadata } from "next";
import { Instrument_Serif, Open_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/Theme/theme-provider";

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "IELTS Master - Premium Mock Test Platform",
  description: "Master your IELTS exam with our premium mock test platform. Practice reading, writing, speaking, and listening with real exam simulations.",
  keywords: ["IELTS", "Mock Test", "English", "Exam Preparation", "Reading", "Writing", "Speaking", "Listening"],
  authors: [{ name: "IELTS Master Team" }],
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "IELTS Master - Premium Mock Test Platform",
    description: "Master your IELTS exam with premium mock tests",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${openSans.variable} ${instrumentSerif.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
        {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
