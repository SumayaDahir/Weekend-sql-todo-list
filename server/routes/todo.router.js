const express = require("express");
const router = express.Router();
const pool = require("../modules/pool");

//get 
router.get("/todo", (req, res) => {
  console.log("in todo GET");
  const queryText = `SELECT * FROM "to_do_list";`;

  pool
    .query(queryText)
    .then((result) => {
      console.log("successful select from database");
      res.send(result.rows);
    })
    .catch((error) => {
      console.log(`error ${queryText}`, error);
      res.sendStatus(505);
    });
});

//post

router.post("/todo", (req, res) => {
  console.log("in post", req.body);
  const new_task = req.body.new_task;
  const date = req.body.date;
  const completed = req.body.completed;
  const notes = req.body.notes;
  const appointments = req.body.appointments;

  if (!new_task || !date || !completed || !notes || !appointments) {
    const errorMessage = "error message";
    console.log(errorMessage);
    res.status(400).send(errorMessage);
  }

  const queryText = `
    INSERT INTO "to_do_list" ("new_task", "date" , "completed", "notes", "appointments" )
    VALUES ($1, $2, $3, $4, $5);`;

  pool
    .query(queryText, [new_task, date, completed, notes, appointments])
    .then((response) => {
      res.sendStatus(201);
    })
    .catch((error) => {
      console.log(`error ${queryText}`, error);
      res.sendStatus(500);
    });
});

//put router fo completed tasks
router.put("/completed/:id", (req, res) => {
  const id = req.params.id;
  console.log("in put route");
  const queryText = `UPDATE "to_do_list" SET "completed" = 'TRUE' WHERE "id" = $1`;
  pool
    .query(queryText, [id])
    .then(() => {
      console.log("success! you updated your task!", id);
      res.sendStatus(204);
    })
    .catch((error) => {
      console.log(`Error failed to update task`, error);
      res.sendStatus(500);
    });
});


//delete task from database
router.delete("/:id", (req, res) => {
  const id = req.params.id;
  console.log("in DELETE route");
  const queryText = `DELETE FROM "to_do_list" WHERE "id" = $1;`;
    pool
    .query(queryText, [id])
    .then(() => {
      console.log("success! you removed your task!", id);
      res.sendStatus(204);
    })
    .catch((error) => {
      console.log(`Error deleting new task`, error);
      res.sendStatus(500);
    });
});

module.exports = router;
