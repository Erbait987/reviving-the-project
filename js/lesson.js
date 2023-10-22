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
