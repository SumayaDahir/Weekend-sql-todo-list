CREATE TABLE "todo_list" (
"id" SERIAL PRIMARY KEY,
"date" date DEFAULT CURRENT_DATE,
"priority" VARCHAR(250),
"for tomorrow" VARCHAR(250),
"completed" BOOLEAN, 
"notes" TEXT,
"other reminders" TEXT
);

INSERT INTO "todo_list" ("date", "priority", "for tomorrow", "completed", "notes", "other reminders")
VALUES ('01/21/2023', 'work', 'complete weekend challenge', 'Yes', 'reminder to complete assignment', 'none')