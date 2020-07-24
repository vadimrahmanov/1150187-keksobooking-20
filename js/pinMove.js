'use strict';

(function () {
  var Y_MIN = 130;
  var Y_MAX = 630;
  var X_MIN = 0;
  var X_MAX = 1200;
  var LEFT_MOUSE_BUTTON = 1;

  var map = document.querySelector('.map__overlay');

  var initialCoordinats = {
    X: 570,
    Y: 375
  };

  var resetMainPin = function () {
    var pinRect = window.map.mainMapPin.getBoundingClientRect();
    pinRect.x = initialCoordinats.X;
    pinRect.y = initialCoordinats.Y;
    window.map.mainMapPin.style.top = pinRect.y + 'px';
    window.map.mainMapPin.style.left = pinRect.x + 'px';
  };

  window.map.mainMapPin.addEventListener('mousedown', function (evt) {
    if (evt.which === LEFT_MOUSE_BUTTON) {
      evt.preventDefault();
      // var pinDetails = window.map.mainMapPin.getBoundingClientRect();
      // var mapDetails = map.getBoundingClientRect();
      var startCoords = {
        x: evt.clientX,
        y: evt.clientY
      };
    }

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      // var pinX = e.clientX - mapDetails.x;
      // var pinY = e.clientY - mapDetails.y;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var pinY = window.map.mainMapPin.offsetTop - shift.y;
      var pinX = window.map.mainMapPin.offsetLeft - shift.x;

      // window.map.mainMapPin.style.top = Math.max(Y_MIN, Math.min(Y_MAX, pinY)) - window.map.mainMapPin.offsetHeight - window.map.PIN_TAIL + 'px';
      // window.map.mainMapPin.style.left = Math.max(X_MIN, Math.min(X_MAX, pinX)) - window.map.mainMapPin.offsetWidth / 2 + 'px';
      window.map.mainMapPin.style.top = (Math.max(Y_MIN, Math.min(Y_MAX, pinY)) - 33) + 'px';
      window.map.mainMapPin.style.left = (Math.max(X_MIN, Math.min(X_MAX, pinX)) - 33) + 'px';
      console.log(Math.max(Y_MIN, Math.min(Y_MAX, pinY)) - 33 + 'px');
      window.form.addressCoordinats();
    };

    var onMouseUp = function (e) {
      e.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

    window.pinMove = {
      resetMainPin: resetMainPin
    };
  });
})();
