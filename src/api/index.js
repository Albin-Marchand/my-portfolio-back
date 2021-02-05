const express = require("express");

const emojis = require("./emojis");

const project = require("./projectTest");
const skills = require("./skills");
const client = require("./client");

const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    message: "API - 👋🌎🌍🌏",
  });
});

router.use("/emojis", emojis);

router.use("/project/", project);
router.use("/skills/", skills);
router.use("/client/", client);

module.exports = router;
