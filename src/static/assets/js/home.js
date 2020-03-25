"use strict";
const socket = io();
let beerList = [];
let index = 1;

const useBeerApi = {
  //on récupère une bière par son nom
  byName: search =>
    new Promise((resolve, reject) => {
      const BEER_API_URL = `https://5zqjf.sse.codesandbox.io/api/beer/name/${search}`;

      fetch(BEER_API_URL)
        .then(response => response.json())
        .then(data => resolve(data))
        .catch(err => reject(err));
    })
};

let butSearch = document.querySelector("#butSearch");
/**
 * quand on clique sur le bouton "chercher" on récupère le nom de la bière
 * de l'input texte puis on récupère la bière avec un fetch sur notre api
 */
butSearch.onclick = function() {
  console.log("here");
  let searchBar = document.querySelector("#searchbar");
  useBeerApi.byName(searchBar.value).then(beer => {
    nouvelleBiere(beer); //on ajoute la bière au tableau
    socket.emit("newBeer", beer);
    beerList.push(beer);
  });
};

//quand une bière est ajouté chez un autre client on la reçoit pour l'ajouter chez nous
socket.on("broadcast-new", beer => {
  nouvelleBiere(beer);
  beerList.push(beer);
});
//quand une bière est supprimé chez un autre client on la supprime chez nous
socket.on("broadcast-supr", beer => {
  suprBiere(beer);
  beerList.splice(beer, 1);
});

socket.on("listBeer", laListe => {
  beerList = laListe;
  laListe.forEach(function(item, index, array) {
    nouvelleBiere(item);
  });
});

/**
 * ajoute une bière au tableau
 */
const nouvelleBiere = function(beer) {
  let tab = document.querySelector("table");
  let tr = document.createElement("tr");
  tab.appendChild(tr);
  let tdNom = document.createElement("td");
  let tdDeg = document.createElement("td");
  let tdDesc = document.createElement("td");
  let tdSupr = document.createElement("td");
  tr.appendChild(tdNom);
  tr.appendChild(tdDeg);
  tr.appendChild(tdDesc);
  tr.appendChild(tdSupr);
  tdNom.appendChild(document.createTextNode(beer.name));
  tdDeg.appendChild(document.createTextNode(beer.alcohol_by_volume));
  tdDesc.appendChild(document.createTextNode(beer.brewer));
  let button = document.createElement("button");
  button.innerHTML = "X";
  button.id = index;
  tdSupr.id = index;
  index++;
  tdSupr.appendChild(button);
  button.addEventListener("click", suppression);
};

function suppression(row) {
  socket.emit("suprBiere", row.target.id);
  suprBiere(row.target.id);
}

const suprBiere = function(row) {
  let tab = document.querySelector("table");
  for (var i = 0, row; (row = tab.rows[i]); i++) {
    if (row === row.lastElementChild.id) {
      console.log(row.lastElementChild.id);
      tab.deleteRow(row);
    }
  }
  tab.deleteRow(row);
};

const app = new Vue({
  el: "#app",
  data: {
    message: "", // variable du message
    messages: [], // table de tout les messages
    username: "", //variable pour le nom de l'utilisateur
    state: 0 // variable servant  à savoir si l'utilisateur est connecté
  },
  methods: {
    sendMessage: function() {
      if (this.message !== "") {
        socket.emit("message", this.message);
        this.message = "";
      }
    },
    setUsername: function() {
      socket.emit("join", this.username);
      this.username = "";
      this.state = 1;
    }
  },
  mounted: function() {
    socket.on("message", function(message) {
      app.messages.unshift(message);
      app.$nextTick(function() {
        var messageBox = document.getElementById("chatbox");
        messageBox.scrollTop = message.scrollHeight;
      });
    });
  }
});
