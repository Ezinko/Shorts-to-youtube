// ==UserScript==
// @name        Shorts To Youtube video
// @namespace   Violentmonkey Scripts
// @match       https://www.youtube.com/*
// @version     3.0
// @author      Kouta e DZ
// @description 27/05/2023 06:03:00
// ==/UserScript==

let isON;

const textStyle = `
.butaostyle {
  font-style: oblique;
  font-weight: 600;
  background-color:rgb(70,70,70);
  opacity:0.6;
  border: none;
  color: white;
  padding: 8px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 12px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 8px;
}
.butaostyle:hover {
  background-color: grey;
}
.toggledButton {
  font-style: oblique;
  font-weight: 600;
  background-color:rgb(0,200,200);
  opacity:0.6;
  border: none;
  color: white;
  padding: 8px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 12px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 8px;
}
.toggledButton:hover {
  background-color: rgb(0, 255, 255);
}`;

css();

function css() {
    const style = document.createElement("style");
    style.type = "text/css";
    style.innerHTML = textStyle;
    document.head.appendChild(style);
}

function addButton(){
  var element = document.getElementById("buttonChangeShorts");

  if (element != null){
      element.remove(buttonChangeShorts);
  }
  if (!window.location.search.includes("list")){
    if (window.location.pathname.includes("shorts") || window.location.pathname.includes("watch")){
      var elementYoutube = document.getElementById("center");
      const btn = document.createElement("button");
      btn.addEventListener("click", replaceURL);

      if (window.location.pathname.includes("shorts")){
        var texto = document.createTextNode("Change to video");
      }
      else{
        texto = document.createTextNode("Change to shorts");
      }

      btn.setAttribute("id","buttonChangeShorts");
      btn.setAttribute("class", "butaostyle");
      btn.appendChild(texto);
      elementYoutube.prepend(btn);
    }
  }
}

function addToggleButton(){
  var element = document.getElementById("toggleShortsButton");

  if (element == null){
    var elementYoutube = document.getElementById("end");
    const tglBtn = document.createElement("button");
    if (sessionStorage.getItem("saveBool") == "True"){
      var texto = document.createTextNode("ON");
      isON = true;
      tglBtn.setAttribute("class", "toggledButton");
    }
    else{
      var texto = document.createTextNode("OFF");
      isON = false;
      tglBtn.setAttribute("class", "butaostyle");
    }

    tglBtn.addEventListener("click", function(){
      tglBtn.removeChild(texto);
      if (isON){
        isON = false;
        texto = document.createTextNode("OFF");
        tglBtn.setAttribute("class", "butaostyle");
        sessionStorage.setItem("saveBool", "False");
      }
      else{
        isON = true;
        texto = document.createTextNode("ON");
        tglBtn.setAttribute("class", "toggledButton");
        sessionStorage.setItem("saveBool", "True");
      }
      tglBtn.appendChild(texto);
    })

    tglBtn.setAttribute("id","toggleShortsButton");
    tglBtn.appendChild(texto);
    elementYoutube.prepend(tglBtn);
  }
}

function replaceURL() {
  var theURLpathname = window.location.pathname;

  if(theURLpathname.includes("shorts/")){
    var newURL = theURLpathname.replace("shorts/", "watch?v=");
    window.location = "https://www.youtube.com" + newURL;
  }
  else if(theURLpathname.includes("watch") && isON == false){
    var textoURL = window.location.search;
    var id = textoURL.substring(3, textoURL.length);
    window.location = "https://www.youtube.com/shorts/" + id;
  }
};

document.addEventListener("yt-navigate-finish", function() {
  addButton();
  addToggleButton();
  if (isON){
    replaceURL();
  }
}, false);

if(document.getElementById("toggleShortsButton") == null){
  addToggleButton();
}

if(document.getElementById("buttonChangeShorts") == null){
  addButton();
}
