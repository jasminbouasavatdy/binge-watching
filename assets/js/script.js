console.log("here");

//web imdb: https://imdb-api.com/Identity/Account/ConfirmEmail?userId=c0873f32-a043-4490-8a0d-2186c973f29e&code=Q2ZESjhCMVBWRzREQW1GUHZETy92bjJCanZwNjZ0bWJmdTlCSEVJWDJ4MmNZK21kRFpCcUMrQXJJL1BzWUtpaUY1UngwRTBQVzM3aFVnSFlUc0xVMi9rOUFUczhscFlxOU1xRVhXaFR5TUdxY2Z1UUo5aEN1MVl0TGFwV09Bc1NJbW9NdGlJVHk0SmZOcEtLQXdLN0dSTTByNk14Q3FMcVpuTEg1dWFlQVEvcGZwSThSTXNta0kwRnJVeTFBT2dVRGJnMFk4eDlaUVlyd1AyYWNSNmJrclQxczZaNldUdXIyQnd1blRBV2FtWnNucis5QXJvZnJ2VkdsZmZiU3RSVmJBMmRTdz09


//api omdbapi: http://www.omdbapi.com/?i=tt3896198&apikey=9add4f79
var displayInfo = document.querySelector('#center-div')
var formEl = document.querySelector('#searching-page');
var input = document.querySelector('#input');
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
    console.log('button works!');
    console.log(input.value);
    var id = input.value;
    if (id) {
        userInput(id);
        giphySearch(id);
    } else {
        console.log('not a valid input');
    }
}

var giphySearch = function (userSearch) {
    var giphySearchURL = giphyURL + userSearch + '&limit=25&offset=0&rating=g&lang=en';
    fetch(giphySearchURL)
        .then(function (response) {
            if (response.ok)
                return response.json();
        })
        .then(function (data) {
            return console.log(data);
        })
        .catch(error => console.log('error', error));
}






































































var userInput = function (userSearch) {
    var userSearchURL = omdbURL + userSearch + '&type';
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