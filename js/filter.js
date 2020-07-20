'use strict';

(function () {
  var PINS_AMOUNT = 5;

  var filterForm = document.querySelector('.map__filters');
  var housingType = filterForm.querySelector('#housing-type');

  var filterHousingType = function (pin) {
    return housingType.value === pin.offer.type || housingType.value === 'any';
  };

  var filterPins = function (pins) {
    var pinsArray = [];
    var i = 0;
    while (pinsArray.length < PINS_AMOUNT && i < pins.length) {
      var pin = pins[i];
      if (filterHousingType(pin)) {
        pinsArray.push(pin);
      }
      i++;
      window.cards.cardClickCloseHandler();
    }
    return pinsArray;
  };

  window.filter = {
    filterPins: filterPins
  };
})();
