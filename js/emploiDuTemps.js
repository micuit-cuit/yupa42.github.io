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
      /*
      //get the actual date in the format YYYY-MM-DD
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, '0');
      var mm = String(today.getMonth() + 1).padStart(2, '0');
      var yyyy = today.getFullYear();
      var date = yyyy + '-' + mm + '-' + dd;
      */
document.getElementById("iframe").src = "https://www.ecoledirecte.com/ "+ typeUser + "/" + idUser +"/CahierDeTexte";
