const express = require("express");
const connection = require("../config");

const router = express.Router();

//CREATE / POST A CLIENT

router.post("/", (req, res) => {
  const { name, city } = req.body;
  const sql = "INSERT INTO client (name, city)  VALUES (?,?)";

  const newProjet = connection.query(sql, [name, city], (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error when you post your client");
    }

    return connection.query(
      "SELECT * FROM client WHERE id = ?",
      results,
      insertId,
      (err2, records) => {
        if (err2) {
          return res.status(500).json({
            error: err2.message,
            sql: err2.sql,
          });
        }
        const createClient = records[0];
        return res.status(200).json(createClient);
      }
    );
  });
});

// READ / GET ALL CLIENTS

router.get("/", (req, res) => {
  const sql = "SELECT * FROM client";
  connection.query(sql, (err, results) => {
    if (err) {
      res.status(500).send("Error to retrieving your client data");
    } else {
      res.status(200).send(results);
    }
  });
});

// READ / GET CLIENTS BY ID

router.get("/:id", (req, res) => {
  const sql = "SELECT * FROM client WHERE id=?";
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
  const idClient = req.params.id;
  const updateClient = req.body;
  const sql = "UPDATE projet SET ? WHERE id=?";
  connection.query(sql, [updateClient, idClient], (err, results) => {
    if (err) {
      res.status(500).send("Error updating a client");
    }
    return connection.query(
      "SELECT * FROM projet WHERE id = ?",
      idClient,
      (err2, records) => {
        if (err2) {
          return res.status(500).json({
            error: err2.message,
            sql: err2.sql,
          });
        }
        const updateClient = records[0];
        return res.status(200).json(updateClient);
      }
    );
  });
});

// DELETE BY ID

router.delete("/:id", (req, res) => {
  const sql = "DELETE FROM client where id=?";
  connection.query(sql, [req.params.id], (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error to delete your client");
    } else {
      res.sendStatus(204);
    }
  });
});

module.exports = router;
