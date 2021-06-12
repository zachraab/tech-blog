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
    if (!commentData[0]) {
      res.json({ message: "There are currently no comments to display" });
    }
    res.json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", withAuth, async (req, res) => {
  try {
    const newComment = await Comment.create({
      name: req.body.commentName,
      comment: req.body.commentMessage,
      post_id: parseInt(req.body.post_id),
      user_id: req.session.user_id,
    });
    console.log(newComment);

    res.status(200).json(newComment);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

//udate comment content
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

// creator of post to approve comment
router.put("/approve/:id", async (req, res) => {
  try {
    // const getComment = await Comment.findOne({
    //   where: {
    //     id: req.params.id,
    //   },
    // });

    // const approvedComment = await Comment.update(
    //   { ...getComment, isApproved: req.body.approved },
    //   {
    //     where: {
    //       id: req.params.id,
    //     },
    //   }
    // );

    const updateComment = await Comment.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    console.log(req.body);

    res.status(200).json(updateComment);
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
