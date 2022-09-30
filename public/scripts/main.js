let timeOnLoadClient = (function () {
  let timeNow = new Date().getTime();
  let timeOnLoad = (timeNow - performance.timeOrigin) / 1000;
  return timeOnLoad.toFixed(2);
})();

let timeOnLoadServer = (function () {
  let docCookie = `; ${document.cookie}`;
  let response = docCookie.split(`; cookieLoadTime=`);
  return response.pop().split(';').shift();
})();
