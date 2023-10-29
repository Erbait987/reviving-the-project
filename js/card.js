const card = document.querySelector(".card-object-flex");
const video = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";

const showCard = async () => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const data = await response.json();
    data.forEach((cards) => {
      const newsCard = document.createElement("div");
      newsCard.setAttribute("class", "card-object");
      newsCard.innerHTML = `
          <img class="image" src="https://img2.freepng.ru/20180624/jw/kisspng-newspaper-drawing-journalism-5b2f8066931274.6497354215298397186024.jpg" alt="рисунок">
          <h4 class="card-object-title">${cards.title}</h4>
          <p class="card-object-text">${cards.body}</p>
          `;
      card.append(newsCard);

      newsCard.onclick = () => {
        window.location.href = video;
      };
    });
  } catch (e) {
    console.log(e.message);
  }
};

showCard();
