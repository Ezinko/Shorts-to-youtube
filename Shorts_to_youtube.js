// ==UserScript==
// @name        Shorts To Youtube video
// @namespace   Violentmonkey Scripts
// @match       https://www.youtube.com/*
// @version     1.2
// @author      Kouta e Bozo
// @description 29/12/2022 10:25:36
// ==/UserScript==

function replaceURL() {
  var theURL = window.location.pathname;
  if(theURL.includes('shorts/')){
    var newURL = theURL.replace('shorts/', 'watch?v=');
    window.location = "https://www.youtube.com" + newURL;
  }
};

replaceURL();

document.addEventListener('yt-navigate-start', function() {
  replaceURL();
}, false);
