'use strict';

(function () {
  var Y_MIN = 130;
  var Y_MAX = 630;
  var X_MIN = 0;
  var X_MAX = 1200;
  var LEFT_MOUSE_BUTTON = 1;

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
      var startCoords = {
        x: evt.clientX,
        y: evt.clientY
      };

      var offset = {
        x: window.map.mainMapPin.offsetWidth / 2,
        y: window.map.mainMapPin.offsetHeight + window.map.PIN_TAIL
      };
    }

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

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

      window.map.mainMapPin.style.top = Math.max(Y_MIN - offset.y, Math.min(Y_MAX - offset.y, pinY)) + 'px';
      window.map.mainMapPin.style.left = Math.max(X_MIN - offset.x, Math.min(X_MAX - offset.x, pinX)) + 'px';
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
