'use strict';

var ACCOMODATION_TYPE = ['palace', 'flat', 'house', 'bungalo'];
var CHECK_IN = ['12:00', '13:00', '14:00'];
var CHECK_OUT = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var DESCRIPTIONS = ['Лучшее предложение в округе', 'Идеально для пар', 'Лучший отель по мнению TripAdvisor', 'Лучший бюджетный вариант', 'Шикарный вид из окна', 'Шикарный вариант для бизнесс-поездок', 'Выгодное предложение для семей', 'Номинант "Лучший отель в Токио"'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var ANNOUNCMENT_AMOUNT = 8;
var LOCATION = ['600, 350', '600, 350', '600, 350', '600, 350', '600, 350', '600, 350', '600, 350', '600, 350'];
var MAX_PRICE = 10000;
var PRICES = {bungalo: 0, flat: 1000, house: 5000, palace: MAX_PRICE};
var PIN_TAIL = 22;

var map = document.querySelector('.map');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var mapPins = document.querySelector('.map__pins');
var adForm = document.querySelector('.ad-form');
var adFormFields = adForm.querySelectorAll('.ad-form fieldset');
var mapFiltersForm = document.querySelector('.map__filters');
var mapFiltersElements = mapFiltersForm.querySelectorAll('select, fieldset');
var mainMapPin = mapPins.querySelector('.map__pin--main');
var addressInput = adForm.querySelector('#address');
var priceInput = adForm.querySelector('#price');
var typeSelect = adForm.querySelector('#type');
var submitButton = adForm.querySelector('.ad-form__submit');
var roomNumber = adForm.querySelector('#room_number');
var capacity = adForm.querySelector('#capacity');

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

var disableAdFormFields = function (boolean) {
  for (var i = 0; i < adFormFields.length; i++) {
    adFormFields[i].disabled = boolean;
  }
  addressInput.value = getPinCoordinats();
};

var disableMapFiltersForm = function (boolean) {
  for (var i = 0; i < mapFiltersElements.length; i++) {
    mapFiltersElements[i].disabled = boolean;
  }
};

var getPinCoordinats = function () {
  var pinX;
  var pinY;
  if (map.classList.contains('map--faded')) {
    pinX = mainMapPin.offsetLeft + (mainMapPin.offsetWidth / 2);
    pinY = mainMapPin.offsetTop + (mainMapPin.offsetHeight / 2);
  } else {
    pinX = mainMapPin.offsetLeft + (mainMapPin.offsetWidth / 2);
    pinY = mainMapPin.offsetTop + mainMapPin.offsetHeight + PIN_TAIL;
  }
  return Math.round(pinX) + ', ' + Math.round(pinY);
};

var pageActivation = function () {
  disableAdFormFields(false);
  disableMapFiltersForm(false);
  map.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
  addressInput.value = getPinCoordinats();
  renderPinElements();
};

var activatePageOnClick = function (evt) {
  if (evt.which === 1) {
    pageActivation();
    mainMapPin.removeEventListener('keydown', activatePageOnEnter);
  }
};

var activatePageOnEnter = function (evt) {
  if (evt.key === 'Enter') {
    pageActivation();
    mainMapPin.removeEventListener('mousedown', activatePageOnClick);
  }
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
        price: getRandomNumber(0, MAX_PRICE),
        type: getRandomArray(ACCOMODATION_TYPE),
        rooms: getRandomNumber(1, 100),
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

var onInit = function () {
  disableAdFormFields(true);
  disableMapFiltersForm(true);
};

mainMapPin.addEventListener('mousedown', activatePageOnClick, {once: true});
mainMapPin.addEventListener('keydown', activatePageOnEnter, {once: true});

typeSelect.addEventListener('change', function (evt) {
  priceInput.min = PRICES[evt.target.value];
  priceInput.placeholder = PRICES[evt.target.value];
});

submitButton.addEventListener('click', function () {
  if (+roomNumber.value < +capacity.value) {
    capacity.setCustomValidity('Количество комнат не может быть меньше, чем количество гостей');
  } else if (+roomNumber.value === 100 && +capacity.value !== 0) {
    capacity.setCustomValidity('100 комнат не для гостей');
  } else {
    capacity.setCustomValidity('');
  }
});

window.addEventListener('load', onInit);
