const router = require("express").Router();
const { Post, Comment, User } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", (req, res) => {
  res.render("login");
});

router.get("/profile", withAuth, async (req, res) => {
  res.render("profile");
});

module.exports = router;
