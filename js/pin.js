'use strict';

(function () {
  var LEFT_MOUSE_BUTTON = 1;
  var ESCAPE_BUTTON = 'Escape';

  var PinSize = {
    X: 50,
    Y: 70
  };

  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var mapPins = document.querySelector('.map__pins');
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var successTemplate = document.querySelector('#success').content.querySelector('.success');
  var activationButton = mapPins.querySelector('.map__pin');
  var pins = [];
  var mapFiltersForm = document.querySelector('.map__filters');
  var renderedPins = [];

  var renderPin = function (pin) {
    var pinElement = pinTemplate.cloneNode(true);
    var pinImage = pinElement.querySelector('img');
    pinElement.style.left = pin.location.x - PinSize.X / 2 + 'px';
    pinElement.style.top = pin.location.y - PinSize.Y + 'px';
    pinImage.src = pin.author.avatar;
    pinImage.alt = pin.offer.title;

    pinElement.addEventListener('click', function () {
      window.cards.onCardClickClose();
      window.cards.renderCards(pin);
    });
    return pinElement;
  };

  var deletePins = function () {
    renderedPins.forEach(function (item) {
      item.remove();
    });
    renderedPins = [];
  };

  var renderPinElements = function () {
    deletePins();
    var pinsToRender = window.filter.filterPins(pins);
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < pinsToRender.length; i++) {
      var pin = renderPin(pinsToRender[i]);
      fragment.appendChild(pin);
      renderedPins.push(pin);
    }
    mapPins.appendChild(fragment);
  };

  mapFiltersForm.addEventListener('change', window.debounce(renderPinElements));

  var resetPage = function () {
    window.map.map.classList.add('map--faded');
    window.form.adForm.classList.add('ad-form--disabled');
    window.cards.onCardClickClose();
    window.form.adForm.reset();
    deletePins();
    window.main.onInit();
    window.pinMove.resetMainPin();
    window.form.previewReset();
    window.form.addressCoordinats();
    activationButton.addEventListener('mousedown', window.main.onClickActivate);
    activationButton.addEventListener('keydown', window.main.onKeyDownActivate);
  };

  var successMessage = function () {
    var success = successTemplate.cloneNode(true);
    window.form.disabled();
    document.body.insertAdjacentElement('afterbegin', success);

    var closeSuccessMessage = function () {
      success.remove();
      resetPage();
      window.removeEventListener('click', onClickSuccessWindowClose);
      document.removeEventListener('keydown', onKeyDownSuccessWindowClose);
    };

    var onClickSuccessWindowClose = function (evt) {
      if (evt.which === LEFT_MOUSE_BUTTON) {
        closeSuccessMessage();
      }
    };

    var onKeyDownSuccessWindowClose = function (evt) {
      if (evt.key === ESCAPE_BUTTON) {
        closeSuccessMessage();
      }
    };

    window.addEventListener('click', onClickSuccessWindowClose);
    document.addEventListener('keydown', onKeyDownSuccessWindowClose);
  };

  var errorHandler = function () {
    var error = errorTemplate.cloneNode(true);
    var errorButton = error.querySelector('button');
    document.body.insertAdjacentElement('afterbegin', error);

    var closeErrorWindow = function () {
      error.remove();
      window.removeEventListener('click', closeErrorWindow);
      errorButton.removeEventListener('click', closeErrorWindow);
      document.removeEventListener('keydown', onKeyDownErrorWindowClose);
    };

    var onKeyDownErrorWindowClose = function (evt) {
      if (evt.key === ESCAPE_BUTTON) {
        closeErrorWindow();
      }
    };

    errorButton.addEventListener('click', closeErrorWindow);
    window.addEventListener('click', closeErrorWindow);
    document.addEventListener('keydown', onKeyDownErrorWindowClose);
  };

  var successHandler = function (announcment) {
    pins = announcment;
    renderPinElements();
  };

  window.form.adForm.addEventListener('submit', function (evt) {
    window.backend.upload(new FormData(window.form.adForm), successMessage, errorHandler);
    evt.preventDefault();
  });

  window.pin = {
    renderPin: renderPin,
    renderPinElements: renderPinElements,
    resetPage: resetPage,
    deletePins: deletePins,
    successHandler: successHandler,
    errorHandler: errorHandler
  };
})();
