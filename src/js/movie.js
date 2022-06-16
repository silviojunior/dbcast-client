const MOVIE_BASE_URL = "http://localhost:8080/movie";

function getMovies() {
  return axios
        .get(MOVIE_BASE_URL)
        .then((response) => {
          return response.data
        })
        .catch((error) => console.error(error));
}

function removeMovie(movieId){
  deleteMovie(movieId)
}

function deleteMovie(movieId){
  axios
    .delete(MOVIE_BASE_URL + `/${movieId}`)
    .then(location.reload(true))
    .catch((error) => console.error(error));
}

function showMovies(){
  getMovies().then((movies) => renderAllMovieCards(movies));
}

function renderMovieCard(movie) {
  //primeira DIV
  let card = document.createElement("div");
  card.classList.add("card", "mb-4", "mx-2");
  card.setAttribute("style", "width: 18rem; padding: 0;");

  //Movie Image
  let cardImg = document.createElement("img");
  cardImg.classList.add("card-img-top");
  cardImg.setAttribute("src", movie.pathToImage);
  cardImg.setAttribute("alt", movie.name);
  cardImg.setAttribute("style", "height: 180px; width: 100%");

  //Title and Subtitle
  let titleAndSubtitle = document.createElement("div");
  titleAndSubtitle.classList.add("card-body");

  let title = document.createElement("h5");
  title.classList.add("card-title");

  let titleContent = document.createElement("span");
  titleContent.setAttribute("id", "title");
  titleContent.textContent = movie.title;
  title.appendChild(titleContent);
  titleAndSubtitle.appendChild(title);

  let subtitle = document.createElement("p");
  subtitle.classList.add("card-text");

  let subtitleContent = document.createElement("span");
  subtitleContent.setAttribute("id", "subtitle");
  subtitleContent.textContent = movie.subtitle;
  subtitle.appendChild(subtitleContent);
  titleAndSubtitle.append(subtitle);

  let movieAttributes = document.createElement("ul");
  movieAttributes.classList.add("list-group", "list-group-flush");

  //Release Date
  let releaseDateLi = document.createElement("li");
  releaseDateLi.classList.add("list-group-item");

  let releaseDateH6 = document.createElement("h6");
  releaseDateH6.textContent = "Lançamento:";

  let releaseDateContent = document.createElement("span");
  releaseDateContent.setAttribute("id", "releaseDate");
  releaseDateContent.textContent = movie.releaseDate;

  releaseDateLi.append(releaseDateH6, releaseDateContent);

  //Direction
  let directionLi = document.createElement("li");
  directionLi.classList.add("list-group-item");

  let directionH6 = document.createElement("h6");
  directionH6.textContent = "Direção:";

  let directionContent = document.createElement("span");
  directionContent.setAttribute("id", "direction");
  directionContent.textContent = movie.direction;

  directionLi.append(directionH6, directionContent);

  //Budget
  let budgetLi = document.createElement("li");
  budgetLi.classList.add("list-group-item");

  let budgetH6 = document.createElement("h6");
  budgetH6.textContent = "Orçamento:";

  let budgetContent = document.createElement("span");
  budgetContent.setAttribute("id", "budget");
  budgetContent.textContent = movie.budget.toLocaleString("fullwide", {
    maximumFractionDigits: 2,
    style: "currency",
    currency: "USD",
    useGrouping: true
  });

  budgetLi.append(budgetH6, budgetContent);

  movieAttributes.append(releaseDateLi, directionLi, budgetLi);

  //Actions

  const MOVIE_PAGE = "/src/pages/movies.html";

  let actions = document.createElement("div");
  actions.classList.add("card-body", "row", "justify-content-around");

  let btnCharacters = document.createElement("a");
  btnCharacters.setAttribute(
    "href", 
    `result.html?movieId=${movie.id}`
  );
  btnCharacters.classList.add("col", "btn", "btn-primary", "mx-2");
  btnCharacters.textContent = "Personagens";

  if(window.location.pathname == MOVIE_PAGE){
    btnCharacters.classList.remove("col");
    btnCharacters.classList.remove("mx-2");
    btnCharacters.classList.add("col-8");
    
    let btnEdit = document.createElement("button");
    btnEdit.setAttribute("type", "button");
    btnEdit.setAttribute("style", "max-width: 35px;");
    btnEdit.setAttribute("id", "btnEditMovie");
    btnEdit.setAttribute("onclick", `searchToEdit(${movie.id})`);
    btnEdit.classList.add("col", "btn", "btn-outline-warning", "btn-sm");

    let iconEdit = document.createElement("i");
    iconEdit.classList.add("fa-solid", "fa-pen");

    btnEdit.append(iconEdit);

    let btnRemove = document.createElement("button");
    btnRemove.setAttribute("type", "button");
    btnRemove.setAttribute("style", "max-width: 35px;");
    btnRemove.setAttribute("id", "btnRemoveMovie");
    btnRemove.setAttribute("onclick", `removeMovie(${movie.id})`);
    btnRemove.classList.add("col", "btn", "btn-outline-danger", "btn-sm");

    let iconRemove = document.createElement("i");
    iconRemove.classList.add("fa-solid", "fa-trash-can");
    btnRemove.append(iconRemove);

    actions.appendChild(btnCharacters);
    actions.appendChild(btnEdit);
    actions.appendChild(btnRemove);
  }else{
    actions.appendChild(btnCharacters);
  }

  card.append(cardImg, titleAndSubtitle, movieAttributes, actions);

  document.getElementById("listMovies").appendChild(card);
}

function searchToEdit(movieId){
  window.location.replace(`register.html?movie=${movieId}`);
}

function getFilmography(characterId) {
  return axios
    .get(MOVIE_BASE_URL + `/filmography/${characterId}`)
    .then((response) => {
      return response.data
    })
    .catch((error) => console.error(error));
}

function showFilmography(characterId){
  getFilmography(characterId).then((movieList) => renderAllMovieCards(movieList));
}

function getMoviesByTitle(title) {
  return axios
        .get(MOVIE_BASE_URL + `/byTitle/${title}`)
        .then((response) => {
          return response.data;
        })
        .catch((error) => console.error(error));
}

function showMovieResults(title) {
  getMoviesByTitle(title).then((movieList) => renderAllMovieCards(movieList));
}

function renderAllMovieCards(movieList) {
  movieList.forEach(function (movie) {
    renderMovieCard(movie);
  });
}
