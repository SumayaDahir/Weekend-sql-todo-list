CREATE TABLE "to_do_list" (
"id" SERIAL PRIMARY KEY,
"new_task" VARCHAR(250)
"date" date,
"completed" BOOLEAN, 
"notes" TEXT,
"appointments" BOOLEAN
);

INSERT INTO "to_do_list" ("new_task", "date" , "completed", "notes", "appointments" )
VALUES ('work', '01/21/2023', 'yes', 'none', 'no')
      