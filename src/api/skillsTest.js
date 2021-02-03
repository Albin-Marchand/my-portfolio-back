const express = require("express");

const connection = require("../config");

const router = express.Router();

// CREATE new skill

router.post("/", (req, res) => {
  const { name } = req.body;
  connection.query(
    "INSERT INTO skills(name) VALUES(?)",
    [name],
    (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error saving a skill");
      } else {
        res.status(200).json(req.body);
      }
    }
  );
});

// READ all the skill

router.get("/", (req, res) => {
  connection.query("SELECT * from skills", (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error retrieving data");
    } else {
      res.status(200).json(results);
    }
  });
});

// READ a skill entering its ID in the url

router.get("/:id", (req, res) => {
  const sql = "SELECT * from skills WHERE id=?";
  connection.query(sql, [req.params.id], (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error retrieving data");
    } else {
      res.status(200).json(results);
    }
  });
});

// UPDATE a skill

router.put("/:id", (req, res) => {
  const idSkill = req.params.id;
  const newSkill = req.body;

  connection.query(
    "UPDATE skills SET ? WHERE id = ?",
    [idSkill, newSkill],
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

// DELETE a skill
router.delete("/:id", (req, res) => {
  const idSkill = req.params.id;
  connection.query(
    "DELETE FROM skills WHERE id = ?",
    [idSkill],
    (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).send("😱 Error deleting a client");
      } else {
        res.sendstatus(200);
      }
    }
  );
});

module.exports = router;
