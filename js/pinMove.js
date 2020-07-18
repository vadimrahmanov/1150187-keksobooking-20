'use strict';

(function () {

  var map = document.querySelector('.map__overlay');

  window.map.mainMapPin.addEventListener('mousedown', function (evt) {
    if (evt.which === 1) {
      evt.preventDefault();
      var pinDetails = window.map.mainMapPin.getBoundingClientRect();
      var mapDetails = map.getBoundingClientRect();
    }

    var onMouseMoveHandler = function (e) {
      e.preventDefault();
      var pinX = e.clientX - mapDetails.x;
      var pinY = e.clientY - mapDetails.y;
      window.map.mainMapPin.style.top = Math.max(130, Math.min(630, pinY)) - pinDetails.height - window.map.PIN_TAIL + 'px';
      window.map.mainMapPin.style.left = Math.max(0, Math.min(1200, pinX)) - pinDetails.width / 2 + 'px';
      window.form.addressCoordinats();
    };

    var onMouseUpHandler = function (e) {
      e.preventDefault();
      document.removeEventListener('mousemove', onMouseMoveHandler);
      document.addEventListener('mouseup', onMouseUpHandler);
    };
    document.addEventListener('mousemove', onMouseMoveHandler);
    document.addEventListener('mouseup', onMouseUpHandler);
  });
})();
