var cards = document.querySelector("#cards-container");
const loadingAnimation = document.querySelector("#loading-animation");

function callCharacter(characterId) {
  var params = new URLSearchParams();
  params.append("id", characterId);
  var url = "character.html?" + params.toString();
  location.href = url;
}

//For loading the characters
Pagination["Click"] = function () {
  Pagination.page = +this.innerHTML;

  Pagination.Start();

  //Loading the animation

  //Clearing the cards to load the characters upon clicking the buttons
  cards.innerHTML = "";

  //Loading characters
  loadCharacters(this);
};

function loadCharacters(thisObject) {
  axios
    .get(
      `https://gateway.marvel.com/v1/public/characters?ts=1&apikey=a6e8811c49d9724c7d703208dd9ba312&hash=be2c6ba7b0028724310f7522e2ca3071&offset=${
        (thisObject.innerHTML - 1) * 100
      }&limit=100`
    )
    .then((response) => {
      for (const item of response.data.data.results) {
        cards.innerHTML += `
                <div class="card" onclick="callCharacter(${item.id})">
                    <div class="card-image">
                        <img src="${item.thumbnail.path}/standard_large.${item.thumbnail.extension}" alt="">
                        <div class="card-name">
                            <p>${item.name}</p>
                            <p>${item.id}</p>
                        </div>
                    </div>
                </div>
                `;
      }
      loadingAnimation.innerHTML = "";
    });
}

window.onload = () => {
  //Clearing the cards to load the characters upon clicking the buttons
  cards.innerHTML = "";

  //Loading characters
  loadCharacters(this);
};
