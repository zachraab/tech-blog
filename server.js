const express = require("express");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello, this is a response!");
});

app.listen(PORT, () => console.log(`Now Listening on ${PORT}`));
