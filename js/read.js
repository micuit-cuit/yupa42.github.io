
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
    let load=document.getElementById("loadDiv");
    console.log(load);
    if (int == 1) {
      console.log(int);
    load.style.display = "block";
    console.log(int);
    }else{
    load.style.display = "none";
    }
  }  
function retour(){
  window.location.href = 'mesage.html';
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
function file(){
const input = document.getElementById('imageUploads');
const preview = document.getElementById('preview');

input.style.display = "none";

input.addEventListener('change', updateImageDisplay);

function updateImageDisplay() {
  while(preview.firstChild) {
    preview.removeChild(preview.firstChild);
  }

  const curFiles = input.files;
  if(curFiles.length === 0) {
    const para = document.createElement('p');
    para.textContent = 'No files currently selected for upload';
    preview.appendChild(para);
  } else {
    const list = document.createElement('ol');
    preview.appendChild(list);

    for(const file of curFiles) {
      const listItem = document.createElement('div');
        listItem.className = ("Pfile");
        listItem.innerHTML = (`[${file.name}][${returnFileSize(file.size)}]`) ;
      list.appendChild(listItem);
    }
  }
}
}

function returnFileSize(number) {
  if(number < 1024) {
    return number + 'bytes';
  } else if(number > 1024 && number < 1048576) {
    return (number/1024).toFixed(1) + 'KB';
  } else if(number > 1048576) {
    return (number/1048576).toFixed(1) + 'MB';
  }
}

//if the token is invalid, display the login page
login(1);
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
      login(0);
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
function getTexte(){
  const editor = document.getElementById("editor");
  editor.addEventListener('change', updateEditor);
  console.log("OKKKKKKKKKKKKKKKKKKKK")
function updateEditor() {
 const intEditor = document.getElementsByClassName("ck ck-content ck-editor__editable ck-rounded-corners ck-editor__editable_inline ck-blurred");
 const div = document.getElementById("1");
 div.document.innerHTML = intEditor
}
}
