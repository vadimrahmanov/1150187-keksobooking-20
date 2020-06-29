'use strict';

(function () {
  var PRICES = {bungalo: 0, flat: 1000, house: 5000, palace: window.data.MAX_PRICE};
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

  typeSelect.addEventListener('change', function (evt) {
    priceInput.min = PRICES[evt.target.value];
    priceInput.placeholder = PRICES[evt.target.value];
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

  window.form = {
    adForm: adForm,
    adFormFields: adFormFields,
    addressInput: addressInput,
    mapFiltersElements: mapFiltersElements
  };
})();
