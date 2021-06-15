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

const approveButtonHandler = async (event) => {
  event.preventDefault();
  const approveID = JSON.parse(event.target.getAttribute("data-approved"));
  const commentID = event.target.getAttribute("data-id");
  const approveSwitch = {
    isApproved: !approveID,
  };

  const response = await fetch(`/api/comments/approve/${commentID}`, {
    method: "PUT",
    body: JSON.stringify(approveSwitch),
    headers: {
      "Content-Type": "application/json",
    },
  });

  console.log(response.json());
  if (response.ok) {
    document.location.reload();
  } else {
    alert("Failed to approve comment");
  }
};

if (document.querySelector("#new-comment-form")) {
  document
    .querySelector("#new-comment-form")
    .addEventListener("submit", newCommentHandler);
}

// document
//   .querySelector("#delete-comment-btn")
//   .addEventListener("click", delCommentButtonHandler);

document
  .querySelector("#approve-btn")
  .addEventListener("click", approveButtonHandler);
