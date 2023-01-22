CREATE TABLE "to_do_list" (
"id" SERIAL PRIMARY KEY,
"date" date DEFAULT CURRENT_DATE,
"priority" VARCHAR(250),
"completed" BOOLEAN, 
"notes" TEXT,
"appointments" BOOLEAN
);

INSERT INTO "to_do_list" ("date", "priority", "completed", "notes", "appointments" )
VALUES ('01/21/2023', 'work', 'Yes', 'reminder to complete assignment', 'no')
      