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
const cityItems = document.querySelectorAll('.popup__region-item');
const selectRegionButton = document.querySelector('.buttons__region');
const regionPopup = document.querySelector('.popup-cover');
const regionCloseBtn = document.querySelector('.popup__close-btn');
const regionCity = document.querySelector('.popup__region-city');

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
    sliderPosition = - 3840;
    slider.style.transform = `translateX(${sliderPosition}px)`;
  }  else if (sliderPosition < 0) {
    sliderPosition = sliderPosition + x;
    slider.style.transform = `translateX(${sliderPosition}px)`;
  }
  selectDot();
}

const toggleSlideRight = (x) => {
  if (sliderPosition === -3840) {
    sliderPosition = 0;
    slider.style.transform = `translateX(${sliderPosition}px)`;
  } else if (sliderPosition > -3840) {
    sliderPosition = sliderPosition - x;
    slider.style.transform = `translateX(${sliderPosition}px)`;
  }
  selectDot();
}

function toggleSlide(x, direction) {
  if (direction === 'left' && sliderPosition <= 0) {
    toggleSlideLeft(x);
  } else if (direction === 'right' && sliderPosition >= -3840) {
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
    sliderPosition = -1920
    slider.style.transform = `translateX(${sliderPosition}px)`;
  } else {
    sliderPosition = -3840
    slider.style.transform = `translateX(${sliderPosition}px)`;
  }
}

const openSelectRegionPopup = () => {
  regionPopup.classList.add('popup-cover_opened');
}

const closeSelectRegionPopup = () => {
  regionPopup.classList.remove('popup-cover_opened');
}

sliderDots.forEach(elem => elem.addEventListener('click', (e) => selectSlideWithDot(e)))

arrowLeft.addEventListener('click', (e) => toggleSlide(windowWidth, 'left'))
arrowRight.addEventListener('click', (e) => toggleSlide(windowWidth, 'right'))

selectRegionButton.addEventListener('click', openSelectRegionPopup)
regionCloseBtn.addEventListener('click', closeSelectRegionPopup)