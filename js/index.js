//connect to ecoledirecte and the data to display them on my site
function connectToEcoledirecte() {
var login = document.getElementById("login").value;
var password = document.getElementById("password").value;
//if the login and passworld are betatest, display the hub page
if (login == "betatest" && password == "betatest") {
  document.cookie = "token=" + "betatest";
  document.cookie = "idUser=" + "betatest";
  document.cookie = "typeUser=" + "betatest"; 
  window.location.href = "hub.html";
}
fetch("https://api.ecoledirecte.com/v3/login.awp?v=4.6.0", {
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
    "x-token": ""
  },
  "referrer": "https://www.ecoledirecte.com/",
  "referrerPolicy": "strict-origin-when-cross-origin",
  "body": "data={\n    \"uuid\": \"\",\n    \"identifiant\": \""+login+"\",\n    \"motdepasse\": \""+password+"\",\n    \"isReLogin\": false\n}",
  "method": "POST",
  "mode": "cors",
  "credentials": "omit"
}).then(response => response.json())
  .then(data => {
    console.log(data);
    //display the error if the login is not correct
    if (data.message == "Identifiant et/ou mot de passe invalide !") {
      document.getElementById("error").innerHTML = "Identifiant invalide !";
      console.log("Identifiant invalide !");
    }else if (data.message == "Mot de passe invalide !") {
      document.getElementById("error").innerHTML = "Mot de passe invalide !";
      console.log("Mot de passe invalide !");
    } else if (data.message == "") {
      //if the login is correct, save the token in the cookie
      document.cookie = "token=" + data.token;
      console.log("Token saved");
      //get and save the idUser in the cookie in the data.account.[0].id
      document.cookie = "idUser=" + data.data.accounts[0].id;
      console.log("id saved")
      //get and save the typeUser in the cookie in the data.account.[0].type
      document.cookie = "typeUser=" + data.data.accounts[0].typeCompte;
      console.log("typeCompte saved")
      //switch to the hub page
      window.location.href = "hub.html";
    }
  })};