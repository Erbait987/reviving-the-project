// PHONE CHECKER

const phoneInput = document.querySelector("#phone_input");
const phoneButton = document.querySelector("#phone_button");
const phoneResult = document.querySelector("#phone_result");

const regExp = /^\+996 [2579]\d{2} \d{2}-\d{2}-\d{2}$/;

phoneButton.addEventListener("click", () => {
  if (regExp.test(phoneInput.value)) {
    phoneResult.innerHTML = "OK";
    phoneResult.style.color = "green";
  } else {
    phoneResult.innerHTML = "not OK";
    phoneResult.style.color = "red";
  }
});

// TAB SLIDER

const tabContent = document.querySelectorAll(".tab_content_block");
const tabs = document.querySelectorAll(".tab_content_item");
const tabsParent = document.querySelector(".tab_content_items");

const hideTabContent = () => {
  tabContent.forEach((block) => {
    block.style.display = "none";
  });
  tabs.forEach((tabItem) => {
    tabItem.classList.remove("tab_content_item_active");
  });
};

const showTabContent = (indexElement = 0) => {
  tabContent[indexElement].style.display = "block";
  tabs[indexElement].classList.add("tab_content_item_active");
};

let flag = 0;
let lastFlag = tabs.length;
let autoSlideInterval;
function autoSlide(i = 0) {
  autoSlideInterval = setInterval(() => {
    i++;
    if (i > lastFlag - 1) {
      i = 0;
    }
    hideTabContent();
    showTabContent(i);
  }, 3000);
}

hideTabContent();
showTabContent(0);

tabsParent.onclick = (event) => {
  if (event.target.classList.contains("tab_content_item")) {
    tabs.forEach((tabItem, tabIndex) => {
      if (event.target === tabItem) {
        clearInterval(autoSlideInterval);
        hideTabContent();
        showTabContent(tabIndex);
        flag = tabIndex;
        autoSlide(tabIndex);
      }
    });
  }
};

autoSlide(flag);

// HW 5
const somInput = document.querySelector("#som");
const usdInput = document.querySelector("#usd");
const euroInput = document.querySelector("#eur");

const converter = (elementValue, targetValue, secondTargetValue, variant) => {
  elementValue.oninput = () => {
    const request = new XMLHttpRequest();
    request.open("GET", "../data/converter.json");
    request.setRequestHeader("Content-type", "application/json");
    request.send();

    request.onload = () => {
      const data = JSON.parse(request.response);
      if (variant === "som") {
        targetValue.value = (elementValue.value / data.usd).toFixed(2);
        secondTargetValue.value = (elementValue.value / data.euro).toFixed(2);
      } else if (variant === "dollar") {
        targetValue.value = (elementValue.value * data.usd).toFixed(2);
        secondTargetValue.value = (
          (elementValue.value * data.usd) /
          data.euro
        ).toFixed(2);
      } else if (variant === "euro") {
        targetValue.value = (elementValue.value * data.euro).toFixed(2);
        secondTargetValue.value = (
          (elementValue.value * data.euro) /
          data.usd
        ).toFixed(2);
      }

      if (elementValue.value === "") {
        targetValue.value = "";
        secondTargetValue.value = "";
      }
    };
  };
};

converter(somInput, usdInput, euroInput, "som");
converter(usdInput, somInput, euroInput, "dollar");
converter(euroInput, somInput, usdInput, "euro");

//HW 6
const card = document.querySelector(".card");
const btnPrev = document.querySelector("#btn-prev");
const btnNext = document.querySelector("#btn-next");

let id = 1;

const fetchObject = async () => {
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/todos/${id}`
    );
    const data = await response.json();
    card.innerHTML = `
      <p>${data.title}</p>
      <p style="color: ${data.completed ? "green" : "red"}" >${
      data.completed
    }</p>
      <span>${data.id}</span>
    `;
  } catch (e) {
    console.log(e.message);
  }
};

fetchObject();

btnNext.onclick = () => {
  id++;
  if (id <= 200) {
    fetchObject();
  } else {
    id = 1;
    fetchObject();
  }
};

btnPrev.onclick = () => {
  id--;
  if (id >= 1) {
    fetchObject();
  } else {
    id = 200;
    fetchObject();
  }
};

//2 task
const showApi = async () => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const data = await response.json();
    data.forEach((item) => {
      console.log(item);
    });
  } catch (e) {
    console.log(e.message);
  }
};
showApi();

// Weather

const cityNameInput = document.querySelector(".cityName");
const city = document.querySelector(".city");
const temp = document.querySelector(".temp");
// const btnSearch = document.querySelector("#search-btn");
const API_KEY = "e417df62e04d3b1b111abeab19cea714";
const BASE_URL = "http://api.openweathermap.org/data/2.5/weather";

const citySearch = () => {
  cityNameInput.oninput = async () => {
    try {
      const response = await fetch(
        `${BASE_URL}?q=${event.target.value}&appid=${API_KEY}`
      );
      const data = await response.json();
      city.innerHTML = data.name;
      city.innerHTML = data?.name ? data?.name : "Город не найден...";
      temp.innerHTML = data?.main?.temp
        ? Math.round(data.main.temp - 273) + "&deg;" + "C"
        : "...";
    } catch (e) {
      console.log(e.message);
    }
  };
};
citySearch();
