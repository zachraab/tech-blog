const router = require("express").Router();
const { Comment, User, Post } = require("../../models");

router.get("/", (req, res) => {
  res.send("User Route Success");
});

module.exports = router;
