import { pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  description: varchar("description").notNull(),
  slug_product: varchar("slug_product").notNull(),
  price: serial("price").notNull(),
  createdAt: varchar("created_at").default(new Date().toISOString()),
  category: varchar("category").notNull(),
});
