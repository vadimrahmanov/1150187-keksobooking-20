'use strict';

(function () {
  var prices = {bungalo: 0, flat: 1000, house: 5000, palace: 10000};
  var adForm = document.querySelector('.ad-form');
  var adFormFields = adForm.querySelectorAll('.ad-form fieldset');
  var mapFiltersForm = document.querySelector('.map__filters');
  var mapFiltersElements = mapFiltersForm.querySelectorAll('select, fieldset');
  var addressInput = adForm.querySelector('#address');
  var priceInput = adForm.querySelector('#price');
  var typeSelect = adForm.querySelector('#type');
  var submitButton = adForm.querySelector('.ad-form__submit');
  var roomNumber = adForm.querySelector('#room_number');
  var capacity = adForm.querySelector('#capacity');
  var checkin = adForm.querySelector('#timein');
  var checkout = adForm.querySelector('#timeout');

  checkin.addEventListener('change', function (evt) {
    checkout.value = evt.target.value;
  });

  checkout.addEventListener('change', function (evt) {
    checkin.value = evt.target.value;
  });

  typeSelect.addEventListener('change', function (evt) {
    priceInput.min = prices[evt.target.value];
    priceInput.placeholder = prices[evt.target.value];
  });
  submitButton.addEventListener('click', function () {
    if (+roomNumber.value < +capacity.value) {
      capacity.setCustomValidity('Количество комнат не может быть меньше, чем количество гостей');
    } else if (+roomNumber.value === 100 && +capacity.value !== 0) {
      capacity.setCustomValidity('100 комнат не для гостей');
    } else {
      capacity.setCustomValidity('');
    }
  });

  var addressCoordinats = function () {
    addressInput.value = window.map.getPinCoordinats();
  };

  window.form = {
    adForm: adForm,
    adFormFields: adFormFields,
    addressInput: addressInput,
    mapFiltersElements: mapFiltersElements,
    addressCoordinats: addressCoordinats
  };
})();
