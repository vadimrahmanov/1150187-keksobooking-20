'use strict';

(function () {
  var disableAdFormFields = function (boolean) {
    for (var i = 0; i < window.form.adFormFields.length; i++) {
      window.form.adFormFields[i].disabled = boolean;
    }
    window.form.addressInput.value = window.map.getPinCoordinats();
  };
  var disableMapFiltersForm = function (boolean) {
    for (var i = 0; i < window.form.mapFiltersElements.length; i++) {
      window.form.mapFiltersElements[i].disabled = boolean;
    }
  };
  var activatePage = function () {
    disableAdFormFields(false);
    disableMapFiltersForm(false);
    window.map.map.classList.remove('map--faded');
    window.form.adForm.classList.remove('ad-form--disabled');
    window.form.addressInput.value = window.map.getPinCoordinats();
    window.pin.renderPinElements();
    window.map.mainMapPin.removeEventListener('mousedown', activationPinClickHandler);
    window.map.mainMapPin.removeEventListener('keydown', activationPinKeydownHandler);
  };
  var activationPinClickHandler = function (evt) {
    if (evt.which === 1) {
      activatePage();
    }
  };
  var activationPinKeydownHandler = function (evt) {
    if (evt.key === 'Enter') {
      activatePage();
    }
  };
  window.map.mainMapPin.addEventListener('mousedown', activationPinClickHandler);
  window.map.mainMapPin.addEventListener('keydown', activationPinKeydownHandler);
  var onInit = function () {
    disableAdFormFields(true);
    disableMapFiltersForm(true);
  };
  window.addEventListener('load', onInit);
})();
