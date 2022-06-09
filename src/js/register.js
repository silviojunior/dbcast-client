function searchCharacter(e) {
  if (e.keyCode === 13 || e.type === "click") {
    e.preventDefault();

    const GET_CHARS_URL = "http://localhost:8080/character";
    document.getElementById("result").innerHTML = "";
    let searchField = document.getElementById("searchField").value;
    let expression = new RegExp(searchField, "i");

    if (searchField != "") {
      axios
        .get(GET_CHARS_URL + `/byName/${searchField}`)
        .then((response) => {
          let characters = response.data;
          characters.forEach(function (char) {
            if (
              char.name.search(expression) != -1 ||
              char.alsoKnownAs.search(expression) != -1
            ) {
              document.getElementById("result").append(renderResult(char));
            } else {
              return;
            }
          });
        })
        .catch((error) => console.error(error));
    }
  }
}

function renderResult(obj) {
  let li = document.createElement("li");
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
  warning.setAttribute("style", "font-size: 0.9rem;")
  warning.classList.add("ms-5","text-danger", "fw-lighter", "fst-italic");

  li.append(span2);

  li.addEventListener("click", function(event){
    event.preventDefault()

    if(event.type == "click"){
      let tr = document.getElementById("selectedChars")
      if(!characterSelected(tr, obj)){
        selectCharacter(obj)
      }else{
        warning.textContent = "Personagem já selecionado!";
        li.append(warning)
      }
    }
  })
  
  return li;
}

function characterSelected(tr, char){
  let listSize = tr.childNodes.length - 1;
  for(let i = 1; i <= listSize; i++){
    let charId = parseInt(tr.childNodes[i].firstChild.innerHTML, 10)
    if(charId == char.id){
      return true;
    }
  }
  return false;
}

function clearResultList(e) {

  let searchField = document.getElementById("searchField");
  let resultList = document.getElementById("result");

  searchField.value = "";
  resultList.innerHTML = "";
}

function selectCharacter(char){
  let listSelectedChars = document.getElementById("listSelectedChars")
  let selectedChars = document.getElementById("selectedChars")

  let tr = document.createElement("tr")
  let th = document.createElement("th")
  th.classList.add("ps-1", "px-1")
  th.setAttribute("id", "celId")
  th.setAttribute("scope", "row")
  th.textContent = char.id
  
  tr.append(th)

  let tdName = document.createElement("td")
  tdName.classList.add("ps-1", "px-1")
  tdName.setAttribute("id", "celName")
  tdName.textContent = char.name

  let tdType = document.createElement("td")
  tdType.classList.add("ps-1", "px-1")
  tdType.setAttribute("id", "celType")
  tdType.textContent = char.type
  
  let tdRemove = document.createElement("td")

  let btnTrash = document.createElement("a")
  btnTrash.setAttribute("style", "cursor: pointer; text-decoration: none; padding: 5px;")
  let trashIcon = document.createElement("i")
  trashIcon.classList.add("fa-solid", "fa-trash-can")

  btnTrash.append(trashIcon)

  btnTrash.addEventListener("click", function(){
    removeSelectedChar(this)
  })

  tdRemove.append(btnTrash)

  tr.append(tdName,tdType, tdRemove)

  selectedChars.append(tr)
  listSelectedChars.classList.remove("d-none")
  clearResultList()

}

function removeSelectedChar(r){
  
  let i = r.parentNode.parentNode.rowIndex;
  let selectedChars = document.getElementById("selectedChars")
  let tableChars = document.getElementById("tableChars")
  let listSelectedChars = document.getElementById("listSelectedChars")

  let hideChars = i == 1 && selectedChars.childNodes.length == 2;

  tableChars.deleteRow(i);

  if(hideChars){
    listSelectedChars.classList.add("d-none")
  }
}

window.onload = function () {
  document.getElementById("searchField").addEventListener("search", function (event) {
    clearResultList(event);
  });
}