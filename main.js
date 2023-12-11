import { information } from './src/data/cardsInfo';
let cards = '';

// LOGIC TO CLOSE THE COOKIES BANNER -----------------------------
const banner = document.querySelector('.footer__cookiesBanner');
const closeIcon = document.querySelector('.footer__cookiesBanner-exit');

function hide() {
  banner.style.display = 'none';
}

closeIcon.addEventListener('click', hide);
// ---------------------------------------------------------------

// LOGIC TO CENTER THE TESTIMONIAL REVIEWS -----------------------
const testimonialsReviews = document.querySelector('.testimonials__reviews');

function center() {
  return (
    (testimonialsReviews.scrollWidth - testimonialsReviews.offsetWidth) / 2
  );
}

window.onload = testimonialsReviews.scrollTo(center(), 0);
// ---------------------------------------------------------------

// LOGIC TO SCROLL CARDS WITH BUTTONS ----------------------------
const featuredContainer = document.querySelector('.featured__houseContent');
const leftArrow = document.getElementById('featured-leftArrow');
const rightArrow = document.getElementById('featured-rightArrow');
const items = [...featuredContainer.children];

function move(direction) {
  const container = featuredContainer.getBoundingClientRect();
  let scrollAmount = 0;

  if (direction === 'left') {
    const itemsReversed = items.reverse();
    for (let item of itemsReversed) {
      const itemInfo = item.getBoundingClientRect();
      if (itemInfo.left < container.left) {
        scrollAmount = -itemInfo.width;
        break;
      }
    }
  } else if (direction === 'right') {
    for (let item of items) {
      const itemInfo = item.getBoundingClientRect();
      if (itemInfo.right > container.right) {
        scrollAmount = itemInfo.right - container.right;
        break;
      }
    }
  }

  featuredContainer.scrollBy({
    left: scrollAmount,
    behavior: 'smooth',
  });
}

rightArrow.addEventListener('click', () => move('right'));
leftArrow.addEventListener('click', () => move('left'));
// ---------------------------------------------------------------

// LOGIC TO ADD MORE ARTICLES BELOW THE EXISTING ONES -------------
const addBtn = document.getElementById('more-articles');
const articlesContainer = document.querySelector('.findMore__leftContent');
const cardsInfo = [...information];
let articlesCreated = false;

function createArticles() {
  for (let i = 0; i < 3; i++) {
    const person = cardsInfo[i][0];
    const innerInfo = cardsInfo[i][1];
    const articleContent = `
        <img
        src="./src/assets/images/${innerInfo.houseImg}"
        alt="apartment-photo"
        />
        <div class="findMore__leftContent-card-info">
        <div class="findMore__leftContent-card-info-person">
            <img
            src="./src/assets/images/${person.image}"
            alt="dianne-photo"
            />
            <span class="label label-regular grey-2">${person.name}</span>
        </div>
        <p class="subtitle">
            ${innerInfo.subtitle}
        </p>
        <div class="findMore__leftContent-card-info-time">
            <img src="./src/assets/icons/clock.svg" alt="clock-icon" />
            <span class="label label-regular grey-2">            
                ${innerInfo.time}
            </span>
        </div>
        </div>
    `;

    const article = document.createElement('div');
    article.classList.add('findMore__leftContent-card');
    article.innerHTML = articleContent;
    articlesContainer.append(article);
  }

  articlesCreated = true;
  obtainCards();
}

addBtn.addEventListener('click', () => {
  if (!articlesCreated) {
    createArticles();
  }
});

// ---------------------------------------------------------------

// LOGIC TO CHANGE THE BIG ARTICLE CARD  -------------------------
const mainCard = document.querySelector('.findMore__rightContent');
obtainCards();

function changeBigCard(card) {
  const cardChilds = [...card.children];
  const cardInfo = cardChilds[1];
  // Card Main Image
  const cardImg = cardChilds[0].getAttribute('src');
  // Card Person Image
  const cardPersonImg = cardInfo.children[0].children[0].getAttribute('src');
  // Card Person Name
  const cardPersonName = cardInfo.children[0].children[1].innerHTML;
  // Card Subtitle
  const cardSubtitle = cardInfo.children[1].innerHTML;
  // Card Time
  const cardTime = cardInfo.children[2].children[1].innerHTML;

  // Setting the new values to the main card
  const mainCardChilds = mainCard.children;
  mainCardChilds[0].setAttribute('src', cardImg);
  mainCardChilds[1].children[0].children[0].children[0].setAttribute(
    'src',
    cardPersonImg
  );
  mainCardChilds[1].children[0].children[0].children[1].innerHTML =
    cardPersonName;
  mainCardChilds[1].children[0].children[1].innerHTML = cardSubtitle;
  mainCardChilds[1].children[1].children[1].innerHTML = cardTime;
}

function obtainCards() {
  cards = [...document.querySelectorAll('.findMore__leftContent-card ')];
  cards.forEach((card) => {
    card.addEventListener('click', () => changeBigCard(card));
  });
}

// ---------------------------------------------------------------
