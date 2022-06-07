const image = document.getElementById("image");
const explanation = document.getElementById("explanation");
const title = document.getElementById("title");

const btnSendDate = document.getElementById("captureDate");

btnSendDate.addEventListener("click", captureDate);

const hoje = new Date();
const ano = hoje.getFullYear();
const mes = hoje.getMonth();
const dia = hoje.getDate();

const today = "" + ano + "-" + mes + "-" + dia + "";
handleDate(today);
function handleDate(date) {
  fetch(
    "https://api.nasa.gov/planetary/apod?api_key=v0XTaBOwQbptsvkOYsOIdYo7YrJn0fsDhBj8horV&start_date=" +
      date +
      "&end_date=" +
      date
  )
    .then((response) => response.json())
    .then((infoDate) => {
      title.innerHTML = infoDate[0].title;
      explanation.innerHTML = "Description: " + infoDate[0].explanation;
      image.src = infoDate[0].url;
    });
    
}

function captureDate() {
  let date = document.querySelector("#dateinput").value;
  handleDate(date);
}
