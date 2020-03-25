const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const port = process.env.PORT || 3000;

const bodyParser = require("body-parser");
const database = require("./app/config/dbconfig");
let laListe = [];
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

io.on("connection", socket => {
  socket.username = "anonymous";
  socket.emit("listBeer", laListe);
  socket.on("message", msg =>
    io.emit("message", { user: socket.username, message: msg })
  );
  socket.on("join", username => {
    if (username != null) {
      socket.username = username;
    }
    socket.broadcast.emit("message", {
      user: "Server",
      message: socket.username + " viens de se connecter sur le serveur !"
    });
  });

  socket.on("newBeer", beer => {
    socket.broadcast.emit("broadcast-new", beer);
    laListe.push(beer);
  });
  socket.on("suprBiere", row => {
    socket.broadcast.emit("broadcast-supr", row);
    laListe.splice(row, 1);
  });
});
