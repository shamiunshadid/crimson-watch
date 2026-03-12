"use server";

import { db } from "@/db";
import { readingTests, testAttempts, userStats } from "@/db/schema";
import { getCurrentUser } from "@/features/auth/server/use-cases/get-current-user";
import { eq, desc } from "drizzle-orm";

function getRelativeTimeString(date: Date) {
  const timeMs = date.getTime();
  const deltaSeconds = Math.round((timeMs - Date.now()) / 1000);
  const cutoffs = [
    60,
    3600,
    86400,
    86400 * 7,
    86400 * 30,
    86400 * 365,
    Infinity,
  ];
  const units: Intl.RelativeTimeFormatUnit[] = [
    "second",
    "minute",
    "hour",
    "day",
    "week",
    "month",
    "year",
  ];
  const currIndex = cutoffs.findIndex(
    (cutoff) => cutoff > Math.abs(deltaSeconds),
  );
  const divisor = currIndex ? cutoffs[currIndex - 1] : 1;
  const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
  return rtf.format(Math.floor(deltaSeconds / divisor), units[currIndex]);
}

export const getUserReadingData = async () => {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return { error: "Unauthorized" };
    }

    // Fetch user stats
    const statsResult = await db
      .select()
      .from(userStats)
      .where(eq(userStats.userId, user.id));
    const stats = statsResult[0];

    // Fetch all published tests
    const allTests = await db
      .select()
      .from(readingTests)
      .where(eq(readingTests.isPublished, true))
      .orderBy(desc(readingTests.createdAt));

    // Fetch user's test attempts with the associated test
    const attempts = await db
      .select({
        attempt: testAttempts,
        test: readingTests,
      })
      .from(testAttempts)
      .innerJoin(readingTests, eq(testAttempts.testId, readingTests.id))
      .where(eq(testAttempts.userId, user.id))
      .orderBy(desc(testAttempts.createdAt));

    const takenTestIds = new Set(attempts.map((a) => a.test.id));

    // Available tests are the ones not yet taken
    const available = allTests
      .filter((test) => !takenTestIds.has(test.id))
      .map((test) => ({
        id: test.id,
        title: test.title,
        difficulty: test.difficulty || "Medium",
        passages: test.totalSections || 3,
        questions: test.totalQuestions || 40,
        duration: test.timeAllowed
          ? `${Math.floor(test.timeAllowed / 60)} min`
          : "60 min",
        slug: test.slug,
      }));

    // Already taken tests (Unique by test id, tracking best score)
    interface TakenTest {
      id: string;
      title: string;
      difficulty: string;
      passages: number;
      questions: number;
      duration: string;
      completed: boolean;
      bestScore: number;
      slug: string;
    }
    const testsWithBestScore = new Map<string, TakenTest>();
    attempts.forEach(({ attempt, test }) => {
      if (!testsWithBestScore.has(test.id)) {
        testsWithBestScore.set(test.id, {
          id: test.id,
          title: test.title,
          difficulty: test.difficulty || "Medium",
          passages: test.totalSections || 3,
          questions: test.totalQuestions || 40,
          duration: test.timeAllowed
            ? `${Math.floor(test.timeAllowed / 60)} min`
            : "60 min",
          completed: attempt.status === "completed",
          bestScore: attempt.bandScore ? Number(attempt.bandScore) : 0,
          slug: test.slug,
        });
      } else {
        const existing = testsWithBestScore.get(test.id);
        if (existing) {
          const currentScore = attempt.bandScore
            ? Number(attempt.bandScore)
            : 0;
          if (currentScore > existing.bestScore) {
            existing.bestScore = currentScore;
          }
        }
      }
    });

    const alreadyTaken = Array.from(testsWithBestScore.values());

    // Recent tests (last 5 attempts)
    const recent = attempts.slice(0, 5).map(({ attempt, test }) => ({
      id: attempt.id,
      title: test.title,
      date: getRelativeTimeString(attempt.createdAt),
      score: attempt.bandScore ? Number(attempt.bandScore) : 0,
      totalQuestions: test.totalQuestions || 40,
      correctAnswers: attempt.score || 0,
      duration: attempt.timeSpent
        ? `${Math.floor(attempt.timeSpent / 60)} min`
        : "0 min",
      slug: test.slug,
    }));

    return {
      success: true,
      data: {
        stats: stats || {
          readingTestTaken: 0,
          readingAverageScore: 0,
          readingImprovement: 0,
          readingTotalTime: 0,
        },
        availableTests: available,
        alreadyTakenTests: alreadyTaken,
        recentTests: recent,
      },
    };
  } catch (error) {
    console.error("Error fetching reading data:", error);
    return { error: "Internal Server Error" };
  }
};
