'use strict';

(function () {
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var mapPins = document.querySelector('.map__pins');

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
    var announcment = window.data.getAnnouncmentArray();
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < announcment.length; i++) {
      fragment.appendChild(window.pin.renderPin(announcment[i]));
    }
    mapPins.appendChild(fragment);
  };

  window.pin = {
    renderPin: renderPin,
    renderPinElements: renderPinElements
  };
})();
