const express = require("express");
const connection = require("../config");

const router = express.Router();

//CREATE / POST A SKILL

router.post("/", (req, res) => {
  const { name } = req.body;
  const sql = "INSERT INTO project (name)  VALUES (?)";

  const newSkill = connection.query(sql, [name], (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error when you post your skill");
    }

    return connection.query(
      "SELECT * FROM skills WHERE id = ?",
      results,
      insertId,
      (err2, records) => {
        if (err2) {
          return res.status(500).json({
            error: err2.message,
            sql: err2.sql,
          });
        }
        const createSkill = records[0];
        return res.status(200).json(createSkill);
      }
    );
  });
});

// READ / GET ALL SKILLS

router.get("/", (req, res) => {
  const sql = "SELECT * FROM skills";
  connection.query(sql, (err, results) => {
    if (err) {
      res.status(500).send("Error to retrieving your projects data");
    } else {
      res.status(200).send(results);
    }
  });
});

// READ / GET SKILLS BY ID

router.get("/:id", (req, res) => {
  const sql = "SELECT * FROM skills WHERE id=?";
  connection.query(sql, [req.params.id], (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error retrieving data");
    } else {
      res.status(200).json(results);
    }
  });
});

// UPDATE / PUT SKILLS BY ID

router.put("/:id", (req, res) => {
  const isSkill = req.params.id;
  const updateSkill = req.body;
  const sql = "UPDATE projet SET ? WHERE id=?";
  connection.query(sql, [updateSkill, isSkill], (err, results) => {
    if (err) {
      res.status(500).send("Error updating a project");
    }
    return connection.query(
      "SELECT * FROM projet WHERE id = ?",
      isSkill,
      (err2, records) => {
        if (err2) {
          return res.status(500).json({
            error: err2.message,
            sql: err2.sql,
          });
        }
        const updateSkill = records[0];
        return res.status(200).json(updateSkill);
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
