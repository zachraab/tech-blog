const Post = require("./post");
const User = require("./user");
const Comment = require("./comment");

// associations for above
Post.belongsTo(User, {
  foreignKey: "user_id",
});
User.hasMany(Post, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

Comment.belongsTo(Post, {
  foreignKey: "post_id",
});
Post.hasMany(Comment, {
  foreignKey: "post_id",
  onDelete: "CASCADE",
});

// export
module.exports = { Post, User, Comment };
