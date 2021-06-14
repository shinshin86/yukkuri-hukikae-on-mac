const express = require("express");
const path = require("path");
const process = require("process");
const yukkuri = require("./main");

const app = express();
const port = 3000;

app.use(express.static("public"));

app.get("/", async (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/talk", async (req, res) => {
  const { text, voiceType } = req.query;

  try {
    await yukkuri(text, voiceType);
    res.status(200).send("success");
  } catch (err) {
    console.error(err);
  }
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

// ctrl + c command
process.on("SIGINT", async () => {
  console.log("Server exit");
  process.exit();
});
