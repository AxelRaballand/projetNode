const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const port = process.env.PORT || 3000;

const bodyParser = require("body-parser");
const database = require("./app/config/dbconfig");

process.on("exit", function(code) {
  return console.log(`About to exit with code ${code}`);
});

database.init.then(db => {
  http.listen(port, function() {
    console.log("Server listening on port : " + port);
  });

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  /* Router configuration */
  const REST_API_ROOT = "/api";
  app.use(REST_API_ROOT, require("./app/routes/router"));

  //accès aux pages statiques
  app.use(express.static(__dirname + "/static"));
});

let content = "";
function onConnection(socket) {
  console.log("connected");
  socket.emit("init-data", content);
  socket.on("on-editor-input", data => {
    console.log("on-editor-input" + data);
    content = data;
    socket.broadcast.emit("broadcast-data", data);
  });
}

io.on("connection", onConnection);
