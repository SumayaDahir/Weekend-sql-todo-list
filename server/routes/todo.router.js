
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

  module.exports = router;