const GET_CHARS_URL = "http://localhost:8080/character";

function getCharacters() {
  axios
    .get(GET_CHARS_URL)
    .then((response) => {
      let characters = response.data;
      characters.forEach(function (obj) {
        renderCharacterCard(obj);
      });
    })
    .catch((error) => console.error(error));
}

function renderCharacterCard(character) {
  //main DIV (Card)
  let card = document.createElement("div");
  card.classList.add("card", "mb-4", "mx-2");
  card.setAttribute("style", "width: 18rem; padding: 0;");

  //Char Image
  let charImg = document.createElement("img");
  charImg.classList.add("card-img-top");
  charImg.setAttribute("src", character.pathToImage);
  charImg.setAttribute("alt", character.name);
  charImg.setAttribute("style", "height: 180px; width: 100%");

  //Name and 'Also Know As'
  let nameAndAlsoKnowAs = document.createElement("div");
  nameAndAlsoKnowAs.classList.add("card-body");

  let name = document.createElement("h5");
  name.classList.add("card-name");

  let nameContent = document.createElement("span");
  nameContent.setAttribute("id", "name");
  nameContent.textContent = character.name;
  name.appendChild(nameContent);
  nameAndAlsoKnowAs.appendChild(name);

  let alsoKnownAs = document.createElement("p");
  alsoKnownAs.classList.add("card-text");

  let alsoKnownAsContent = document.createElement("span");
  alsoKnownAsContent.setAttribute("id", "alsoKnownAs");
  alsoKnownAsContent.textContent = character.alsoKnownAs;
  alsoKnownAs.appendChild(alsoKnownAsContent);
  nameAndAlsoKnowAs.append(alsoKnownAs);

  let characterAttributes = document.createElement("ul");
  characterAttributes.classList.add("list-group", "list-group-flush");

  //Type
  let typeLi = document.createElement("li");
  typeLi.classList.add("list-group-item");

  let typeH6 = document.createElement("h6");
  typeH6.textContent = "Tipo:";

  let typeContent = document.createElement("span");
  typeContent.setAttribute("id", "type");
  typeContent.textContent = character.type;

  typeLi.append(typeH6, typeContent);

  //Description
  let descriptionLi = document.createElement("li");
  descriptionLi.setAttribute("style", "height: 100px");
  descriptionLi.classList.add("list-group-item", "overflow-auto");

  let descriptionH6 = document.createElement("h6");
  descriptionH6.textContent = "Descrição:";

  let descriptionContent = document.createElement("span");
  descriptionContent.setAttribute("id", "description");
  descriptionContent.textContent = character.description;

  descriptionLi.append(descriptionH6, descriptionContent);

  characterAttributes.append(typeLi, descriptionLi);

  //Button Filmography
  let filmography = document.createElement("div");
  filmography.classList.add("card-body");

  let btnFilmography = document.createElement("a");
  btnFilmography.setAttribute("href", `result.html?characterId=${character.id}`);
  btnFilmography.classList.add("btn", "btn-primary", "d-grid", "gap-2");
  btnFilmography.textContent = "Filmografia";

  filmography.appendChild(btnFilmography);

  card.append(charImg, nameAndAlsoKnowAs, characterAttributes, filmography);

  document.getElementById("listChars").appendChild(card);
}

function getMovieCharacters(movieId){
  axios
  .get(GET_CHARS_URL + `/movieCharacters/${movieId}`)
  .then((response) => {
    let movies = response.data;
    movies.forEach(function (obj) {
      renderCharacterCard(obj);
    });
  })
  .catch((error) => console.error(error));
}

function getCharactersByName(name){
  axios
  .get(GET_CHARS_URL + `/byName/${name}`)
  .then((response) => {
    let movies = response.data;
    movies.forEach(function (obj) {
      renderCharacterCard(obj);
    });
  })
  .catch((error) => console.error(error));
}

function saveCharacter() {
  let fdata = new FormData();
  let nome = iptName.value;
  let tipo = iptCharacterTypes;
  let descricao = iptDescription;
  let imagem = iptCustomFileChar.files[0];

  let character = {
    name: nome,
    type: tipo.options[tipo.selectedIndex].text,
    description: descricao
  };

  let characterBody = JSON.stringify(character);

  fdata.append("character", characterBody);
  fdata.append("image", imagem);

  axios
    .post(GET_CHARS_URL, fdata)
    .then(function (response) {
      clearCharacterForm();
      let closeModal = document.getElementById("closeModal");
      closeModal.click();
    })
    .catch(function (error) {
      console.error(error);
    });
}

function clearCharacterForm() {
  iptName.value = "";
  iptCharacterTypes.value = 0;
  iptDescription.value = "";
  iptCustomFileChar.files[0] = "";
}
