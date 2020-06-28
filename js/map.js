'use strict';

(function () {
  var PIN_TAIL = 22;
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
    return Math.round(pinX) + ', ' + Math.round(pinY);
  };

  window.map = {
    map: map,
    mainMapPin: mainMapPin,
    getPinCoordinats: getPinCoordinats
  };
})();
