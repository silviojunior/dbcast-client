const GET_MOVIES_URL = "http://localhost:8080/movie";

function getMovies() {
  axios
    .get(GET_MOVIES_URL)
    .then((response) => {
      let movies = response.data;
      movies.forEach(function (obj) {
        renderMovieCard(obj);
      });
    })
    .catch((error) => console.error(error));
}

function renderMovieCard(movie) {
  //primeira DIV
  let card = document.createElement("div");
  card.classList.add("card", "mb-4","mx-2");
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

  //Button Related Movies
  let characters = document.createElement("div");
  characters.classList.add("card-body");

  let btnCharacters = document.createElement("a");
  btnCharacters.setAttribute("href", "#");
  btnCharacters.classList.add("btn", "btn-primary", "d-grid", "gap-2");
  btnCharacters.textContent = "Personagens";

  characters.appendChild(btnCharacters);

  card.append(cardImg, titleAndSubtitle, movieAttributes, characters);

  document.getElementById("listMovies").appendChild(card);
}