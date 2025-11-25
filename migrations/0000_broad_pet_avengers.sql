CREATE TABLE `employees` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`position` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `fruits` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `products` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`description` text NOT NULL,
	`slug_product` text NOT NULL,
	`price` integer NOT NULL,
	`created_at` text DEFAULT '2025-11-24T14:20:51.187Z',
	`category` text NOT NULL
);
