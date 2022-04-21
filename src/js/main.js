const url = "http://localhost:8080/actor";

function getActors() {
  axios
    .get(url)
    .then((response) => {
      renderResults.textContent = JSON.stringify(response.data);
    })
    .catch((error) => console.error(error));
}

getActors();
