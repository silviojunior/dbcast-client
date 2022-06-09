function searchCharacter(e){

    if(e.keyCode === 13 || e.type === 'click'){

      e.preventDefault()

      const GET_CHARS_URL = "http://localhost:8080/character";
      document.getElementById("result").innerHTML = "";
      let searchField = document.getElementById("search").value;
      let expression = new RegExp(searchField, "i");

      if (searchField != "") {
        axios
          .get(GET_CHARS_URL + `/byName/${searchField}`)
          .then((response) => {
            let characters = response.data;
            characters.forEach(function (char) {
              if (char.name.search(expression) != -1 || char.alsoKnownAs.search(expression) != -1) {
                document.getElementById("result").append(renderResult(char));
              }else{
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

    li.append(span2);

    return li;
  }