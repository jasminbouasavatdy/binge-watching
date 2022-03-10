//api omdbapi: http://www.omdbapi.com/?i=tt3896198&apikey=9add4f79
var displayInfo = document.querySelector('#center-div');
var giphyResults = document.querySelector('#aside-right');
var formEl = document.querySelector('#searching-page');
var input = document.querySelector('#input');
var dropdown = document.querySelector('#format');
var searchBtn = document.getElementById('button');
// var apiKey = 'k_iblvk1h1';
var giphyApiKey = 'F3e2xxVXy3uVl11OIyTMTlFHZwmA6b8y';
var omdbApiKey = '9add4f79';
// var imdbURL = 'https://imdb-api.com/en/API/Keyword/' ;
var giphyURL = 'https://api.giphy.com/v1/gifs/search?api_key=F3e2xxVXy3uVl11OIyTMTlFHZwmA6b8y&q=';
var omdbURL = 'http://www.omdbapi.com/?apikey=9add4f79&s='

// input = user search id=input
// select options dropdowns, id= type
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
    var giphySearchURL = giphyURL + userSearch + '&limit=25&offset=0&rating=g&lang=en';
    fetch(giphySearchURL)
        .then(function (response) {
            if (response.ok)
                return response.json();
        })
        .then(function (data) {
             console.log(data);
             for(var i = 0; i < 5; i++){
                
              var newCardEl = document.createElement('div')
              var imgEl = document.createElement('img');
              imgEl.src = data.data[i].images['480w_still'].url;
              imgEl.width = 480;

              newCardEl.appendChild(imgEl);
  
              giphyResults.appendChild(newCardEl);
             }
        })
        .catch(error => console.log('error', error));
}

var userInput = function (userSearch, movieType) {
    var userSearchURL = omdbURL + userSearch + '&type' + movieType;
    // console.log(userSearchURL);
    fetch(userSearchURL)
        .then(function (response) {
            if (response.ok)
                return response.json();
        })
        .then(function (result) {
            console.log(result);
            for(var i = 0; i < 10; i++){
                
                var cardEl = document.createElement('div')
                var h3El = document.createElement('h2') // title
                var typeEl = document.createElement('h3')// type
                var yearEl = document.createElement('h3') // year
                h3El.textContent = 'Title:' + result.Search[i].Title;
                typeEl.textContent = 'Type: ' + result.Search[i].Type;
                yearEl.textContent = 'Year: ' + result.Search[i].Year;
    
                cardEl.appendChild(h3El);
                cardEl.appendChild(typeEl);
                cardEl.appendChild(yearEl);
    
                displayInfo.appendChild(cardEl);
            }
        })
        .catch(error => console.log('error', error));
}

searchBtn.addEventListener('click', handleSearchSubmit);

