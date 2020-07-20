'use strict';

(function () {
  var StatusCode = {
    OK: 200
  };

  var Url = {
    GET: 'https://javascript.pages.academy/keksobooking/data',
    POST: 'https://javascript.pages.academy/keksobooking/'
  };

  var TIMEOUT_IN_MS = 10000;

  var createRequest = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT_IN_MS;
    return xhr;
  };

  var getData = function (onLoad, onError) {
    var xhr = createRequest(onLoad, onError);
    xhr.open('GET', Url.GET);
    xhr.send();
  };

  var postData = function (data, onSuccess, onError) {
    var xhr = createRequest(onSuccess, onError);
    xhr.open('POST', Url.POST);
    xhr.send(data);
  };

  window.backend = {
    load: getData,
    upload: postData
  };
})();
