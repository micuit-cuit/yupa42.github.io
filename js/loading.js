//loading function for the page
//if lodin is true, setdisplay the loading div , add img and add the style 
//if loading is false, remove the loading div and the style
console.log("loading.js loaded");
function loading(loading){
    if(loading){
        console.log("loadingOn");
        var loadingDiv = document.createElement("div");
        loadingDiv.id = "loading";
        loadingDiv.style.position = "absolute";
        loadingDiv.style.bottom = "0";
        loadingDiv.style.right = "0";
        var img = document.createElement("img");
        img.src = "media/cat-loading.gif";
        loadingDiv.appendChild(img);
        document.body.appendChild(loadingDiv);
    }else{
        console.log("loadingOff");
        var loadingDiv = document.getElementById("loading");
        document.body.removeChild(loadingDiv);
    }
}
/*ime play in minecraft and a devloppe a client for ecoledirect */ 