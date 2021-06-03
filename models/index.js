const Post = require("./post");
const User = require("./user");

// associations for above
Post.belongsTo(User, {
  foreignKey: "user_id",
});
User.hasMany(Post, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

// export
module.exports = { Post, User };
