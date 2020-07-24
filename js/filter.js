'use strict';

(function () {
  var PINS_AMOUNT = 5;
  var ANY_VALUE = 'any';

  var filterForm = document.querySelector('.map__filters');
  var housingType = filterForm.querySelector('#housing-type');
  var housingPrice = filterForm.querySelector('#housing-price');
  var housingRooms = filterForm.querySelector('#housing-rooms');
  var housingGuests = filterForm.querySelector('#housing-guests');
  var mapFeatures = filterForm.querySelector('.map__features');

  var prices = {
    'low': {
      from: 0,
      to: 9999
    },
    'middle': {
      from: 10000,
      to: 50000
    },
    'high': {
      from: 50001,
      to: 100000
    }
  };

  var filterHousingType = function (pin) {
    return housingType.value === pin.offer.type || housingType.value === ANY_VALUE;
  };

  var filterHousingPrices = function (pin) {
    return housingPrice.value === ANY_VALUE ||
      pin.offer.price >= prices[housingPrice.value].from && pin.offer.price <= prices[housingPrice.value].to;
  };

  var filterHousingRooms = function (pin) {
    return housingRooms.value === ANY_VALUE ||
      pin.offer.rooms === Number(housingRooms.value);
  };

  var filterHousingGuests = function (pin) {
    return housingGuests.value === ANY_VALUE ||
      pin.offer.guests === Number(housingGuests.value);
  };

  var filterMapFeatures = function (pin, features) {
    var pinFeatures = pin.offer.features;

    return features.every(function (feature) {
      return pinFeatures.includes(feature);
    });
  };

  var filterPins = function (pins) {
    var pinsArray = [];
    var features = Array.from(
        mapFeatures.querySelectorAll('input:checked'))
    .map(function (feature) {
      return feature.value;
    });
    var i = 0;
    while (pinsArray.length < PINS_AMOUNT && i < pins.length) {
      var pin = pins[i];
      if (filterHousingType(pin) &&
      filterHousingPrices(pin) &&
      filterHousingRooms(pin) &&
      filterHousingGuests(pin) &&
      filterMapFeatures(pin, features)) {
        pinsArray.push(pin);
      }
      i++;
      window.cards.onCardClickClose();
    }
    return pinsArray;
  };

  window.filter = {
    filterPins: filterPins
  };
})();
