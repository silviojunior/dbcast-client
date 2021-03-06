const CHAR_BASE_URL = "http://localhost:8080/character";

function getCharacters() {
  return axios
    .get(CHAR_BASE_URL)
    .then((response) => {
      return response.data;
    })
    .catch((error) => console.error(error));
}

function showCharacters() {
  getCharacters().then((characters) => renderAllCharacterCards(characters));
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
  charImg.setAttribute("style", "height: 180px; width: 100%;");

  //Name and 'Also Know As'
  let nameAndAlsoKnowAs = document.createElement("div");
  nameAndAlsoKnowAs.setAttribute("id", "nameAndAlsoKnownAsContainer");
  nameAndAlsoKnowAs.classList.add("card-body");

  let name = document.createElement("h3");
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
  descriptionH6.textContent = "Descri????o:";

  let descriptionContent = document.createElement("span");
  descriptionContent.setAttribute("id", "description");
  descriptionContent.textContent = character.description;

  descriptionLi.append(descriptionH6, descriptionContent);

  characterAttributes.append(typeLi, descriptionLi);

  //Actions

  const CHAR_PAGE = "/src/pages/characters.html";

  let actions = document.createElement("div");
  actions.classList.add("card-body", "row", "justify-content-around");

  let btnFilmography = document.createElement("a");
  btnFilmography.setAttribute(
    "href",
    `result.html?characterId=${character.id}`
  );
  btnFilmography.classList.add("col", "btn", "btn-primary", "mx-2");
  btnFilmography.textContent = "Filmografia";

  if (window.location.pathname == CHAR_PAGE) {
    btnFilmography.classList.remove("col");
    btnFilmography.classList.remove("mx-2");
    btnFilmography.classList.add("col-8");

    let btnEdit = document.createElement("button");
    btnEdit.setAttribute("type", "button");
    btnEdit.setAttribute("style", "max-width: 35px;");
    btnEdit.setAttribute("data-bs-toggle", "modal");
    btnEdit.setAttribute("data-bs-target", "#characterModal");
    btnEdit.setAttribute("id", "btnEditCharacter");
    btnEdit.setAttribute("onclick", `editCharacter(${character.id})`);
    btnEdit.classList.add("col", "btn", "btn-outline-warning", "btn-sm");

    let iconEdit = document.createElement("i");
    iconEdit.classList.add("fa-solid", "fa-pen");
    btnEdit.append(iconEdit);

    let btnRemove = document.createElement("button");
    btnRemove.setAttribute("type", "button");
    btnRemove.setAttribute("style", "max-width: 35px;");
    btnRemove.setAttribute("id", "btnRemoveCharacter");
    btnRemove.setAttribute("onclick", `removeCharacter(${character.id})`);
    btnRemove.classList.add("col", "btn", "btn-outline-danger", "btn-sm");

    let iconRemove = document.createElement("i");
    iconRemove.classList.add("fa-solid", "fa-trash-can");
    btnRemove.append(iconRemove);

    actions.appendChild(btnFilmography);
    actions.appendChild(btnEdit);
    actions.appendChild(btnRemove);
  } else {
    actions.appendChild(btnFilmography);
  }

  card.append(charImg, nameAndAlsoKnowAs, characterAttributes, actions);

  document.getElementById("listChars").appendChild(card);
}

function editCharacter(characterId) {
  let promiseChar = getCharacterById(characterId);
  promiseChar.then((character) => {
    fillCharacterForm(character);
  });
}

function fillCharacterForm(character) {
  iptId.value = character.id;
  iptName.value = character.name;
  iptAlsoKnownAs.value = character.alsoKnownAs;
  iptCharacterTypes.value = character.type;
  iptDescription.value = character.description;
}

function getCharacterById(characterId) {
  return axios
    .get(CHAR_BASE_URL + `/${characterId}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => console.error(error));
}

function removeCharacter(characterId) {
  deleteCharacter(characterId);
}

function clearCharacterForm(){
  iptName.value = "";
  iptCharacterTypes.value = 0;
  iptDescription.value = "";
  iptCustomFileChar.files[0] = "";
}

function updateCharacter(){
  let fdata = new FormData();

  let id = iptId.value;
  let nome = iptName.value;
  let tambemConhecidoComo = iptAlsoKnownAs.value;
  let tipo = iptCharacterTypes;
  let descricao = iptDescription.value;
  let imagem = iptCustomFileChar.files[0];

  let character = {
    id: id,
    name: nome,
    alsoKnownAs: tambemConhecidoComo,
    type: tipo.options[tipo.selectedIndex].text,
    description: descricao
  };

  let characterBody = JSON.stringify(character);

  fdata.append("character", characterBody);
  fdata.append("image", imagem);

  axios
      .put(CHAR_BASE_URL, fdata)
      .then(function () {
        clearCharacterForm();
        let closeModal = document.getElementById("closeModal");
        closeModal.click();
        location.reload(true);
      })
      .catch(function (error) {
        console.error(error);
      });
}

function deleteCharacter(characterId) {
  axios
    .delete(CHAR_BASE_URL + `/${characterId}`)
    .then(location.reload(true))
    .catch((error) => console.error(error));
}

function getMovieCharacters(movieId) {
  return axios
    .get(CHAR_BASE_URL + `/movieCharacters/${movieId}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => console.error(error));
}

function showMovieCharacters(movieId) {
  getMovieCharacters(movieId).then((characters) =>
    renderAllCharacterCards(characters)
  );
}

function getCharactersByName(name) {
  return axios
    .get(CHAR_BASE_URL + `/byName/${name}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => console.error(error));
}

function showCharacterResults(name) {
  getCharactersByName(name).then((characterList) =>
    renderAllCharacterCards(characterList)
  );
}

function renderAllCharacterCards(characters) {
  characters.forEach(function (char) {
    renderCharacterCard(char);
  });
}
