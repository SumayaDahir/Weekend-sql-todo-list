const express = require("express");
const router = express.Router();
const pool = require("../modules/pool");

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
  const date = req.body.date;
  const priority = req.body.priority;
  const completed = req.body.completed;
  const notes = req.body.notes;
  const appointments = req.body.appointments;

  if (!date || !priority || !completed || !notes || !appointments) {
    const errorMessage = "error message";
    console.log(errorMessage);
    res.status(400).send(errorMessage);
  }

  const queryText = `
    INSERT INTO "to_do_list" ("date", "priority", "completed", "notes", "appointments" )
    VALUES ($1, $2, $3, $4, $5);`;

  pool
    .query(queryText, [date, priority, completed, notes, appointments])
    .then((response) => {
      res.sendStatus(201);
    })
    .catch((error) => {
      console.log(`error ${queryText}`, error);
      res.sendStatus(500);
    });
});

module.exports = router;
