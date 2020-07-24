'use strict';

(function () {
  var PIN_TAIL = 20;
  var map = document.querySelector('.map');
  var mainMapPin = document.querySelector('.map__pin--main');

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
    return Math.floor(pinX) + ', ' + Math.floor(pinY);
  };

  window.map = {
    PIN_TAIL: PIN_TAIL,
    map: map,
    mainMapPin: mainMapPin,
    getPinCoordinats: getPinCoordinats
  };
})();
