/** MOVIE **/
const MOVIE_BASE_URL = "http://localhost:8080/movie";

function saveMovie() {
  let fdata = new FormData();

  let _title = iptTitle.value;
  let _subtitle = iptSubtitle.value;
  let _releaseDate = iptReleaseDate.value;
  let _direction = iptDirection.value;
  let _budget = iptBudget.value;
  let _image = iptCustomFile.files[0];

  let movie = {
    title: _title,
    subtitle: _subtitle,
    releaseDate: _releaseDate,
    direction: _direction,
    budget: _budget,
    characters: getListStoredChars()
  };

  let movieBody = JSON.stringify(movie);

  fdata.append("movie", movieBody);
  fdata.append("image", _image);

  axios
    .post(MOVIE_BASE_URL, fdata)
    .then(function (response) {
      if (response.status >= 200 && response.status < 300) {
        window.location.replace("index.html");
      }
    })
    .catch(function (error) {
      console.error(error);
    });
}

/** CHARACTER **/
const CHAR_BASE_URL = "http://localhost:8080/character";

function searchCharacter(e) {
  if (e.keyCode === 13 || e.type === "click") {
    e.preventDefault();

    document.getElementById("result").innerHTML = "";
    let searchField = document.getElementById("searchField").value;
    let expression = new RegExp(searchField, "i");

    if (searchField != "") {
      axios
        .get(CHAR_BASE_URL + `/byName/${searchField}`)
        .then((response) => {
          let characters = response.data;
          characters.forEach(function (char) {
            if (
              char.name.search(expression) != -1 ||
              char.alsoKnownAs.search(expression) != -1
            ) {
              document.getElementById("result").append(renderCharFound(char));
            } else {
              return;
            }
          });
        })
        .catch((error) => console.error(error));
    }
  }
}

function renderCharFound(obj) {
  let li = document.createElement("li");
  li.setAttribute("style", "cursor: pointer;");
  li.classList.add("list-group-item", "link-class");

  let img = document.createElement("img");
  img.classList.add("img-thumbnail");
  img.setAttribute("src", obj.pathToImage);
  img.setAttribute("style", "height: 40px; width: 50px; margin-right: 15px;");

  li.append(img);

  let span = document.createElement("span");
  span.textContent = obj.name + " | ";

  li.append(span);

  let span2 = document.createElement("span");
  span2.classList.add("text-muted");
  span2.textContent = obj.type;

  let warning = document.createElement("span");
  warning.setAttribute("style", "font-size: 0.9rem;");
  warning.classList.add("ms-5", "text-danger", "fw-lighter", "fst-italic");

  li.append(span2);

  li.addEventListener("click", function (event) {
    let textResponse = setListSelectedChars(event, obj);
    warning.textContent = textResponse;
  });

  li.append(warning);

  return li;
}

function setListSelectedChars(event, obj) {
  event.preventDefault();

  if (event.type == "click") {
    let tr = document.getElementById("selectedChars");
    if (!characterSelected(tr, obj)) {
      selectCharacter(obj);
      clearStoredCharList();
      storeCharacter(obj);
    } else {
      return "Personagem já selecionado!";
    }
  }
}

function storeCharacter(char) {
  let charStringfied = JSON.stringify(char);
  let characterList = localStorage.getItem("characterList");
  let charToBeStored = "";

  if (characterList == null) {
    charToBeStored = "[" + charStringfied + "]";
  } else {
    charToBeStored = characterList.substring(0, characterList.length - 1);
    charToBeStored += "," + charStringfied + "]";
  }

  localStorage.removeItem("characterList");
  localStorage.setItem("characterList", charToBeStored);
}

function getListStoredChars() {
  let storedChars = localStorage.getItem("characterList");
  let listStoredChars = JSON.parse(storedChars);

  return listStoredChars;
}

