'use strict';

(function () {
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var mapPins = document.querySelector('.map__pins');
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var successTemplate = document.querySelector('#success').content.querySelector('.success');
  var activationButton = mapPins.querySelector('.map__pin');
  var pins = [];
  var mapFiltersForm = document.querySelector('.map__filters');

  var renderPin = function (pin) {
    var pinElement = pinTemplate.cloneNode(true);
    var pinImage = pinElement.querySelector('img');
    pinElement.style.left = pin.location.x + 'px';
    pinElement.style.top = pin.location.y + 'px';
    pinImage.src = pin.author.avatar;
    pinImage.alt = pin.offer.title;

    pinElement.addEventListener('click', function () {
      window.cards.cardClickCloseHandler();
      window.cards.renderCards(pin);
    });

    return pinElement;
  };

  var deletePins = function () {
    var renderedPins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    renderedPins.forEach(function (item) {
      item.remove();
    });
  };

  var renderPinElements = function () {
    var pinsToRender = window.filter.filterPins(pins);
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < pinsToRender.length; i++) {
      fragment.appendChild(renderPin(pinsToRender[i]));
    }
    deletePins();
    mapPins.appendChild(fragment);
  };

  var renderPinElementsDebounce = window.debounce(renderPinElements, 500);

  mapFiltersForm.addEventListener('change', renderPinElementsDebounce);

  var resetPage = function () {
    window.map.map.classList.add('map--faded');
    window.form.adForm.classList.add('ad-form--disabled');
    window.cards.cardClickCloseHandler();
    window.form.adForm.reset();
    deletePins();
    window.main.onInit();
    window.pinMove.resetMainPin();
    window.form.addressCoordinats();
    activationButton.addEventListener('mousedown', window.main.activationPinClickHandler);
    activationButton.addEventListener('keydown', window.main.activationPinKeydownHandler);
  };

  var successMessage = function () {
    var success = successTemplate.cloneNode(true);
    window.form.disabled();
    document.body.insertAdjacentElement('afterbegin', success);

    var closeSuccessMessage = function () {
      success.remove();
      resetPage();
      window.removeEventListener('click', closeSuccessWindowOnClick);
      document.removeEventListener('keydown', closeSuccessWindowOnEscapePress);
    };

    var closeSuccessWindowOnClick = function (evt) {
      if (evt.which === 1) {
        closeSuccessMessage();
      }
    };

    var closeSuccessWindowOnEscapePress = function (evt) {
      if (evt.key === 'Escape') {
        closeSuccessMessage();
      }
    };

    window.addEventListener('click', closeSuccessWindowOnClick);
    document.addEventListener('keydown', closeSuccessWindowOnEscapePress);
  };

  var errorHandler = function () {
    var error = errorTemplate.cloneNode(true);
    var errorButton = error.querySelector('button');
    document.body.insertAdjacentElement('afterbegin', error);

    var closeErrorWindow = function () {
      error.remove();
      window.removeEventListener('click', closeErrorWindow);
      errorButton.removeEventListener('click', closeErrorWindow);
      document.removeEventListener('keydown', closeErrorWindowOnEscapePress);
    };

    var closeErrorWindowOnEscapePress = function (evt) {
      if (evt.key === 'Escape') {
        closeErrorWindow();
      }
    };

    errorButton.addEventListener('click', closeErrorWindow);
    window.addEventListener('click', closeErrorWindow);
    document.addEventListener('keydown', closeErrorWindowOnEscapePress);
  };

  var successHandler = function (announcment) {
    pins = announcment;
  };

  window.backend.load(successHandler, errorHandler);
  window.form.adForm.addEventListener('submit', function (evt) {
    window.backend.upload(new FormData(window.form.adForm), successMessage, errorHandler);
    evt.preventDefault();
  });

  window.pin = {
    renderPin: renderPin,
    renderPinElements: renderPinElements,
    resetPage: resetPage,
    deletePins: deletePins
  };
})();
