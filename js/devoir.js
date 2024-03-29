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
    return "{}";
  }
function base64DecodeUnicode(str) {
      // Convert Base64 encoded bytes to percent-encoding, and then get the original string.
      percentEncodedStr = atob(str).split('').map(function(c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join('');
  
  
      return decodeURIComponent(percentEncodedStr);
  }

var colorsMatiere = JSON.parse(getCookie("colorsMatiere"));

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
    var typeUserLong = "Eleves";
}
if (typeUser == "1") {
  var typeUserLong = "Familles";
}
//if the typeUser is P then set typeUserLong to "professeurs"
if (typeUser == "P") {
    var typeUserLong = "professeurs";
}
//if the token is invalid, display the login page
//active the loading
function testToken() {
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
  }
      //get the actual date in the format YYYY-MM-DD
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, '0');
      var mm = String(today.getMonth() + 1).padStart(2, '0');
      var yyyy = today.getFullYear();
      var date = yyyy + '-' + mm + '-' + dd;

      //display the devoir in the container in card 
      function reset(){
        loading(true);
      fetch("https://api.ecoledirecte.com/v3/"+typeUserLong+"/"+idUser+"/cahierdetexte.awp?verbe=get&v=4.9.0", {
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
        "body": "data={}",
        "method": "POST",
        "mode": "cors",
        "credentials": "omit"
      }).then(response => response.json())
          .then(data => {
            loading(false);
      console.log(data);
    setdisplay(data);
    });}
function setdisplay(data){

//loop for all devoir 
//get name of object in data.data
var numberObject = Object.keys(data.data).length;
var object = Object.keys(data.data)
for (var i = 0; i < numberObject; i++) {
  //get length of data.data.{object[i]}
  var numberData = Object.keys(data.data[object[i]]).length;
  //loop for all data.data.{object[i]}
  for (var j = 0; j < numberData; j++) {
  
    //get intero of devoir
    var ifIntero = data.data[object[i]][j].interrogation;
    //get devoir id
    var devoirId = data.data[object[i]][j].idDevoir;
    //get color of devoir
    //get matier of devoir
    var matiereName = data.data[object[i]][j].matiere;
    // get codeMatiere
    var codeMatiere = data.data[object[i]][j].codeMatiere;
    //get color of matiere in colorsMatiere for codeMatiere
    var color = colorsMatiere[codeMatiere];
    //if the color is null, set add color to the matiere in cookies and set color to the matiere in colorsMatiere for codeMatiere
    if (color == null) {
      color = randomColor({luminosity: 'light'});
      //add color to  the object colorsMatiere
      colorsMatiere[codeMatiere] = color;
      console.log(colorsMatiere);
      document.cookie = "colorsMatiere="+JSON.stringify(colorsMatiere)+";expires=Fri, 31 Dec 9999 23:59:59 GMT";
      colorsMatiere = JSON.parse(getCookie("colorsMatiere"));
      console.log(colorsMatiere);
    }
    //get date of devoir
    var date = data.data[object[i]][j].donneLe;
    //get date of devoir in format YYYY-MM-DD
    
    var aFairePour = Object.keys(data.data)[i];
    //get effectue of devoir
    var ifEffectue = data.data[object[i]][j].effectue;
    //create card and add to devoir
    var card = document.createElement("div");
    card.className = "card";
    card.style.backgroundColor = color;
    card.innerHTML = "<H1>" + matiereName+"</H1>";
    card.innerHTML += "<H2>pour le : " + aFairePour+"</H2>";
    card.value = aFairePour;
    card.id = devoirId;
    card.onclick = function(){
      var id = this.id;
      var date = this.value;
      var url = "lookDevoir.html?id=" + id+"&date="+date;
      window.location.href = url;
    }
  card.innerHTML += "donne le : " + date;
  if (ifIntero == true) {
    var interrogation = document.createElement("div");
    interrogation.className = "interrogation";
    interrogation.innerHTML = "CONTROLE";
    card.appendChild(interrogation);
    
  }
  if (ifEffectue == true) {
    var effectue = document.createElement("div");
    effectue.className = "effectue";
    effectue.innerHTML = "";
    card.appendChild(effectue);
    }
  console.log(card);
  var contenaire = document.getElementById("contenaire");
  console.log(contenaire);
  contenaire.appendChild(card);
}}
}
//set delay for 0.1 second
setTimeout(function(){
testToken();
reset()
}, 100);

//detecte for all card if hover and execute function updateCar
window.onmousemove = mousemoved;
 
function mousemoved()
{

var cards = document.getElementsByClassName("card");
for (var i = 0; i < cards.length; i++) {
  cards[i].onmouseover = function(){
    updateCard(this);
  }
    cards[i].onmouseout = function(){
      updateCardOut(this);
    }
}
}
//if the user hover on the card, update the style card
function updateCard(e){
  //get the div in child avec class interrogation of card
  var div = e.getElementsByClassName("interrogation")[0];

  div.style += "top: -7px;left: 30%;animation-iteration-count: 0;transform: rotate(360deg);width: 140px;";
}
//if the user hover out the card, update the style card
function updateCardOut(e){
  var div = e.getElementsByClassName("interrogation")[0];

  div.style = "width: auto;background: red;position: absolute;padding: 3px;border-radius: 10px;top: -4px;left: -21px;transform: rotate(339deg);  transition: 0.5s;animation-name: interrogation;animation-duration: 0.7s;animation-iteration-count: infinite;";
}