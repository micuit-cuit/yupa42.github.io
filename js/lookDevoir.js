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
  function $_GET(param) {
    var vars = {};
    window.location.href.replace( location.hash, '' ).replace( 
        /[?&]+([^=&]+)=?([^&]*)?/gi, // regexp
        function( m, key, value ) { // callback
            vars[key] = value !== undefined ? value : '';
        }
    );

    if ( param ) {
        return vars[param] ? vars[param] : null;    
    }
    return vars;
}
function base64DecodeUnicode(str) {
      // Convert Base64 encoded bytes to percent-encoding, and then get the original string.
      percentEncodedStr = atob(str).split('').map(function(c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join('');
  
  
      return decodeURIComponent(percentEncodedStr);
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
var idDevoir = $_GET('id');
var dateDevoir = $_GET('date'); 
console.log(idDevoir);
//display devoir

fetch("https://api.ecoledirecte.com/v3/"+typeUserLong+"/"+idUser+"/cahierdetexte/"+dateDevoir+".awp?verbe=get&v=4.9.0", {
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
console.log(data);
        setDisplay(data);
    });
function setDisplay(data){
var numberDevoir=data.data.matieres.length;
//loop sur les devoirs
for(var i=0;i<numberDevoir;i++){
    //si id=idDevoir on affiche
    if(data.data.matieres[i].id==idDevoir){
        //get les données
        var doner=base64DecodeUnicode(data.data.matieres[i].aFaire.contenu);
        var matiere=data.data.matieres[i].matiere;
        var donneLe=data.data.matieres[i].aFaire.donneLe;
        var effectue=data.data.matieres[i].aFaire.effectue;
        var interrogation=data.data.matieres[i].interrogation;
        //create the div
        var div=document.createElement("div");
        div.setAttribute("class","devoir");
        //create the h1
        var h1=document.createElement("h1");
        h1.innerHTML=matiere;
        //create the p
        var p=document.createElement("p");
        p.innerHTML=doner;
        //create the p
        var p2=document.createElement("p");
        p2.id="date";
        p2.innerHTML="Donné le : "+donneLe;
        //create the notif
        if (effectue == false){
            var effectueDiv=document.createElement("div");
            effectueDiv.innerHTML="à faire";
            effectueDiv.setAttribute("class","notif");
            effectueDiv.setAttribute("id","notifEffectue");
            effectueDiv.setAttribute("onclick","effectue("+data.data.matieres[i].id+",true)");
            div.appendChild(effectueDiv);
        }else{
            var effectueDiv=document.createElement("div");
            effectueDiv.innerHTML="effectué";
            effectueDiv.setAttribute("class","notifEffectue");
            effectueDiv.setAttribute("id","notifEffectue");
            effectueDiv.setAttribute("onclick","effectue("+data.data.matieres[i].id+",false)");
            div.appendChild(effectueDiv);
        }
        if (interrogation == true){
            var interrogationDiv=document.createElement("div");
            interrogationDiv.innerHTML="interrogation";
            interrogationDiv.setAttribute("class","notif");
            interrogationDiv.setAttribute("id","notifInterrogation");
            div.appendChild(interrogationDiv);
        }
        //if doner contains kwyk add  a link "https://www.kwyk.fr/devoirs/"
        if(doner.includes("kwyk")||doner.includes("Kwyk")||doner.includes("KWYK")||doner.includes("KWYK.fr")||doner.includes("KWYK.FR")||doner.includes("KWYK.fr")||doner.includes("KWYK.FR")){
            var a=document.createElement("a");
            a.setAttribute("href","https://www.kwyk.fr/devoirs/");
            a.innerHTML="kwyk link";
            p.appendChild(a);
        }
        //parente all the elements
        div.appendChild(h1);
        div.appendChild(p);
        div.appendChild(p2);
        //parente all the elements
        var contenaire = document.getElementById("contenaire");
        console.log(contenaire);
        console.log(div);
        contenaire.appendChild(div);
    }
}

}
function effectue(id , efectuer){
    if(efectuer==true){
var notifEffectue=document.getElementById("notifEffectue");
notifEffectue.innerHTML="effectué";
notifEffectue.setAttribute("onclick","effectue("+id+",false)");
    fetch("https://api.ecoledirecte.com/v3/"+typeUserLong+"/"+idUser+"/cahierdetexte.awp?verbe=put&v=4.9.0", {
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
        "body": "data={\n    \"idDevoirsEffectues\": [\n        "+id+"\n    ],\n    \"idDevoirsNonEffectues\": []\n}",
        "method": "POST",
        "mode": "cors",
        "credentials": "omit"
      });}else{
        var notifEffectue=document.getElementById("notifEffectue");
notifEffectue.innerHTML="à faire";
notifEffectue.setAttribute("onclick","effectue("+id+",true)");
        fetch("https://api.ecoledirecte.com/v3/"+typeUserLong+"/"+idUser+"/cahierdetexte.awp?verbe=put&v=4.9.0", {
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
      "body": "data={\n    \"idDevoirsEffectues\": [\n\n    ],\n    \"idDevoirsNonEffectues\": ["+id+"]\n}",
      "method": "POST",
      "mode": "cors",
      "credentials": "omit"});
    }

}
