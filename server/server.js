const express = require("express");
const bodyParser = require("body-parser");
const { spawn } = require("child_process");
const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, () => console.log(`Listening on port ${port}`));

app.get("/test", (req, res) => {
  res.send({ express: "YOUR EXPRESS BACKEND IS CONNECTED TO REACT" });
});

app.post("/anime", (request, response) => {
  var name = request.query.name;
  // spawn new child process to call the python script
  const python = spawn("python3", ["anime.py", name]);

  python.stdout.on("data", function (data) {
    name = data.toString();
  });

  python.stderr.on("data", (data) => {
    console.error(`stderr: ${data}`);
  });

  python.on("exit", (code) => {
    console.log(`child process exited with code ${code}, ${name}`);
    response.send(name);
  });
});
