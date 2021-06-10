const router = require("express").Router();
const { Comment, Post, User } = require("../../models");
const withAuth = require("../../utils/auth");

router.get("/", async (req, res) => {
  try {
    // Get all comments and JOIN with post data
    const commentData = await Comment.findAll({
      include: [
        {
          model: Post,
          attributes: ["title", "content"],
        },
        {
          model: User,
          attributes: ["name", "email"],
        },
      ],
    });

    res.json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", withAuth, async (req, res) => {
  try {
    const newComment = await Comment.create({
      comment: req.body.commentMessage,
      post_id: req.body.post_id,
      user_id: req.session.user_id,
    });
    console.log(newComment);

    res.status(200).json(newComment);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updatedComment = await Comment.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(updatedComment);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedComment = await Comment.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(deletedComment);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

module.exports = router;
