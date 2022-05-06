function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
  function base64DecodeUnicode(str) {
    // Convert Base64 encoded bytes to percent-encoding, and then get the original string.
    percentEncodedStr = atob(str).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join('');


    return decodeURIComponent(percentEncodedStr);
}
Element.prototype.remove = function() {
  this.parentElement.removeChild(this);
}
NodeList.prototype.remove = HTMLCollection.prototype.remove = function() {
  for(var i = this.length - 1; i >= 0; i--) {
      if(this[i] && this[i].parentElement) {
          this[i].parentElement.removeChild(this[i]);
      }
  }
}
function yearScolar () {
var year = new Date().getFullYear();
  //if actual date is in a 1 september > 30 december year = year "-" year + 1 else year = 1 - year "-" year  
  if (new Date().getMonth() > 8) {
    var yearScolar = year + "-" + (year + 1);
  } else {
    var yearScolar = (year - 1) + "-" + year;
  }
  return yearScolar;
}
function login(int){
  //if int =1 display load
  var load=document.getElementById("loadDiv");
  console.log(load);
  if (int == 1) {
    console.log(int);
  load.style.display = "block";
  console.log(int);
  }else{
  load.style.display = "none";
  }
}  
//get token in the cookie
var token = getCookie("token");
console.log(token);
//get id user in the cookie
var idUser = getCookie("idUser");
console.log(idUser);
//get type user in the cookie
var typeUser = getCookie("typeUser");
console.log(typeUser);
//if the token is not null, display the hub page
if (token == null) {
    //window.location.href = "index.html";
    }
//if the typeUser is E then set typeUserLong to "eleves"
if (typeUser == "E") {
    var typeUserLong = "eleves";
}
if (typeUser == "1") {
  var typeUserLong = "familles";
}
//if the typeUser is P then set typeUserLong to "professeurs"
if (typeUser == "P") {
    var typeUserLong = "professeurs";
}


//if the token is invalid, display the login page
setTimeout(function(){
loading(true);
fetch("https://api.ecoledirecte.com/v3/"+typeUser+"/"+idUser+"/timelineAccueilCommun.awp?verbe=get&v=4.6.0", {
  "headers": {
    "accept": "application/json, text/plain, */*",
    "accept-language": "fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7",
    "content-type": "application/x-www-form-urlencoded",
    "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"99\", \"Google Chrome\";v=\"99\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Linux\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-site",
    "x-token": token
  },
  "referrer": "https://www.ecoledirecte.com/",
  "referrerPolicy": "strict-origin-when-cross-origin",
  "body": "data={}",
  "method": "POST",
  "mode": "cors",
  "credentials": "omit"
}).then(response => response.json())
    .then(data => {
      loading(false);
      console.log(data);
        //if the token is invalid, display the login page
        if (data.message == "Token invalide !") {
            //window.location.href = "index.html";
            console.log("Token invalide !");
        }
        if (data.message == "Session expirée !") {
            //window.location.href = "index.html";
            console.log("Session expirée !");
        }
    }
    );
}, 1000);
    function mesage(id){
      un=document.getElementById("1");
      deux=document.getElementById("2");
      int=document.getElementById("int");
      mes=document.getElementById("mes");
      menu=document.getElementById("menu");
      menu.style.display = "none";
      mes.style.display = "none";
      int.style.display = "block";
      un.style.width = "100%";
      deux.style.width = "0%";
      readMessage(id)
      } 
    function back(){
      un=document.getElementById("1");
      deux=document.getElementById("2");
      int=document.getElementById("int");
      mes=document.getElementById("mes");
      menu=document.getElementById("menu");
      un.style.width = "0%";
      deux.style.width = "100%";
      mes.style.display = "block";
      menu.style.display = "block";
      int.style.display = "none";
      } 
 
mesageGet();
  //get year scolar
  
//get the mesage
function mesageGet () { 
  loading(true);
  fetch("https://api.ecoledirecte.com/v3/"+typeUserLong+"/"+idUser+"/messages.awp?force=true&typeRecuperation=received&idClasseur=0&orderBy=date&order=desc&query=&onlyRead=&page=0&itemsPerPage=20&verbe=getall&v=4.6.0", {
  "headers": {
    "accept": "application/json, text/plain, */*",
    "accept-language": "fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7",
    "content-type": "application/x-www-form-urlencoded",
    "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"100\", \"Google Chrome\";v=\"100\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Linux\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-site",
    "sec-gpc": "1",
    "x-token": token
  },
  "referrer": "https://www.ecoledirecte.com/",
  "referrerPolicy": "strict-origin-when-cross-origin",
  "body": "data={\n    \"anneeMessages\": \""+yearScolar()+"\"\n}",
  "method": "POST",
  "mode": "cors",
  "credentials": "omit"
}).then(response => response.json())
    .then(data => {
      loading(false);
      card(data);
    }
    );}
