import { pgTable, text, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const portfolioSectionsTable = pgTable("portfolio_sections", {
  section: text("section").primaryKey(),
  content: jsonb("content").notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date()),
});

export const insertPortfolioSectionSchema = createInsertSchema(portfolioSectionsTable);
export type InsertPortfolioSection = z.infer<typeof insertPortfolioSectionSchema>;
export type PortfolioSection = typeof portfolioSectionsTable.$inferSelect;
