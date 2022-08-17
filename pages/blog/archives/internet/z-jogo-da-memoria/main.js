const cardBoard = document.querySelector("#cardboard");

const images = [
  "angular.svg",
  "aurelia.svg",
  "backbone.svg",
  "ember.svg",
  "react.svg",
  "vue.svg",
];

console.log(images)

let cardHTML = "";

images.forEach((img) => {
    console.log(img)
    console.log(`./img/${img}`)
  cardHTML += `
        <div class="memory-card" data-card="${img}">
            <img class="front-face" src="./img/${img}">
            <img class="back-face" src="./img/js-badge.svg">
        </div>
    `;
});

cardBoard.innerHTML = cardHTML + cardHTML;

const cards = document.querySelectorAll(".memory-card");

let firstCard, secondCard;
let lockCard = false;

function flipCard() {
  if (lockCard) return false;
  this.classList.add("flip");
  if (!firstCard) {
    firstCard = this;
    return false;
  }
  secondCard = this;
  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.card === secondCard.dataset.card;
  !isMatch ? disableCards() : resetCards();
}

function disableCards() {
  lockCard = true;
  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");
    resetCards();
  }, 1000);
}

(function shuffle() {
  cards.forEach((card) => {
    let rand = Math.floor(Math.random() * 12);
    card.style.order = rand;
  });
})();

function resetCards(isMatch = false) {
  if (isMatch) {
    firstCard.removeEventListener("clip", flipCard);
    secondCard.removeEventListener("clip", flipCard);
  }
  [firstCard, secondCard, lockCard] = [null, null, false];
}

cards.forEach((card) => card.addEventListener("click", flipCard));
