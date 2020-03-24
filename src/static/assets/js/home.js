const useBeerApi = {
  byName: search =>
    new Promise((resolve, reject) => {
      const BEER_API_URL = `https://fbhmm.sse.codesandbox.io/api/beer/name/${search}`;

      fetch(BEER_API_URL)
        .then(response => response.json())
        .then(data => resolve(data))
        .catch(err => reject(err));
    })
};

let butSearch = document.querySelector("#butSearch");
butSearch.onclick = function() {
  let searchBar = document.querySelector("#searchbar");
  useBeerApi.byName(searchBar.value).then(beer => nouvelleBiere(beer));
};

const nouvelleBiere = function(beer) {
  let tab = document.querySelector("table");
  let tr = document.createElement("tr");
  tab.appendChild(tr);

  let tdNom = document.createElement("td");
  let tdDeg = document.createElement("td");
  let tdDesc = document.createElement("td");
  tr.appendChild(tdNom);
  tr.appendChild(tdDeg);
  tr.appendChild(tdDesc);
  tdNom.appendChild(document.createTextNode(beer.name));
  tdDeg.appendChild(document.createTextNode(beer.alcohol_by_volume));
  tdDesc.appendChild(document.createTextNode(beer.brewer));
};
