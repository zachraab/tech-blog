const newFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector("#project-name").value.trim();
  const content = document.querySelector("#project-desc").value.trim();
  const emoji = document.querySelector("#post-emoji").value;
  const image = document.querySelector("#post-image").value.trim();
  const allow_comments = document.querySelector("#post-allow-comments").checked;

  if (title && content) {
    const response = await fetch(`/api/posts`, {
      method: "POST",
      body: JSON.stringify({ title, content, image, emoji, allow_comments }),
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

const delUserButtonHandler = async (event) => {
  let verifyDelete = confirm(
    "Are you sure you would like to delete your profile?"
  );
  if (event.target.hasAttribute("data-id") && verifyDelete) {
    const id = event.target.getAttribute("data-id");
    console.log(id);

    const response = await fetch(`/api/users/${id}`, {
      method: "DELETE",
    });

    await fetch("/api/users/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/");
    } else {
      alert("Failed to delete user");
    }
  } else {
    alert("Deletion aborted");
  }
};

document
  .querySelector(".new-project-form")
  .addEventListener("submit", newFormHandler);

// document
//   .querySelector(".project-list")
//   .addEventListener("click", delButtonHandler);

document
  .querySelector("#delete-user-btn")
  .addEventListener("click", delUserButtonHandler);
