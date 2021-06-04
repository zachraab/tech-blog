const newFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector("#project-name").value.trim();
  const content = document.querySelector("#project-desc").value.trim();
  const commentMessage = document
    .querySelector("#comment-message")
    .value.trim();
  const commentName = document.querySelector("#comment-name").value.trim();

  if (title && content) {
    const response = await fetch(`/api/posts`, {
      method: "POST",
      body: JSON.stringify({ title, content }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      document.location.replace("/profile");
    } else {
      alert("Failed to create post");
    }
  }
};

const newCommentHandler = async (event) => {
  event.preventDefault();

  const commentMessage = document
    .querySelector("#comment-message")
    .value.trim();
  const commentName = document.querySelector("#comment-name").value.trim();

  if (commentName && commentMessage) {
    const response = await fetch(`/api/comments`, {
      method: "POST",
      body: JSON.stringify({ commentName, commentMessage }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      document.location.replace("/profile");
    } else {
      alert("Failed to create comment");
    }
  }
};

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute("data-id")) {
    const id = event.target.getAttribute("data-id");

    const response = await fetch(`/api/posts/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      document.location.replace("/profile");
    } else {
      alert("Failed to delete post");
    }
  }
};

document
  .querySelector(".new-project-form")
  .addEventListener("submit", newFormHandler);

document
  .querySelector(".new-comment-form")
  .addEventListener("submit", newCommentHandler);

document
  .querySelector(".project-list")
  .addEventListener("click", delButtonHandler);
