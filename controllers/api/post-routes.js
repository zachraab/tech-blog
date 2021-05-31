const router = require("express").Router();
const { Comment, User, Post } = require("../../models");

router.get("/", (req, res) => {
  res.send("Post Route Success");
});

module.exports = router;
