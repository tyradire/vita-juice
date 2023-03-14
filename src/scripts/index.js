// Main constants
const windowWidth = window.innerWidth;

// Region popup constants
const cities = [
  'Волгоград',
  'Красноярск',
  'Пенза',
  'Воронеж',
  'Москва',
  'Самара',
  'Екатеринбург',
  'Нижний Новгород',
  'Санкт-Петербург',
  'Казань',
  'Новосибирск',
  'Уфа'
];
const basketData = [
  {
    title: 'Гранатовый сок',
    image: '../images/granate.png',
    value: '300 мл',
    ingridients: 'Гранат, лед',
    cost: 575
  },
  {
    title: 'Грин',
    image: '../images/green.png',
    value: '500 мл',
    ingridients: 'Сельдерей, яблоко, шпинат, спирулина, лед',
    cost: 425
  },
  {
    title: 'Гранатовый сок 2',
    image: '../images/granate.png',
    value: '300 мл',
    ingridients: 'Гранат, лед',
    cost: 575
  },
  {
    title: 'Грин',
    image: '../images/green.png',
    value: '500 мл',
    ingridients: 'Сельдерей, яблоко, шпинат, спирулина, лед',
    cost: 425
  }
];

// Header product counter
let basketItemsCounter = basketData.length;
const productCounter = document.querySelector('.user-side__basket-counter');
productCounter.textContent = basketItemsCounter;

const cityItems = document.querySelectorAll('.popup__region-item');
const selectRegionButton = document.querySelector('.buttons__region');
const loginButton = document.querySelector('.user-side__login');
const basketButton = document.querySelector('.user-side__basket');

// Popups
const regionPopup = document.getElementById('popup-region');
const basketPopup = document.getElementById('popup-basket');
const loginPopup = document.getElementById('popup-login');

const regionCity = document.querySelector('.popup__region-city');

const loginForm = document.getElementById('login-form');

// Popup close buttons
const regionCloseBtn = document.getElementById('region-close-btn');
const loginCloseBtn = document.getElementById('login-close-btn');
const basketCloseBtn = document.getElementById('basket-close-btn');

cityItems.forEach((elem, index) => elem.textContent = cities[index])
regionCity.textContent = cities[2]

// Slider constants
const sliderDots = document.querySelectorAll('.navigation__dot');
const slider = document.querySelector('.hero__slider-wrapper');
const arrowButtons = document.querySelectorAll('.navigation__arrow');
const arrowLeft = arrowButtons[0];
const arrowRight = arrowButtons[1];
let sliderPosition = 0;

const selectDot = () => {
  sliderDots.forEach(el => el.classList.remove('navigation__dot_active'));
  if (sliderPosition === 0) {
    sliderDots[0].classList.add('navigation__dot_active');
  } else if (sliderPosition === -windowWidth) {
    sliderDots[1].classList.add('navigation__dot_active');
  } else sliderDots[2].classList.add('navigation__dot_active');
}

const toggleSlideLeft = (x) => {
  if (sliderPosition === 0) {
    sliderPosition = - (windowWidth*2);
    slider.style.transform = `translateX(${sliderPosition}px)`;
  }  else if (sliderPosition < 0) {
    sliderPosition = sliderPosition + x;
    slider.style.transform = `translateX(${sliderPosition}px)`;
  }
  selectDot();
}

const toggleSlideRight = (x) => {
  if (sliderPosition === -(windowWidth*2)) {
    sliderPosition = 0;
    slider.style.transform = `translateX(${sliderPosition}px)`;
  } else if (sliderPosition > -(windowWidth*2)) {
    sliderPosition = sliderPosition - x;
    slider.style.transform = `translateX(${sliderPosition}px)`;
  }
  selectDot();
}

function toggleSlide(x, direction) {
  if (direction === 'left' && sliderPosition <= 0) {
    toggleSlideLeft(x);
  } else if (direction === 'right' && sliderPosition >= -(windowWidth*2)) {
    toggleSlideRight(x);
  } else return;
}

function selectActiveSlideDot(elem) {
  sliderDots.forEach(el => el.classList.remove('navigation__dot_active'));
  elem.classList.add('navigation__dot_active');
}

function selectSlideWithDot(e) {
  selectActiveSlideDot(e.currentTarget);
  if (e.currentTarget === sliderDots[0]) {
    sliderPosition = 0
    slider.style.transform = `translateX(${sliderPosition}px)`;
  } else if (e.currentTarget === sliderDots[1]) {
    sliderPosition = -windowWidth
    slider.style.transform = `translateX(${sliderPosition}px)`;
  } else {
    sliderPosition = -(windowWidth*2)
    slider.style.transform = `translateX(${sliderPosition}px)`;
  }
}

