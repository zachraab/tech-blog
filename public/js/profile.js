const newFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector("#project-name").value.trim();
  const content = document.querySelector("#project-desc").value.trim();
  const emoji = document.querySelector("#post-emoji").value;
  const image = document.querySelector("#post-image").value.trim();
  const allow_comments = document.querySelector("#post-allow-comments").checked;
  console.log(allow_comments);

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

if (document.querySelector(".project-list")) {
  document
    .querySelector(".project-list")
    .addEventListener("click", delButtonHandler);
}

document
  .querySelector("#delete-user-btn")
  .addEventListener("click", delUserButtonHandler);

// When user click's on note title, show the note, and allow for updates
// $(document).on("click", ".dataTitle", function() {
//   // Grab the element
//   var selected = $(this);
//   // Make an ajax call to find the note
//   // This uses the data-id of the p-tag, which is linked to the specific note
//   $.ajax({
//     type: "GET",
//     url: "/find/" + selected.attr("data-id"),
//     success: function(data) {
//       // Fill the inputs with the data that the ajax call collected
//       $("#note").val(data.note);
//       $("#title").val(data.title);
//       // Make the #action-button an update button, so user can
//       // Update the note s/he chooses
//       $("#action-button").html("<button id='updater' data-id='" + data._id + "'>Update</button>");
//     }
//   });
// });

// // When user click's update button, update the specific note
// $(document).on("click", "#updater", function() {
//   // Save the selected element
//   var selected = $(this);
//   // Make an AJAX POST request
//   // This uses the data-id of the update button,
//   // which is linked to the specific note title
//   // that the user clicked before
//   $.ajax({
//     type: "POST",
//     url: "/update/" + selected.attr("data-id"),
//     dataType: "json",
//     data: {
//       title: $("#title").val(),
//       note: $("#note").val()
//     },
//     // On successful call
//     success: function(data) {
//       // Clear the inputs
//       $("#note").val("");
//       $("#title").val("");
//       // Revert action button to submit
//       $("#action-button").html("<button id='make-new'>Submit</button>");
//       // Grab the results from the db again, to populate the DOM
//       getResults();
//     }
//   });
// });

// 3. Retrieve one note in the database's collection
// app.get("/find/:id", (req, res) => {
//   db.notes.findOne({ _id: mongojs.ObjectId(req.params.id) }, (err, data) => {
//     if (err) {
//       console.log(err);
//     } else {
//       res.send(data);
//     }
//   });
// });
// // 4. Update one note in the database's collection
// app.post("/update/:id", (req, res) => {
//   db.notes.update(
//     { _id: mongojs.ObjectId(req.params.id) },
//     { $set: req.body },
//     (err, data) => {
//       if (err) {
//         console.log(err);
//       } else {
//         res.send(data);
//       }
//     }
//   );
// });
