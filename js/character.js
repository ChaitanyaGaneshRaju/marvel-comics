//Getting the character id from the characters page
var params = new URLSearchParams(window.location.search);
const id = params.get("id");

function loadData(type, container,label) {
  axios
    .get(
      `https://gateway.marvel.com/v1/public/characters/${id}/${type}?ts=1&apikey=a6e8811c49d9724c7d703208dd9ba312&hash=be2c6ba7b0028724310f7522e2ca3071`
    )
    .then((response) => {
      if (response.data.data.results.length == 0) {
        container.innerHTML += `
             <p class="error-message">No ${type} available</p>
             `;
      }
      for (iterator of response.data.data.results) {
        container.innerHTML += `
                     <div class="cover">
                         <img src=${iterator.thumbnail.path}/portrait_xlarge.jpg>
                         <p>${iterator.title}</p>
                     </div>
                    `;
      }
      label.innerHTML=type[0].toUpperCase()+type.slice(1)+" Available"
    });
}

//Container elements
var characterContainer = document.getElementById("character-container");
var comicsContainer = document.getElementById("comics-container");
var seriesContainer = document.getElementById("series-container");
var eventsContainer = document.getElementById("events-container");
var storiesContainer = document.getElementById("stories-container");

//label elements
var comicsLabel=document.getElementById("comics-label")
var seriesLabel=document.getElementById("series-label")
var eventsLabel=document.getElementById("events-label")
var storiesLabel=document.getElementById("stories-label")


//Character url
const characterUrl = `https://gateway.marvel.com/v1/public/characters/${id}?ts=1&apikey=a6e8811c49d9724c7d703208dd9ba312&hash=be2c6ba7b0028724310f7522e2ca3071`;

//Fetching the character details
axios.get(characterUrl).then((response) => {
  //Checking whether description available
  //If no, printing no description
  let description = "";
  if (response.data.data.results[0].description.length == 0) {
    description = "No description available for this character";
  } else {
    description = response.data.data.results[0].description;
  }

  //Loading the character image and character details
  characterContainer.innerHTML = `
         <div id="character-image-container">
             <img id="character-image"
                 src="${response.data.data.results[0].thumbnail.path}/portrait_uncanny.${response.data.data.results[0].thumbnail.extension}" alt="">
         </div>
         <div id="character-details-container">
             <h1>${response.data.data.results[0].name}</h1>
             <h3>Id: ${response.data.data.results[0].id}</h3>
             <h4>Modified: ${response.data.data.results[0].modified}</h4>
             <p>Description: ${description}</p>
         </div>
         `;

  //Setting the background color of character container
  const colorThief = new ColorThief();
  const img = new Image();

  img.addEventListener("load", function () {
    let color = colorThief.getColor(img);
    document.getElementById(
      "character-details-container"
    ).style.backgroundImage = `linear-gradient(.25turn,black,rgb(${color[0]},${color[1]},${color[2]}))`;
  });

  img.crossOrigin = "Anonymous";
  img.src = `${response.data.data.results[0].thumbnail.path}/portrait_uncanny.${response.data.data.results[0].thumbnail.extension}`;

  //Loading the comics
  loadData("comics", comicsContainer,comicsLabel);

  //Loading the series
  loadData("series", seriesContainer,seriesLabel);

  //Loading the events
  loadData("events", eventsContainer,eventsLabel);

  //Loading the stories
  axios
    .get(
      `https://gateway.marvel.com/v1/public/characters/${id}/stories?ts=1&apikey=a6e8811c49d9724c7d703208dd9ba312&hash=be2c6ba7b0028724310f7522e2ca3071`
    )
    .then((response) => {
      if (response.data.data.results.length == 0) {
        storiesContainer.innerHTML = `
               <p class="error-message">No stories available</p>
               `;
      }
      for (iterator of response.data.data.results) {
        storiesContainer.innerHTML += `
                     <div class="cover">
                         <p>${iterator.title}</p>
                     </div>
                    `;
      }
      storiesLabel.innerHTML="Stories available"
    });

  //Removing the loading animation
  document.getElementById("loading-animation").innerHTML = "";
});
