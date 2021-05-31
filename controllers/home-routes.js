const router = require("express").Router();
const { Post, Comment, User } = require("../models");

router.get("/", (req, res) => {
  res.send("Home Route Success");
});

module.exports = router;
