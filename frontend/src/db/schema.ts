import { boolean, integer, pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import {v7 as uuidv7} from "uuid"

export const users = pgTable("users", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    fullName: varchar({length: 255}).notNull(),
    email: varchar({length: 255}).notNull().unique(),
    password: varchar({length: 255}).notNull(),
    createdAt: timestamp().defaultNow().notNull(),
    updatedAt: timestamp().defaultNow().notNull(),
    deletedAt: timestamp(),
});

export const sessions = pgTable("sessions", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    userId: integer().notNull().references(()=> users.id, {onDelete: "cascade"}),
    sessionToken: text().notNull().unique(),
    userAgent: text(),
    ip: varchar({length: 45}).notNull(),
    expiresAt: timestamp().notNull(),
    createdAt: timestamp().defaultNow().notNull(),
    updatedAt: timestamp().defaultNow().notNull(),
});

export const userStats = pgTable("user_stats", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    userId: integer().references(()=> users.id, {onDelete: "cascade"}).unique().notNull(),

    // reading tests stats
    readingTestTaken: integer().default(0).notNull(),
    readingAvarageScore: integer().default(0).notNull(),
    readingImprovement: integer().default(0).notNull(),
    readingTotalTime: integer().default(0).notNull(),

    // other tests stats

    createdAt: timestamp().defaultNow().notNull(),
    updatedAt: timestamp().defaultNow().notNull(),
    deletedAt: timestamp().defaultNow().notNull(),
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
    deletedAt: timestamp().defaultNow().notNull(),

    publishedAt: timestamp(),
});


export const readingSections = pgTable("reading_sections", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    testId: integer().references(()=> readingTests.id).notNull(),

    title: varchar({length: 255}).notNull(),
    sectionNumber: integer().notNull(),
    passage: text().notNull(),
    
    totalQuestions: integer().notNull(),
    description: text(),

    createdAt: timestamp().defaultNow().notNull(),
    updatedAt: timestamp().defaultNow().notNull(),
});