function removeStoredCharacter(charId) {
  let listStoredChars = getListStoredChars();
  let charToBeRemoved = getCharToBeRemoved(listStoredChars, charId);

  let newCharList = listStoredChars.filter(function (strdChar) {
    return strdChar != charToBeRemoved;
  });

  storeCharacterList(newCharList);
}

function getCharToBeRemoved(listStoredChars, charToBeRemovedId) {
  for (let char of listStoredChars) {
    if (char.id == charToBeRemovedId) {
      return char;
    }
  }
}

function storeCharacterList(characterList) {
  let listToBeStored = JSON.stringify(characterList);

  localStorage.removeItem("characterList");
  localStorage.setItem("characterList", listToBeStored);
}

function characterSelected(tr, char) {
  let listSize = tr.childNodes.length - 1;
  for (let i = 1; i <= listSize; i++) {
    let charId = parseInt(tr.childNodes[i].firstChild.innerHTML, 10);
    if (charId == char.id) {
      return true;
    }
  }
  return false;
}

function clearCharSearchResultList() {
  let searchField = document.getElementById("searchField");
  let resultList = document.getElementById("result");

  searchField.value = "";
  resultList.innerHTML = "";
}

function selectCharacter(char) {
  let listSelectedChars = document.getElementById("listSelectedChars");
  let selectedChars = document.getElementById("selectedChars");

  let tr = document.createElement("tr");
  let th = document.createElement("th");
  th.classList.add("ps-1", "px-1");
  th.setAttribute("id", "celId");
  th.setAttribute("scope", "row");
  th.textContent = char.id;

  tr.append(th);

  let tdName = document.createElement("td");
  tdName.classList.add("ps-1", "px-1");
  tdName.setAttribute("id", "celName");
  tdName.textContent = char.name;

  let tdType = document.createElement("td");
  tdType.classList.add("ps-1", "px-1");
  tdType.setAttribute("id", "celType");
  tdType.textContent = char.type;

  let tdRemove = document.createElement("td");

  let btnTrash = document.createElement("a");
  btnTrash.setAttribute(
    "style",
    "cursor: pointer; text-decoration: none; padding: 5px;"
  );
  let trashIcon = document.createElement("i");
  trashIcon.classList.add("fa-solid", "fa-trash-can");

  btnTrash.append(trashIcon);

  btnTrash.addEventListener("click", function () {
    removeSelectedChar(this);
    removeStoredCharacter(char.id);
  });

  tdRemove.append(btnTrash);

  tr.append(tdName, tdType, tdRemove);

  selectedChars.append(tr);
  listSelectedChars.classList.remove("d-none");
  clearCharSearchResultList();
}

function removeSelectedChar(r) {
  let i = r.parentNode.parentNode.rowIndex;
  let selectedChars = document.getElementById("selectedChars");
  let tableChars = document.getElementById("tableChars");
  let listSelectedChars = document.getElementById("listSelectedChars");
  
  tableChars.deleteRow(i);

  let hideChars = i == 1 && selectedChars.children.length == 0;

  if (hideChars) {
    listSelectedChars.classList.add("d-none");
  }
}

function clearStoredCharList() {
  localStorage.removeItem("characterList");
}

function saveCharacter() {
  let fdata = new FormData();
  let nome = iptName.value;
  let tambemConhecidaComo = iptAlsoKnownAs.value;
  let tipo = iptCharacterTypes;
  let descricao = iptDescription.value;
  let imagem = iptCustomFileChar.files[0];

  let character = {
    name: nome,
    alsoKnownAs: tambemConhecidaComo,
    type: tipo.options[tipo.selectedIndex].text,
    description: descricao
  };

  let characterBody = JSON.stringify(character);

  fdata.append("character", characterBody);
  fdata.append("image", imagem);

  axios
    .post(CHAR_BASE_URL, fdata)
    .then(function () {
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

window.onload = function () {
  document
    .getElementById("searchField")
    .addEventListener("search", function (event) {
      clearCharSearchResultList();
    });
  clearStoredCharList();
};
