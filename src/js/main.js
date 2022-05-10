const url = "http://localhost:8080/actor";

function getActors() {
  axios
    .get(url)
    .then((response) => {
      renderResults.textContent = JSON.stringify(response.data);
    })
    .catch((error) => console.error(error));
}

// getActors();

function getAge(birthyear, birthmonth, birthday) {
  var currDate = new Date(),
    currYear = currDate.getFullYear(),
    currMonth = currDate.getMonth() + 1,
    currDay = currDate.getDate(),
    birthyear = +birthyear,
    birthmonth = +birthmonth,
    birthday = +birthday,
    age = currYear - birthyear;

  if (
    currMonth < birthmonth ||
    (currMonth == birthmonth && currDay < birthday)
  ) {
    age--;
  }

  return age < 0 ? 0 : age;
}

function saveCharacter() {
  var fdata = new FormData();

  let nome = document.getElementById("iptName").value;
  let tipo = document.getElementById("iptCharacterTypes");
  let descricao = document.getElementById("iptDescription").value;
  let imagem = document.getElementById("iptCustomFileChar").files[0];

  let character = {
    name: nome,
    type: tipo.options[tipo.selectedIndex].text,
    description: descricao
  };

  let characterBody = JSON.stringify(character);

  fdata.append("character", characterBody);
  fdata.append("image", imagem);

  axios
    .post(`http://localhost:8080/character`, fdata)
    .then(function (response) {
      cleanCharacterForm();
      let closeModal = document.getElementById("closeModal");
      closeModal.click();
    })
    .catch(function (error) {
      console.error(error);
    });
}

function cleanCharacterForm() {
  document.getElementById("iptName").value = "";
  document.getElementById("iptCharacterTypes").value = 0;
  document.getElementById("iptDescription").value = "";
  document.getElementById("iptCustomFileChar").files[0] = "";
}
