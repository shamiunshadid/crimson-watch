import { integer, pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

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
    id: uuid().primaryKey().defaultRandom(),
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