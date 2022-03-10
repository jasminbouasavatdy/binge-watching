//api omdbapi: http://www.omdbapi.com/?i=tt3896198&apikey=9add4f79

//accessing elements from html
var formEl = document.querySelector("#searching-page");
var input = document.querySelector("#input");
var searchBtn = document.getElementById("button");
var dropdown = document.querySelector("#format");

//api link components var apiKey = 'k_iblvk1h1';
var giphyApiKey = "F3e2xxVXy3uVl11OIyTMTlFHZwmA6b8y";
var omdbApiKey = "9add4f79";
var giphyURL =
  "https://api.giphy.com/v1/gifs/search?api_key=F3e2xxVXy3uVl11OIyTMTlFHZwmA6b8y&q=";
var omdbURL = "http://www.omdbapi.com/?apikey=9add4f79&s=";

var handleSearchSubmit = function (event) {
  event.preventDefault();
  //console.log("button works!");
  //console.log(input.value);
  var id = input.value;
  var format = dropdown.value;
  console.log(format);
  if (id && format) {
    userInput(id, format);
    giphySearch(id);
  } else {
    console.log("not a valid input"); //create a modal window
  }
};

var giphySearch = function (userSearch) {
  var giphySearchURL =
    giphyURL + userSearch + "&limit=25&offset=0&rating=g&lang=en";
  fetch(giphySearchURL)
    .then(function (response) {
      if (response.ok) return response.json();
    })
    .then(function (data) {
      console.log(data);
    })
    .catch((error) => console.log("error", error));
};

var userInput = function (userSearch, movieType) {
  var userSearchURL = omdbURL + userSearch + "&type=" + movieType;
  console.log(userSearchURL);
  fetch(userSearchURL)
    .then(function (response) {
      if (response.ok) return response.json();
    })
    .then(function (result) {
      console.log(result);
    })
    .catch((error) => console.log("error", error));
};

var selectMovieEl = document.querySelector;
searchBtn.addEventListener("click", handleSearchSubmit);
