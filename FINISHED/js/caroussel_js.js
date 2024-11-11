const buttons = document.querySelectorAll(".btn");
const slides = document.querySelectorAll(".slide");

// Fonction pour changer de slide
const changeSlide = (direction) => {
  const slideActive = document.querySelector(".active");
  let newIndex = direction + [...slides].indexOf(slideActive);

  if (newIndex < 0) newIndex = [...slides].length - 1;
  if (newIndex >= [...slides].length) newIndex = 0;
  
  slides[newIndex].classList.add("active");
  slideActive.classList.remove("active");
};

// Système des clics sur les boutons
buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    const calcNextSlide = e.target.id === "next" ? 1 : -1;
    changeSlide(calcNextSlide);
  });
});

// Changement automatique toutes les 3 secondes
setInterval(() => {
  changeSlide(1);
}, 6000);
