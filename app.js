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
  showWeather(respData);
}

function showWeather(data) {
  const cards = document.querySelector(".content");
  const cityName = data.city.name;
  const temp = data.list[0].main.temp;
  const description = data.list[0].weather[0].description;
  const iconWeather = data.list[0].weather[0].icon;

  const cardEl = document.createElement("div");
  cardEl.classList.add("card");
  cardEl.innerHTML = `
        <div class="city">
          <p>${cityName}</p>
          <p class='temperature'>${Math.round(temp)}&deg</p>
           <img src='http://openweathermap.org/img/wn/${iconWeather}@2x.png' alt='${description}'>
        </div>
        `;
  cards.append(cardEl);
}

// Поиск. Скрывает тег main
const form = document.querySelector("form");
const valueUser = document.querySelector("input");
const main = document.querySelector("main");
const searchResult = document.querySelector(".searchResult");
const menu = document.querySelector(".menu");
// const backArrow = document.querySelector(".backArrow");
// const width = window.screen.width;

//обработчик отправки формы
form.addEventListener("submit", (event) => {
  event.preventDefault();

  // if (width <= 786) {
  //   menu.classList.add("hide");
  //   // backArrow.classList.remove("hide");
  // }
  main.classList.add("hide");
  searchResult.classList.remove("hide");

  search(
    `https://api.openweathermap.org/data/2.5/forecast?q=${valueUser.value}&lang=ru&units=metric&appid=${API_KEY}`
  );

  valueUser.value = "";
});

//Скрывает и удаляет информацию по запросу пользователя при нажатии на любую кнопку из меню
const navEl = document.querySelector(".navA");

navEl.addEventListener("click", (event) => {
  main.classList.remove("hide");
  searchResult.classList.add("hide");
  searchResult.innerHTML = "";
});

//Запрос данных пользователя
async function search(url) {
  // добавить отлов ошибок и вывод их для пользователя
  const searchCity = await fetch(url);
  const dataSearchCity = await searchCity.json();
  showSearch(dataSearchCity);
}

function showSearch(data) {
  const time = data.city.sunset * 1000;
  const hours = new Date(time).getHours();
  const minutes = new Date(time).getMinutes();

  const container = document.querySelector(".searchResult");
  const infoСity = document.createElement("div");
  infoСity.classList.add("infoCity");

  infoСity.innerHTML = `
    <span class='backArrow'>
    <div class='cityName'>${data.city.name}</div>
    <div class='cityDiscription'>${data.list[0].weather[0].description}</div>
    <div class='cityTemp'>${Math.round(
      data.list[0].main.temp
    )}&deg</d><img class='cityImg' src='http://openweathermap.org/img/wn/${
    data.list[0].weather[0].icon
  }@2x.png'></div>
  <div class='cityPressure'><img src='./img/barometer.svg'>${
    data.list[0].main.pressure
  } мм.рт.ст</div>
  <div class='citySunset'>Закат в ${hours}:${minutes}</div>
  `;
  container.append(infoСity);
}

// export { city, getWeather };
