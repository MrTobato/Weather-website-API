const API_KEY = "98f02bd00eec8d9e99322a0683912b8a";
const city = [
  "Москва",
  "Санкт-Петербург",
  "Самара",
  "Казань",
  "Нижний новгород",
];

city.forEach((city) => {
  getWeather(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&lang=ru&units=metric&appid=${API_KEY}`
  );
});

async function getWeather(url) {
  const response = await fetch(url);
  const respData = await response.json();
  showHistoryCard(respData);
  console.log(respData);
}

function showHistoryCard(data) {
  const valueUser = document.querySelector("input");
  const cardsHist = document.querySelector(".histCards");
  const cityName = data.city.name;
  const temp = data.list[0].main.temp;

  const timeNow = new Date().toLocaleTimeString().slice(0, -3);
  console.log(timeNow);

  const cardEl = document.createElement("div");
  cardEl.classList.add("cardHist");
  cardEl.innerHTML = `
    <div class='infoCity'>
        <p>${timeNow}</br>
        ${cityName}
        </p>
    </div>
    <div class='tempHist'><p>${Math.round(temp)}&deg</p></div>
  `;
  cardsHist.append(cardEl);
}
