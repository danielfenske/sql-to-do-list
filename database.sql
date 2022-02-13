-- create table
CREATE TABLE "list" (
	"id" SERIAL PRIMARY KEY,
	"complete" BOOLEAN DEFAULT FALSE,
	"task" VARCHAR(120) NOT NULL,
	"category" VARCHAR(10) NOT NULL
);

-- insert grocery list items into table
INSERT INTO "list" ("complete","task","category")
VALUES (TRUE,'skim milk','Grocery'),
(FALSE,'cantelope','Grocery'),
(FALSE,'potatoes','Grocery'),
(TRUE,'whole-wheat bread','Grocery'),
(FALSE,'tortillas','Grocery');

-- insert goal list items into table
INSERT INTO "list" ("complete","task","category")
VALUES (FALSE,'daily walk','Goals'),
(TRUE,'read the Bible','Goals'),
(FALSE,'exercise twice this week','Goals');

-- insert chores list items into table
INSERT INTO "list" ("complete","task","category")
VALUES (TRUE,'take out trash','Chores'),
(FALSE,'dust around the house','Chores'),
(TRUE,'fold the laundry','Chores'),
(FALSE,'prep tax statements','Chores');

-- insert work list items into table
INSERT INTO "list" ("complete","task","category")
VALUES (FALSE,'finish weekend challenge','Work'),
(TRUE,'read Bootstrap documentation','Work');

-- insert exercise list items into table
INSERT INTO "list" ("complete","task","category")
VALUES (FALSE,'Bench (5 x 4)','Exercise'),
(FALSE,'Pull-ups (4 x failure)','Exercise'),
(FALSE,'Abs (3 x 25)','Exercise'),
(FALSE,'Bicep Curls (3 x 15)','Exercise'),
(FALSE,'Skull Crushers (3 x 15)','Exercise');