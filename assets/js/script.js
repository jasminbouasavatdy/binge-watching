console.log("here");

//web imdb: https://imdb-api.com/Identity/Account/ConfirmEmail?userId=c0873f32-a043-4490-8a0d-2186c973f29e&code=Q2ZESjhCMVBWRzREQW1GUHZETy92bjJCanZwNjZ0bWJmdTlCSEVJWDJ4MmNZK21kRFpCcUMrQXJJL1BzWUtpaUY1UngwRTBQVzM3aFVnSFlUc0xVMi9rOUFUczhscFlxOU1xRVhXaFR5TUdxY2Z1UUo5aEN1MVl0TGFwV09Bc1NJbW9NdGlJVHk0SmZOcEtLQXdLN0dSTTByNk14Q3FMcVpuTEg1dWFlQVEvcGZwSThSTXNta0kwRnJVeTFBT2dVRGJnMFk4eDlaUVlyd1AyYWNSNmJrclQxczZaNldUdXIyQnd1blRBV2FtWnNucis5QXJvZnJ2VkdsZmZiU3RSVmJBMmRTdz09


//api omdbapi: http://www.omdbapi.com/?i=tt3896198&apikey=9add4f79
var formEl = document.querySelector('#searching-page');
var input = document.querySelector('#input');
var searchBtn = document.getElementById('button');
var apiKey = 'k_iblvk1h1';

var imdbURL = 'https://imdb-api.com/en/API/Keyword/' ;


var handleSearchSubmit = function(event){
    event.preventDefault();
    console.log('button works!');
    console.log(input.value);
    var id = input.value;
    if(id){
        userInput(id);
    } else {
        console.log('not a valid input');
    }
}




var userInput = function(userSearch){
    var userSearchURL = imdbURL + apiKey +'/' + userSearch;
    // console.log(userSearchURL);
    fetch(userSearchURL)
    .then(function (response) {
        if(response.ok)
        return response.json();
    })
    .then(function (result) {
        return console.log(result);
    })
    .catch(error => console.log('error', error));
}




searchBtn.addEventListener('click',handleSearchSubmit);S