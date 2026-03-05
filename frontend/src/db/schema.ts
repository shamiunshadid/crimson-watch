import { boolean, decimal, integer, jsonb, pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import {v7 as uuidv7} from "uuid";

export const users = pgTable("users", {
    // id: integer().primaryKey().generatedAlwaysAsIdentity(),
    id: uuid().primaryKey().$defaultFn(()=> uuidv7()),
    fullName: varchar({length: 255}).notNull(),
    email: varchar({length: 255}).notNull().unique(),
    password: varchar({length: 255}).notNull(),
    createdAt: timestamp().defaultNow().notNull(),
    updatedAt: timestamp().defaultNow().notNull(),
    deletedAt: timestamp(),
});

export const sessions = pgTable("sessions", {
    id: uuid().primaryKey().$defaultFn(()=> uuidv7()),
    userId: uuid().notNull().references(()=> users.id, {onDelete: "cascade"}),
    sessionToken: text().notNull().unique(),
    userAgent: text(),
    ip: varchar({length: 45}).notNull(),
    expiresAt: timestamp().notNull(),
    createdAt: timestamp().defaultNow().notNull(),
    updatedAt: timestamp().defaultNow().notNull(),
});

export const userStats = pgTable("user_stats", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    userId: uuid().references(()=> users.id, {onDelete: "cascade"}).unique().notNull(),

    // reading tests stats
    readingTestTaken: integer().default(0).notNull(),
    readingAvarageScore: integer().default(0).notNull(),
    readingImprovement: integer().default(0).notNull(),
    readingTotalTime: integer().default(0).notNull(),

    // other tests stats

    createdAt: timestamp().defaultNow().notNull(),
    updatedAt: timestamp().defaultNow().notNull(),
    deletedAt: timestamp()
});

export const readingTests = pgTable("reading_tests", {
    id: uuid().primaryKey().$defaultFn(()=> uuidv7()),
    title: varchar({length: 255}).notNull(),
    slug: varchar({length: 255}).notNull(),
    description: text(),

    passage: text().notNull(),
    difficulty: varchar({length: 20}).notNull(),
    testType: varchar({length: 50}).default("academic").notNull(),
    
    timeAllowed: integer().notNull(),
    totalQuestions: integer().notNull(),
    totalSections: integer().default(0).notNull(),

    isPublished: boolean().default(false).notNull(),
    orderIndex: integer().default(0),

    createdAt: timestamp().defaultNow().notNull(),
    updatedAt: timestamp().defaultNow().notNull(),
    deletedAt: timestamp(),

    publishedAt: timestamp(),
});


export const readingSections = pgTable("reading_sections", {
    id: uuid().primaryKey().$defaultFn(()=> uuidv7()),
    testId: uuid().references(()=> readingTests.id, {onDelete: "cascade"}).notNull(),

    title: varchar({length: 255}).notNull(),
    sectionNumber: integer().notNull(),
    passage: text().notNull(),
    
    totalQuestions: integer().notNull(),
    description: text(),

    createdAt: timestamp().defaultNow().notNull(),
    updatedAt: timestamp().defaultNow().notNull(),
});

export const readingQuestions = pgTable("reading_questions", {
    id: uuid().primaryKey().$defaultFn(()=> uuidv7()),
    sectionId: uuid().references(()=> readingSections.id, {onDelete: "cascade"}).notNull(),

    questionText: text().notNull(),
    questionType: varchar({length: 50}).notNull(),

    options: jsonb(),

    correctAnswer: text().notNull(),
    explanation: text(),

    questionNumber: integer().notNull(),
    points: integer().default(1).notNull(),

    metadata: jsonb(),

    createdAt: timestamp().defaultNow().notNull(),
    updatedAt: timestamp().defaultNow().notNull(),
});

export const testAttempts = pgTable("test_attempts", {
    id: uuid().primaryKey().$defaultFn(()=> uuidv7()),
    userId: uuid().references(()=> users.id).notNull(),
    testId: uuid().references(()=> readingTests.id).notNull(),
    
    status: varchar({length: 20}).default("in_progress").notNull(),

    startedAt: timestamp().defaultNow().notNull(),
    completedAt: timestamp(),
    timeSpent: integer(),

    score: integer(),
    percentageScore: decimal({ precision: 5, scale: 2 }),
    bandScore: decimal({ precision: 3, scale: 1 }),

    createdAt: timestamp().defaultNow().notNull(),
    updatedAt: timestamp().defaultNow().notNull(),
});

export const questionResponses = pgTable("question_responses", {
    id: uuid().primaryKey().$defaultFn(()=> uuidv7()),

    attemptId: uuid().references(()=> testAttempts.id).notNull(),
    questionId: uuid().references(()=> readingQuestions.id).notNull(),

    userAnswer: text().notNull(),
    isCorrect: boolean().default(false),

    timeSpent: integer(), 
    isFlagged: boolean().default(false),


    isSubmitted: boolean().default(false).notNull(), 

    createdAt: timestamp().defaultNow().notNull(),
    updatedAt: timestamp().defaultNow().notNull(),
});