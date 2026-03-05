import { boolean, decimal, integer, jsonb, pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { v7 as uuidv7 } from "uuid";

export const users = pgTable("users", {
    id: uuid("id").primaryKey().$defaultFn(() => uuidv7()),
    fullName: varchar("full_name", { length: 255 }).notNull(),
    email: varchar("email", { length: 255 }).notNull().unique(),
    password: varchar("password", { length: 255 }).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
    deletedAt: timestamp("deleted_at"),
});

export const sessions = pgTable("sessions", {
    id: uuid("id").primaryKey().$defaultFn(() => uuidv7()),
    userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
    sessionToken: text("session_token").notNull().unique(),
    userAgent: text("user_agent"),
    ip: varchar("ip", { length: 45 }).notNull(),
    expiresAt: timestamp("expires_at").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const userStats = pgTable("user_stats", {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    userId: uuid("user_id").references(() => users.id, { onDelete: "cascade" }).unique().notNull(),

    // reading tests stats
    readingTestTaken: integer("reading_test_taken").default(0).notNull(),
    readingAvarageScore: integer("reading_average_score").default(0).notNull(),
    readingImprovement: integer("reading_improvement").default(0).notNull(),
    readingTotalTime: integer("reading_total_time").default(0).notNull(),

    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
    deletedAt: timestamp("deleted_at")
});

export const readingTests = pgTable("reading_tests", {
    id: uuid("id").primaryKey().$defaultFn(() => uuidv7()),
    title: varchar("title", { length: 255 }).notNull(),
    slug: varchar("slug", { length: 255 }).notNull(),
    description: text("description"),

    passage: text("passage").notNull(),
    difficulty: varchar("difficulty", { length: 20 }).notNull(),
    testType: varchar("test_type", { length: 50 }).default("academic").notNull(),
    
    timeAllowed: integer("time_allowed").notNull(),
    totalQuestions: integer("total_questions").notNull(),
    totalSections: integer("total_sections").default(0).notNull(),

    isPublished: boolean("is_published").default(false).notNull(),
    orderIndex: integer("order_index").default(0),

    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
    deletedAt: timestamp("deleted_at"),

    publishedAt: timestamp("published_at"),
});


export const readingSections = pgTable("reading_sections", {
    id: uuid("id").primaryKey().$defaultFn(() => uuidv7()),
    testId: uuid("test_id").references(() => readingTests.id, { onDelete: "cascade" }).notNull(),

    title: varchar("title", { length: 255 }).notNull(),
    sectionNumber: integer("section_number").notNull(),
    passage: text("passage").notNull(),
    
    totalQuestions: integer("total_questions").notNull(),
    description: text("description"),

    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const readingQuestions = pgTable("reading_questions", {
    id: uuid("id").primaryKey().$defaultFn(() => uuidv7()),
    sectionId: uuid("section_id").references(() => readingSections.id, { onDelete: "cascade" }).notNull(),

    questionText: text("question_text").notNull(),
    questionType: varchar("question_type", { length: 50 }).notNull(),

    options: jsonb("options"),

    correctAnswer: text("correct_answer").notNull(),
    explanation: text("explanation"),

    questionNumber: integer("question_number").notNull(),
    points: integer("points").default(1).notNull(),

    metadata: jsonb("metadata"),

    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const testAttempts = pgTable("test_attempts", {
    id: uuid("id").primaryKey().$defaultFn(() => uuidv7()),
    userId: uuid("user_id").references(() => users.id).notNull(),
    testId: uuid("test_id").references(() => readingTests.id).notNull(),
    
    status: varchar("status", { length: 20 }).default("in_progress").notNull(),

    startedAt: timestamp("started_at").defaultNow().notNull(),
    completedAt: timestamp("completed_at"),
    timeSpent: integer("time_spent"),

    score: integer("score"),
    percentageScore: decimal("percentage_score", { precision: 5, scale: 2 }),
    bandScore: decimal("band_score", { precision: 3, scale: 1 }),

    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const questionResponses = pgTable("question_responses", {
    id: uuid("id").primaryKey().$defaultFn(() => uuidv7()),

    attemptId: uuid("attempt_id").references(() => testAttempts.id).notNull(),
    questionId: uuid("question_id").references(() => readingQuestions.id).notNull(),

    userAnswer: text("user_answer").notNull(),
    isCorrect: boolean("is_correct").default(false),

    timeSpent: integer("time_spent"), 
    isFlagged: boolean("is_flagged").default(false),

    isSubmitted: boolean("is_submitted").default(false).notNull(), 

    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});