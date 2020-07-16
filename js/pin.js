'use strict';

(function () {
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var mapPins = document.querySelector('.map__pins');
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var pins = [];

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

  var renderPinElements = function () {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < pins.length; i++) {
      fragment.appendChild(renderPin(pins[i]));
    }
    mapPins.appendChild(fragment);
  };

  var errorHandler = function () {
    var error = errorTemplate.cloneNode(true);
    var errorButton = error.querySelector('button');
    document.body.insertAdjacentElement('afterbegin', error);

    var closeErrorWindow = function () {
      error.classList.add('hidden');
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

  window.pin = {
    renderPin: renderPin,
    renderPinElements: renderPinElements
  };
})();
