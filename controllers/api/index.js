const router = require("express").Router();
const postRoutes = require("./post-routes");
const userRoutes = require("./user-routes");
const userRoutes = require("./comment-routes");

router.use("/posts", postRoutes);
router.use("/users", userRoutes);
router.use("/comments", userRoutes);

module.exports = router;
