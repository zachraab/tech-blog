const router = require("express").Router();
const { Comment } = require("../../models");
const withAuth = require("../../utils/auth");

router.get("/", async (req, res) => {
  try {
    // Get all comments and JOIN with post data
    const commentData = await Comment.findAll({
      // include: [
      //   {
      //     model: Post,
      //     attributes: ["name"],
      //   },
      // ],
    });

    // Serialize data so the template can read it
    // const comments = commentData.map((comment) => comment.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  console.log("comment post handler");
  console.log(req.body);
  try {
    const newComment = await Comment.create(req.body);

    res.status(200).json(newComment);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

module.exports = router;
