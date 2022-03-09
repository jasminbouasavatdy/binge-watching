//web imdb: https://imdb-api.com/Identity/Account/ConfirmEmail?userId=c0873f32-a043-4490-8a0d-2186c973f29e&code=Q2ZESjhCMVBWRzREQW1GUHZETy92bjJCanZwNjZ0bWJmdTlCSEVJWDJ4MmNZK21kRFpCcUMrQXJJL1BzWUtpaUY1UngwRTBQVzM3aFVnSFlUc0xVMi9rOUFUczhscFlxOU1xRVhXaFR5TUdxY2Z1UUo5aEN1MVl0TGFwV09Bc1NJbW9NdGlJVHk0SmZOcEtLQXdLN0dSTTByNk14Q3FMcVpuTEg1dWFlQVEvcGZwSThSTXNta0kwRnJVeTFBT2dVRGJnMFk4eDlaUVlyd1AyYWNSNmJrclQxczZaNldUdXIyQnd1blRBV2FtWnNucis5QXJvZnJ2VkdsZmZiU3RSVmJBMmRTdz09

//apikey: k_iblvk1h1
//api omd : 9add4f79
//api omdbapi: http://www.omdbapi.com/?i=tt3896198&apikey=9add4f79
var fetchButton = document.querySelector("#fetch-button");
var omdbApi = "http://www.omdbapi.com/?i=tt3896198&apikey=9add4f79&type";

function getOmbApi() {
  fetch(omdbApi)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      //console.log(weatherData);
      //console.log("todays temp is:", weatherData.current.temp);
      for (var i = 0; i < data.length; i++) {
        var listItem = document.createElement("li");
        var linkItem = document.createElement("a");
        linkItem.textContent = data[i].html_url;
        linkItem.href = data[i].html_url;
        linkItem.target = "_blank";
        listItem.appendChild(linkItem);
        repoList.appendChild(listItem);
        console.log("link worked", data);
      }
    })
    .catch(function (err) {
      console.log(err);
    });
}
fetchButton.addEventListener("click", getOmbApi);
console.log("here");
