import { integer, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { v7 as uuidv7 } from "uuid";
import { user } from "./auth.schema";

// ============================================================================
// User Stats Module Schema
// ============================================================================


// need to fix this👇 name, it will be (readingUserStats)
export const userStats = pgTable("user_stats", {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    userId: text("user_id").references(() => user.id, { onDelete: "cascade" }).unique().notNull(),

    // reading tests stats
    readingTestTaken: integer("reading_test_taken").default(0).notNull(),
    readingAverageScore: integer("reading_average_score").default(0).notNull(),
    readingImprovement: integer("reading_improvement").default(0).notNull(),
    readingTotalTime: integer("reading_total_time").default(0).notNull(),

    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
    deletedAt: timestamp("deleted_at"),
});

export const writingUserStats = pgTable("writing_user_stats", {
    id: uuid("id").primaryKey().$defaultFn(() => uuidv7()),
    userId: text("user_id").notNull().unique().references(() => user.id, { onDelete: "cascade" }),

    // writing tests stats
    writingTestTaken: integer("writing_test_taken").default(0).notNull(),
    writingAverageScore: integer("writing_average_score").default(0).notNull(),
    writingTotalWords: integer("writing_total_words").default(0).notNull(),
    writingImprovement: integer("writing_improvement").default(0).notNull(),

    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .$onUpdate(() => new Date())
      .notNull(),
    deletedAt: timestamp("deleted_at"),
});
