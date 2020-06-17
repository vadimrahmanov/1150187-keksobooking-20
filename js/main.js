'use strict';

var ACCOMODATION_TYPE = ['palace', 'flat', 'house', 'bungalo'];
var CHECK_IN = ['12:00', '13:00', '14:00'];
var CHECK_OUT = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var DESCRIPTIONS = ['Лучшее предложение в округе', 'Идеально для пар', 'Лучший отель по мнению TripAdvisor', 'Лучший бюджетный вариант', 'Шикарный вид из окна', 'Шикарный вариант для бизнесс-поездок', 'Выгодное предложение для семей', 'Номинант "Лучший отель в Токио"'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var ANNOUNCMENT_AMOUNT = 8;
var LOCATION = ['600, 350', '600, 350', '600, 350', '600, 350', '600, 350', '600, 350', '600, 350', '600, 350'];
var MAX_PRICE = 60000;
var map = document.querySelector('.map');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var mapPins = document.querySelector('.map__pins');

var getRandomArray = function (arr) {
  var rand = Math.floor(Math.random() * arr.length);
  return arr[rand];
};

var getRandomArrayLength = function (arr) {
  return arr.slice(0, getRandomNumber(1, arr.length));
};

var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

var getAnnouncmentArray = function () {
  var announcmentArray = [];
  for (var i = 1; i <= ANNOUNCMENT_AMOUNT; i++) {
    var xCoordinate = getRandomNumber(0, 1200);
    var yCoordinate = getRandomNumber(130, 630);
    announcmentArray.push({
      author: {
        avatar: 'img/avatars/user0' + i + '.png'
      },
      offer: {
        title: 'Заголовок',
        address: getRandomArray(LOCATION),
        price: getRandomNumber(300, MAX_PRICE),
        type: getRandomArray(ACCOMODATION_TYPE),
        rooms: getRandomNumber(1, 4),
        guests: getRandomNumber(1, 6),
        checkin: getRandomArray(CHECK_IN),
        checkout: getRandomArray(CHECK_OUT),
        features: getRandomArrayLength(FEATURES),
        description: DESCRIPTIONS[i],
        photos: getRandomArrayLength(PHOTOS)
      },
      location: {
        x: xCoordinate,
        y: yCoordinate
      }
    });
  }
  return announcmentArray;
};

var renderPin = function (pins) {
  var pinElement = pinTemplate.cloneNode(true);
  var pinImage = pinElement.querySelector('img');
  pinElement.style.left = pins.location.x + 'px';
  pinElement.style.top = pins.location.y + 'px';
  pinImage.src = pins.author.avatar;
  pinImage.alt = pins.offer.title;
  return pinElement;
};

var renderPinElements = function () {
  var announcment = getAnnouncmentArray();
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < announcment.length; i++) {
    fragment.appendChild(renderPin(announcment[i]));
  }
  mapPins.appendChild(fragment);
};

var init = function () {
  map.classList.remove('map--faded');
  renderPinElements();
};

init();
