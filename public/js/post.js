const newCommentHandler = async (event) => {
  event.preventDefault();

  const postContainer = document.getElementById("post-container");
  const post_id = postContainer.getAttribute("data-id");

  const commentMessage = document
    .querySelector("#comment-message")
    .value.trim();
  const commentName = document.querySelector("#comment-name").value.trim();

  if (commentName && commentMessage) {
    const response = await fetch(`/api/comments`, {
      method: "POST",
      body: JSON.stringify({ commentName, commentMessage, post_id }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      document.location.reload();
    } else {
      alert("Failed to create comment");
    }
  }
};

const delCommentButtonHandler = async (event) => {
  console.log("______________COMMENT DELETE_________________");
  console.log(event.target.hasAttribute("data-id"));
  if (event.target.hasAttribute("data-id")) {
    const id = event.target.getAttribute("data-id");
    console.log(id);

    const response = await fetch(`/api/comments/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      document.location.reload();
    } else {
      alert("Failed to delete comment");
    }
  }
};

document
  .querySelector("#new-comment-form")
  .addEventListener("submit", (e) => newCommentHandler(e));

document
  .querySelector(".comment-list")
  .addEventListener("click", delCommentButtonHandler);
