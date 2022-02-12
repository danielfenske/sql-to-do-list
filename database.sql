-- create table
CREATE TABLE "list" (
	"id" SERIAL PRIMARY KEY,
	"category" VARCHAR(6) NOT NULL, 
	"task" VARCHAR(120) NOT NULL,
	"complete" BOOLEAN DEFAULT FALSE
);

-- insert dummy task
INSERT INTO "list" ("id","category","task","complete")
VALUES ('1','growth','read 20 minutes today','true');