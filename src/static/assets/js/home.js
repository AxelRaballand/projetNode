const useBeerApi = {
  byName: search =>
    new Promise((resolve, reject) => {
      const BEER_API_URL = `https://kkpwf.sse.codesandbox.io/api/beer/name/${search}`;

      fetch(BEER_API_URL)
        .then(response => response.json())
        .then(data => resolve(data))
        .catch(err => reject(err));
    }),
  byId: search =>
    new Promise((resolve, reject) => {
      const MOVIE_API_URL = `https://www.omdbapi.com/?i=${search}&plot=full&apikey=${API_KEY}`;

      fetch(MOVIE_API_URL)
        .then(response => response.json())
        .then(data => console.log(data))
        .then(data => resolve(data))
        .catch(err => reject(err));
    })
};

let butSearch = document.querySelector("#butSearch");
butSearch.onclick = function() {
  let searchBar = document.querySelector("#searchbar");
  let text = searchBar.value;
  console.log(text);
  // useBeerApi.byName(text);
  console.log(useBeerApi.byName(text));
};
