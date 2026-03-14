// ============================================================================
// Drizzle ORM Schema - Main Entry Point
// ============================================================================
// This file serves as the main entry point for all database schemas.
// Schemas are organized into modular files by domain for better maintainability.
// ============================================================================

// Re-export all schemas from modular files
export * from "./auth.schema";
export * from "./user-stats.schema";
export * from "./reading.schema";
export * from "./writing.schema";