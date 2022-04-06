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
    function mesage(){
      un=document.getElementById("1");
      deux=document.getElementById("2");
      int=document.getElementById("int");
      mes=document.getElementById("mes");
      mes.style.display = "none";
      int.style.display = "block";
      un.style.width = "100%";
      deux.style.width = "0%";
      } 
    function back(){
      un=document.getElementById("1");
      deux=document.getElementById("2");
      int=document.getElementById("int");
      mes=document.getElementById("mes");
      un.style.width = "0%";
      deux.style.width = "100%";
      mes.style.display = "block";
      int.style.display = "none";
      } 
  //get year scolar
  var year = new Date().getFullYear();
  //if actual date is in a 1 september > 30 december year = year "-" year + 1 else year = 1 - year "-" year  
  if (new Date().getMonth() > 8) {
    var yearScolar = year + "-" + (year + 1);
  } else {
    var yearScolar = (year - 1) + "-" + year;
  }
//get the mesage
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
  "body": "data={\n    \"anneeMessages\": \""+yearScolar+"\"\n}",
  "method": "POST",
  "mode": "cors",
  "credentials": "omit"
}).then(response => response.json())
    .then(data => {
        console.log(data);
//create a card for each message
for (var i = 0; i < data.data.pagination.messagesRecusCount; i++) {
    var card = document.createElement("div");
    card.className = "card";
    //card add random color
    card.style.backgroundColor = randomColor({luminosity: 'light'});
    //add onclick (mesage()) to card
    card.setAttribute("onclick", "mesage(data.data.messages.received[i].id)")
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
    );
