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
