const router = require("express").Router();
const postRoutes = require("./post-routes");
const commentRoutes = require("./comment-routes");
const userRoutes = require("./user-routes");

router.use("/comment", commentRoutes);
router.use("/post", postRoutes);
router.use("/user", userRoutes);

module.exports = router;
