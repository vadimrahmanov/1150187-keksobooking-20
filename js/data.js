'use strict';

(function () {
  var ACCOMODATION_TYPE = ['palace', 'flat', 'house', 'bungalo'];
  var CHECK_IN = ['12:00', '13:00', '14:00'];
  var CHECK_OUT = ['12:00', '13:00', '14:00'];
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var DESCRIPTIONS = ['Лучшее предложение в округе', 'Идеально для пар', 'Лучший отель по мнению TripAdvisor', 'Лучший бюджетный вариант', 'Шикарный вид из окна', 'Шикарный вариант для бизнесс-поездок', 'Выгодное предложение для семей', 'Номинант "Лучший отель в Токио"'];
  var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  var ANNOUNCMENT_AMOUNT = 8;
  var LOCATION = ['600, 350', '600, 350', '600, 350', '600, 350', '600, 350', '600, 350', '600, 350', '600, 350'];
  var MAX_PRICE = 10000;

  var getAnnouncmentArray = function () {
    var announcmentArray = [];
    for (var i = 1; i <= ANNOUNCMENT_AMOUNT; i++) {
      var xCoordinate = window.util.getRandomNumber(0, 1200);
      var yCoordinate = window.util.getRandomNumber(130, 630);
      announcmentArray.push({
        author: {
          avatar: 'img/avatars/user0' + i + '.png'
        },
        offer: {
          title: 'Заголовок',
          address: window.util.getRandomArray(LOCATION),
          price: window.util.getRandomNumber(0, MAX_PRICE),
          type: window.util.getRandomArray(ACCOMODATION_TYPE),
          rooms: window.util.getRandomNumber(1, 100),
          guests: window.util.getRandomNumber(1, 6),
          checkin: window.util.getRandomArray(CHECK_IN),
          checkout: window.util.getRandomArray(CHECK_OUT),
          features: window.util.getRandomArrayLength(FEATURES),
          description: DESCRIPTIONS[i],
          photos: window.util.getRandomArrayLength(PHOTOS)
        },
        location: {
          x: xCoordinate,
          y: yCoordinate
        }
      });
    }
    return announcmentArray;
  };

  window.data = {
    MAX_PRICE: MAX_PRICE,
    getAnnouncmentArray: getAnnouncmentArray
  };
})();
