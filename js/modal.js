const modal = document.querySelector(".modal");
const modalTrigger = document.querySelector("#btn-get");
const closeModalBtn = document.querySelector(".modal_close");

const openModal = () => {
  modal.style.display = "block";
  document.body.style.overflow = "hidden";
};

const closeModal = () => {
  modal.style.display = "none";
  document.body.style.overflow = "";
};

modalTrigger.onclick = () => openModal();

modal.onclick = (event) => {
  if (event.target === modal || event.target === closeModalBtn) {
    closeModal();
  }
};

setTimeout(() => {
  openModal();
}, 10000);

//вариант с флажками
// let changer = false;
// window.addEventListener("scroll", function () {
//   const isAtBottom =
//     window.innerHeight + window.scrollY >= document.body.offsetHeight;
//   if (isAtBottom && !changer) {
//     openModal();
//     changer = true;
//   }
// });

// вариант с ремув
function scrollHandler() {
  const isAtBottom =
    window.innerHeight + window.scrollY >= document.body.offsetHeight;
  if (isAtBottom) {
    openModal();
    window.removeEventListener("scroll", scrollHandler); // Удаляем обработчик события
  }
}

window.addEventListener("scroll", scrollHandler);
