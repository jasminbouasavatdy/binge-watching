//api omdbapi: http://www.omdbapi.com/?i=tt3896198&apikey=9add4f79
var displayInfoEl = document.querySelector("#center-div");
var giphyResultsEl = document.querySelector("#aside-right");
var clearHistoryBtnEl = document.querySelector("#clear");
var clearBtnDivEl = document.querySelector("#clearBtnDiv");
var savedResultsEl = document.querySelector("#aside-left");
var formEl = document.querySelector("#searching-page");
var searchTermEl = document.querySelector("#searchTerm");
var dropdown = document.querySelector("#format");
var searchBtn = document.getElementById("button");
var mainContentEl = document.getElementById("main-content");
var modalContainerEl = document.getElementById("modal-container");
var modalErrorMsgEl = document.getElementById("modal-text");
// var apiKey = 'k_iblvk1h1';
var giphyApiKey = "F3e2xxVXy3uVl11OIyTMTlFHZwmA6b8y";
var omdbApiKey = "9add4f79";
// var imdbURL = 'https://imdb-api.com/en/API/Keyword/' ;
var giphyURL =
  "https://api.giphy.com/v1/gifs/random?api_key=F3e2xxVXy3uVl11OIyTMTlFHZwmA6b8y&tag=";
var omdbURL = "https://www.omdbapi.com/?apikey=9add4f79&s=";
// select options dropdowns, id= type
var handleSearchSubmit = function (event) {
  event.preventDefault();

  //console.log("button works!");
  //console.log(searchTermEl.value);
  var searchTerm = searchTermEl.value;
  var format = dropdown.value;
  console.log(searchTerm, format);

  if (searchTerm && format) {
    userInput(searchTerm, format);
    giphySearch(searchTerm);
  } else {
    modalErrorMsgEl.textContent = "Please select search term and search type!";
    modalContainerEl.classList.add("show");
    mainContentEl.classList.add("hidden");

    console.log("not a valid input");
    return;
  }
  var storedInput = JSON.parse(localStorage.getItem("binge")) || [];
  // use function some to check if there is already a save item with that id and option
  if (
    !storedInput.some(
      (item) => item.searchTerm === searchTerm && item.format === format
    )
  ) {
    storedInput.push({
      searchTerm: searchTerm,
      format: format,
    });
    localStorage.setItem("binge", JSON.stringify(storedInput));
  }
  history();
};

function history() {
  //aside-left
  var storedHistory = JSON.parse(localStorage.getItem("binge")) || [];
  console.log(storedHistory);
  savedResultsEl.innerHTML = "";

  if (storedHistory.length > 0) {
    clearBtnDivEl.style.display = "block";
  } else {
    clearBtnDivEl.style.display = "none";
  }

  for (var searchItem of storedHistory) {
    clearBtnEl = document.querySelector(".col-2");
    clearBtnEl.style.display = "block";
    var searchTermButton = document.createElement("button");
    var termCol = document.createElement("div");
    termCol.setAttribute("class", "col-12");
    searchTermButton.setAttribute(
      "class",
      "btn btn-warning justify-content-center"
    );
    searchTermButton.style.height = "90%";
    searchTermButton.style.width = "90%";
    searchTermButton.textContent =
      searchItem.searchTerm + " - " + searchItem.format;
    // save the searchterm and format in data attributes to retrieve later when clicked
    searchTermButton.setAttribute("data-searchterm", searchItem.searchTerm);
    searchTermButton.setAttribute("data-format", searchItem.format);
    searchTermButton.addEventListener("click", function (event) {
      // perform a search with the searchterm and format saved on this button
      userInput(event.target.dataset.searchterm, event.target.dataset.format);
      giphySearch(event.target.dataset.searchterm);
    });
    termCol.appendChild(searchTermButton);
    savedResultsEl.appendChild(termCol);
  }
}

history();

var giphySearch = function (userSearch) {
  var giphySearchURL = giphyURL + userSearch;
  fetch(giphySearchURL)
    .then(function (response) {
      if (response.ok) return response.json();
    })
    .then(function (data) {
      console.log(data);
      giphyResultsEl.innerHTML = "";
      var newCardEl = document.createElement("div");
      var imgEl = document.createElement("img");
      imgEl.src = data.data.images.downsized.url;
      imgEl.alt = data.data.title;
      imgEl.width = 300;
      imgEl.height = 250;
      // newCardEl.innerHTML = "";
      newCardEl.appendChild(imgEl);
      giphyResultsEl.appendChild(newCardEl);

      var tvOnEl = document.querySelector("#tv");
      tvOnEl.style.display = "block";
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
      displayInfoEl.innerHTML = "";
      // if fetch request succeeded but omdb couldn't find anything then display the error
      if (result.Error) {
        modalErrorMsgEl.textContent =
          "Your result has not been found. Please try again!";
        modalContainerEl.classList.add("show");
        mainContentEl.classList.add("hidden");
      } else {
        for (var i = 0; i < 10; i++) {
          var cardEl = document.createElement("div");
          cardEl.classList.add("card", "p-3");
          var h3El = document.createElement("h2"); // title
          var typeEl = document.createElement("h3"); // type
          var yearEl = document.createElement("h3"); // year
          var savedBtn = document.createElement("button"); //saving button
          var icon = document.createElement("i");
          var cardContentEl = document.createElement("div");
          cardEl.classList.add("d-flex", "justify-content-between");
          savedBtn.setAttribute("data-title", result.Search[i].Title);
          cardContentEl.classList.add("card-content");
          h3El.textContent = "Title:" + result.Search[i].Title;
          typeEl.textContent = "Type: " + result.Search[i].Type;
          yearEl.textContent = "Year: " + result.Search[i].Year;
          savedBtn.classList.add("btn", "btn-warning");
          icon.classList.add("fa-regular", "fa-save");
          savedBtn.appendChild(icon);
          cardContentEl.appendChild(h3El);
          cardContentEl.appendChild(typeEl);
          cardContentEl.appendChild(yearEl);
          cardEl.appendChild(cardContentEl);
          cardEl.appendChild(savedBtn);
          displayInfoEl.appendChild(cardEl);
        }
      }
    })
    .catch((error) => console.log("error", error));
};

//when you click on save icon-button
clearHistoryBtnEl.addEventListener("click", function (event) {
  localStorage.setItem("binge", JSON.stringify([]));
  savedResultsEl.innerHTML = "";
  clearBtnDivEl.style.display = "none";
});

searchBtn.addEventListener("click", handleSearchSubmit);

displayInfoEl.addEventListener("click", function (event) {
  if (event.target.matches(".btn")) {
    var storedTitle = JSON.parse(localStorage.getItem("title")) || [];
    // console.log(event.target.dataset.title);
    storedTitle.push(event.target.dataset.title);
    localStorage.setItem("title", JSON.stringify(storedTitle));
  }
});

document.getElementById("closeModalBtn").addEventListener("click", () => {
  modalContainerEl.classList.remove("show");
  mainContentEl.classList.remove("hidden");
});
