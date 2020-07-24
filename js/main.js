'use strict';

(function () {
  var ENTER_BUTTON = 'Enter';
  var LEFT_MOUSE_BUTTON = 1;

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
    window.backend.load(window.pin.successHandler, window.pin.errorHandler);
    window.map.mainMapPin.removeEventListener('mousedown', onClickActivate);
    window.map.mainMapPin.removeEventListener('keydown', onKeyDownActivate);
  };
  var onClickActivate = function (evt) {
    if (evt.which === LEFT_MOUSE_BUTTON) {
      activatePage();
    }
  };
  var onKeyDownActivate = function (evt) {
    if (evt.key === ENTER_BUTTON) {
      activatePage();
    }
  };
  window.map.mainMapPin.addEventListener('mousedown', onClickActivate);
  window.map.mainMapPin.addEventListener('keydown', onKeyDownActivate);
  var onInit = function () {
    disableAdFormFields(true);
    disableMapFiltersForm(true);
  };
  window.addEventListener('load', onInit);

  window.main = {
    onInit: onInit,
    onClickActivate: onClickActivate,
    onKeyDownActivate: onKeyDownActivate
  };
})();
