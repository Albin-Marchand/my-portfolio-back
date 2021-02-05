const express = require("express");
const connection = require("../config");

const router = express.Router();

//CREATE / POST A PROJECT

router.post("/", (req, res) => {
  const { name, description, date, duration, id_client } = req.body;
  const sql =
    "INSERT INTO project (name, description, date, duration, id_client)  VALUES (?,?,?,?,?)";

  const newProjet = connection.query(
    sql,
    [name, description, date, duration, id_client],
    (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error when you post your projet");
      }

      return connection.query(
        "SELECT * FROM projet WHERE id = ?",
        results,
        insertId,
        (err2, records) => {
          if (err2) {
            return res.status(500).json({
              error: err2.message,
              sql: err2.sql,
            });
          }
          const createProjet = records[0];
          return res.status(200).json(createProjet);
        }
      );
    }
  );
});

// READ / GET ALL PROJECTS

router.get("/", (req, res) => {
  const sql = "SELECT * FROM project";
  connection.query(sql, (err, results) => {
    if (err) {
      res.status(500).send("Error to retrieving your projects data");
    } else {
      res.status(200).send(results);
    }
  });
});

// READ / GET PROJECT BY ID

router.get("/:id", (req, res) => {
  const sql = "SELECT * FROM project WHERE id=?";
  connection.query(sql, [req.params.id], (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error retrieving data");
    } else {
      res.status(200).json(results);
    }
  });
});

// UPDATE / PUT PROJET BY ID

router.put("/:id", (req, res) => {
  const idProject = req.params.id;
  const updateProject = req.body;
  const sql = "UPDATE projet SET ? WHERE id=?";
  connection.query(sql, [updateProject, idProject], (err, results) => {
    if (err) {
      res.status(500).send("Error updating a project");
    }
    return connection.query(
      "SELECT * FROM projet WHERE id = ?",
      idProject,
      (err2, records) => {
        if (err2) {
          return res.status(500).json({
            error: err2.message,
            sql: err2.sql,
          });
        }
        const updateProject = records[0];
        return res.status(200).json(updateProject);
      }
    );
  });
});

// DELETE BY ID

router.delete("/:id", (req, res) => {
  const sql = "DELETE FROM projet where id=?";
  connection.query(sql, [req.params.id], (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error to delete your project");
    } else {
      res.sendStatus(204);
    }
  });
});

module.exports = router;