function card(data){
/*-----------------------------------------------------------------------------*/
console.log(data);
//del all card
document.getElementsByClassName("card").remove();
//create a card for each message
for (var i = 0; i < data.data.pagination.messagesRecusCount; i++) {
var card = document.createElement("div");
card.className = "card";
//card add random color
card.style.backgroundColor = randomColor({luminosity: 'light'});
//add onclick (mesage()) to card
card.setAttribute("onclick", "mesage("+data.data.messages.received[i].id+")");
//add id to card
card.id = data.data.messages.received[i].id;
var title = document.createElement("h2");
title.innerHTML = data.data.messages.received[i].subject;
var content = document.createElement("p");
content.innerHTML = data.data.messages.received[i].from.name;
card.appendChild(title);
card.appendChild(content);
document.getElementById("message_nodif_card").appendChild(card);
console.log(card);

}
}
function cardSent(data){
  /*-----------------------------------------------------------------------------*/
  console.log(data);
  //del all card
  document.getElementsByClassName("card").remove();
  //create a card for each message
  for (var i = 0; i < data.data.pagination.messagesEnvoyesCount; i++) {
  var card = document.createElement("div");
  card.className = "card";
  //card add random color
  card.style.backgroundColor = randomColor({luminosity: 'light'});
  //add onclick (mesage()) to card
  card.setAttribute("onclick", "mesage("+data.data.messages.sent[i].id+")");
  //add id to card
  card.id = data.data.messages.sent[i].id;
  var title = document.createElement("h2");
  title.innerHTML = data.data.messages.sent[i].subject;
  var content = document.createElement("p");
  content.innerHTML = data.data.messages.sent[i].from.name;
  card.appendChild(title);
  card.appendChild(content);
  document.getElementById("message_nodif_card").appendChild(card);
  console.log(card);
  
  }
  }
//get id and get message to id and display it
function readMessage(id){
  loading(true);
  fetch("https://api.ecoledirecte.com/v3/"+typeUserLong+"/"+idUser+"/messages/"+id+".awp?verbe=get&mode=destinataire&v=4.6.0", {
    "headers": {
      "accept": "application/json, text/plain, */*",
      "accept-language": "fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7",
      "content-type": "application/x-www-form-urlencoded",
      "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"100\", \"Google Chrome\";v=\"100\"",
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": "\"Linux\"",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-site",
      "sec-gpc": "1",
      "x-token": token
    },
    "referrer": "https://www.ecoledirecte.com/",
    "referrerPolicy": "strict-origin-when-cross-origin",
    "body": "data={\n    \"anneeMessages\": \""+yearScolar()+"\"\n}",
    "method": "POST",
    "mode": "cors",
    "credentials": "omit"
  }).then(response => response.json())
  .then(data => {
    loading(false);
    messageSet(data);
  })
}
function messageSet(data){
  document.getElementsByClassName("message").remove();
  var mesageDiv = document.createElement("div");
  mesageDiv.className = "message";
  var title = document.createElement("h2");
  title.innerHTML = data.data.subject;
  var content = document.createElement("p");
  content.innerHTML = base64DecodeUnicode(data.data.content);
  mesageDiv.appendChild(title);
  mesageDiv.appendChild(content);
  document.getElementById("int1").appendChild(mesageDiv);
}
//function mesagesens
function mesageSens () {
  loading(true);
  fetch("https://api.ecoledirecte.com/v3/"+typeUserLong+"/"+idUser+"/messages.awp?force=false&typeRecuperation=sent&idClasseur=0&orderBy=date&order=desc&query=&onlyRead=&page=0&itemsPerPage=20&verbe=getall&v=4.6.0", {
  "headers": {
    "accept": "application/json, text/plain, */*",
    "accept-language": "fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7",
    "content-type": "application/x-www-form-urlencoded",
    "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"100\", \"Google Chrome\";v=\"100\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Linux\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-site",
    "sec-gpc": "1",
    "x-token": token
  },
  "referrer": "https://www.ecoledirecte.com/",
  "referrerPolicy": "strict-origin-when-cross-origin",
  "body": "data={\n    \"anneeMessages\": \""+yearScolar()+"\"\n}",
  "method": "POST",
  "mode": "cors",
  "credentials": "omit"
}).then(response => response.json())
.then(data => {
  loading(false);
  cardSent(data);
});
}