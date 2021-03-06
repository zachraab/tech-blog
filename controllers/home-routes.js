const router = require("express").Router();
const { Post, User, Comment } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
  try {
    // Get all posts and JOIN with user data
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ["name"],
        },
      ],
    });
    // Serialize data so the template can read it
    const posts = postData.map((post) => post.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render("homepage", {
      posts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/posts/:id", async (req, res) => {
  try {
    //find the post
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["name"],
        },
      ],
    });
    // find all associated comments
    const commentData = await Comment.findAll({
      where: {
        post_id: req.params.id,
      },
    });

    const post = postData.get({ plain: true });
    const commentArray = commentData.map((comment) =>
      comment.get({ plain: true })
    );
    const comment = commentArray.map((comment) => ({
      ...comment,
      //check if current user is the same as the post creator and log boolean
      owner: req.session.user_id == post.user_id,
    }));

    // If logged in, grab username to autofill comment form
    const grabUserName = async () => {
      if (req.session.logged_in) {
        const userData = await User.findByPk(req.session.user_id);
        const userName = userData.name;
        return userName;
      } else {
        return "Guest User";
      }
    };

    // console.log(post);
    res.render("post", {
      ...post,
      comment,
      userName: await grabUserName(),
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get("/profile", withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
      include: [{ model: Post }],
    });

    const user = userData.get({ plain: true });

    res.render("profile", {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect("/profile");
    return;
  }

  res.render("login");
});

module.exports = router;
