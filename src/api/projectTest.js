const express = require("express");

const connection = require("../config");

const router = express.Router();

// CREATE new project

router.post("/", (req, res) => {
  const { name, description, date, duration, id_client } = req.body;
  connection.query(
    "INSERT INTO project(name, description, date, duration, id_client) VALUES(?, ?, ?, ?, ?)",
    [name, description, date, duration, id_client],
    (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error saving a project");
      } else {
        res.status(200).json(req.body);
      }
    }
  );
});

// READ all the project

router.get("/", (req, res) => {
  connection.query("SELECT * from project", (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error retrieving data");
    } else {
      res.status(200).json(results);
    }
  });
});

// READ a project entering its ID in the url

router.get("/:id", (req, res) => {
  const sql = "SELECT * from project WHERE id=?";
  connection.query(sql, [req.params.id], (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error retrieving data");
    } else {
      res.status(200).json(results);
    }
  });
});

// UPDATE a project

router.put("/:id", (req, res) => {
  const idProject = req.params.id;
  const newProject = req.body;

  connection.query(
    "UPDATE project SET ? WHERE id = ?",
    [newProject, idProject],
    (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error updating a project");
      } else {
        res.status(200).json(req.body);
      }
    }
  );
});

// DELETE a project

router.delete("/:id", (req, res) => {
  const idProject = req.params.id;
  connection.query(
    "DELETE FROM project WHERE id = ?",
    [idProject],
    (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).send("😱 Error deleting a project");
      } else {
        res.sendstatus(200);
      }
    }
  );
});

module.exports = router;