const openPopup = (elem) => {
  elem.classList.add('popup-cover_opened');
  if (windowWidth < 768) {
    document.body.style.overflowY = 'hidden';
  } else return;
}

const closePopup = (elem) => {
  elem.classList.remove('popup-cover_opened');
  if (windowWidth < 768) {
    document.body.style.overflowY = 'visible';
  } else return;
}

console.log(document.body.style.overflowY)

const submitLoginForm = (e) => {
  e.preventDefault();
  closePopup(loginPopup);
}

sliderDots.forEach(elem => elem.addEventListener('click', (e) => selectSlideWithDot(e)));

arrowLeft.addEventListener('click', (e) => toggleSlide(windowWidth, 'left'));
arrowRight.addEventListener('click', (e) => toggleSlide(windowWidth, 'right'));

selectRegionButton.addEventListener('click', (e) => openPopup(regionPopup));
loginButton.addEventListener('click', (e) => openPopup(loginPopup));
basketButton.addEventListener('click', (e) => openPopup(basketPopup));

regionCloseBtn.addEventListener('click', (e) => closePopup(regionPopup));
loginCloseBtn.addEventListener('click', (e) => closePopup(loginPopup));
basketCloseBtn.addEventListener('click', (e) => closePopup(basketPopup));

loginForm.addEventListener('submit', submitLoginForm)

// Basket

let totalSum = document.getElementById('total-sum');
totalSum.textContent = 2000;

class BasketCard {
  constructor({title, image, value, ingridients, cost}) {
    this._title = title;
    this._image = image;
    this._value = value;
    this._ingridients = ingridients;
    this._cost = cost;
  }

  _getTemplate() {
    const cardElement = document
    .getElementById('basket-item-template')
    .content
    .querySelector('.popup-basket__item')
    .cloneNode(true);

    return cardElement;
  }

  generateBasketCard() {
    this._element = this._getTemplate();

    this._element.querySelector('.popup-basket__title').textContent = this._title;
    this._element.querySelector('.popup-basket__image').src = this._image;
    this._element.querySelector('.popup-basket__value').textContent = this._value;
    this._element.querySelector('.popup-basket__ingredients').textContent = this._ingridients;
    this._element.querySelector('.popup-basket__total-price').textContent = this._cost;

    return this._element;
  }
}

basketData.forEach((item, index) => {
  const basketItem = new BasketCard(item);
  const card = basketItem.generateBasketCard();
  card.id = 'basket-item-' + (index + 1);
  document.querySelector('.popup-basket__list').append(card);
})

const deleteButtons = document.querySelectorAll('.popup-basket__delete-btn');
let basketItems = document.querySelectorAll('.popup-basket__item');

const deleteItemFromBasket = (el) => {
  el.remove();
  productCounter.textContent--
  basketItems = document.querySelectorAll('.popup-basket__item')
  refreshTotalSum();
}

deleteButtons.forEach(elem => elem.addEventListener('click', e => deleteItemFromBasket(e.currentTarget.parentElement)))

// Add to basket from section popular

const refreshTotalSum = (add) => {
  if (add === 'add') {
    basketItems = document.querySelectorAll('.popup-basket__item');
    let basketPrices = [];
    basketItems.forEach(el => basketPrices.push(+(el.querySelector('.popup-basket__total-price').textContent.replace('₽', ''))))
    totalSum.textContent = basketPrices.reduce((acc, curr) => acc + curr)
  }
  else {
    basketItems = document.querySelectorAll('.popup-basket__item');
    let basketPrices = [];
    basketItems.forEach(el => basketPrices.push(+(el.querySelector('.popup-basket__total-price').textContent.replace('₽', ''))))
    totalSum.textContent = basketPrices.reduce((acc, curr) => acc + curr)
  }
}

const addItemToBasket = (el) => {
  const title = el.querySelector('.slider__product-name').textContent;
  const image = el.querySelector('.slider__image').src;
  const value = el.querySelector('.slider__product-volume').textContent;
  const ingridients = 'Ингридиенты';
  const cost = el.querySelector('.slider__price').textContent;
  const basketItem = new BasketCard({title, image, value, ingridients, cost});
  const card = basketItem.generateBasketCard();
  card.id = 'basket-item-' + (basketItemsCounter++ +1);
  document.querySelector('.popup-basket__list').append(card);
  productCounter.textContent++
  const deleteButton = card.querySelector('.popup-basket__delete-btn');
  deleteButton.addEventListener('click', e => deleteItemFromBasket(e.currentTarget.parentElement))
  refreshTotalSum('add');
}

const addButtons = document.querySelectorAll('.slider__basket-btn');
addButtons.forEach(elem => elem.addEventListener('click', e => addItemToBasket(e.currentTarget.parentElement)))