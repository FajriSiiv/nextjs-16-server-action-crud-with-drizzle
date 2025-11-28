CREATE TABLE "products" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"description" varchar NOT NULL,
	"slug_product" varchar NOT NULL,
	"price" serial NOT NULL,
	"created_at" varchar DEFAULT '2025-11-28T11:42:12.887Z',
	"category" varchar NOT NULL
);
