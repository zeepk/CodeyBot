import express from "express";
import path from "path";

const app = express();

app.use(express.static(path.join(__dirname, "client", "build")));

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(3000, () => {
  console.log("The application is listening on port 3000!");
});
