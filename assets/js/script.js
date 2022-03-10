//api omdbapi: http://www.omdbapi.com/?i=tt3896198&apikey=9add4f79
var displayInfoEl = document.querySelector('#center-div');
var giphyResultsEl = document.querySelector('#aside-right');
var savedResultsEl = document.querySelector('#aside-left');
var formEl = document.querySelector('#searching-page');
var input = document.querySelector('#input');
var dropdown = document.querySelector('#format');
var searchBtn = document.getElementById('button');
// var apiKey = 'k_iblvk1h1';
var giphyApiKey = 'F3e2xxVXy3uVl11OIyTMTlFHZwmA6b8y';
var omdbApiKey = '9add4f79';
// var imdbURL = 'https://imdb-api.com/en/API/Keyword/' ;
var giphyURL = 'https://api.giphy.com/v1/gifs/random?api_key=F3e2xxVXy3uVl11OIyTMTlFHZwmA6b8y&tag=';
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
  var storedInput = JSON.parse(localStorage.getItem('binge')) || [];
  var newInput = storedInput.concat({
  input:id,
  option:format
  })
  localStorage.setItem('binge',JSON.stringify(newInput))
  history();
};

function history(){
  var storedHistory = JSON.parse(localStorage.getItem('binge')) || [];
  console.log(storedHistory);
  savedResultsEl.innerHTML = '';
  for (var searchTerm of storedHistory){
     var searchTermButton = document.createElement('button');
     var termCol = document.createElement('div');
     termCol.setAttribute('class','col-12');
     searchTermButton.style.height= "100%";
     searchTermButton.style.width= "100%";
     searchTermButton.textContent = searchTerm.input
     termCol.appendChild(searchTermButton);
     savedResultsEl.appendChild(termCol)
  }
}
history();



var giphySearch = function (userSearch) {
    var giphySearchURL = giphyURL + userSearch;
    fetch(giphySearchURL)
        .then(function (response) {
            if (response.ok)
                return response.json();
        })
        .then(function (data) {
             console.log(data);
              var newCardEl = document.createElement('div');
              var imgEl = document.createElement('img');
              imgEl.src = data.data.images.downsized.url;
              imgEl.alt = data.data.title;
              imgEl.width = 250;

              newCardEl.appendChild(imgEl);
  
              giphyResultsEl.appendChild(newCardEl);
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
    
                displayInfoEl.appendChild(cardEl);
            }
        })
        .catch(error => console.log('error', error));
}

searchBtn.addEventListener('click', handleSearchSubmit);

