'use strict';
(function () {
  var getRandomArray = function (arr) {
    var rand = Math.floor(Math.random() * arr.length);
    return arr[rand];
  };

  var getRandomNumber = function (min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  };

  var getRandomArrayLength = function (arr) {
    return arr.slice(0, getRandomNumber(1, arr.length));
  };

  window.util = {
    getRandomArray: getRandomArray,
    getRandomNumber: getRandomNumber,
    getRandomArrayLength: getRandomArrayLength
  };
})();
