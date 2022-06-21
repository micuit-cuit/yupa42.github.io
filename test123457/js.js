console.log('Hello World');
var img = [
    "media/Ubuntu_01.jpg",
    "media/Ubuntu_02.jpg",
    "media/Ubuntu_03.jpg",
    "media/Ubuntu_04.jpg",
    "media/Ubuntu_05.jpg"
    ]

var len= img.length;
console.log(img);
function imgCusom(){
    // get valiue from input
    var len = document.getElementById("input").value;
    console.log(len);
    document.getElementById("display").innerHTML = len;
    
    document.getElementById("div1").innerHTML = " ";
    document.getElementById("div2").innerHTML = " ";
    document.getElementById("div3").innerHTML = " ";
    document.getElementById("div4").innerHTML = " ";
    document.getElementById("div5").innerHTML = " ";
    document.getElementById("div6").innerHTML = " ";
    document.getElementById("div7").innerHTML = " ";
    document.getElementById("div8").innerHTML = " ";
    document.getElementById("div9").innerHTML = " ";
    document.getElementById("div10").innerHTML = " ";
    document.getElementById("div11").innerHTML = " ";

    if ( len == 1) {

        document.getElementById("div9").innerHTML = "<img src='" + img[0] + "'>";


    }
    if ( len == 2) {

        document.getElementById("div1").innerHTML = "<img src='" + img[0] + "'>";
        document.getElementById("div10").innerHTML = "<img src='" + img[1] + "'>";

    }
    if ( len == 3) {

        document.getElementById("div1").innerHTML = "<img src='" + img[0] + "'>";
        document.getElementById("div7").innerHTML = "<img src='" + img[1] + "'>";
        document.getElementById("div8").innerHTML = "<img src='" + img[2] + "'>";
    }
    if ( len == 4) {

        document.getElementById("div11").innerHTML = "<img src='" + img[0] + "'>";
        document.getElementById("div6").innerHTML = "<img src='" + img[1] + "'>";
        document.getElementById("div7").innerHTML = "<img src='" + img[2] + "'>";
        document.getElementById("div8").innerHTML = "<img src='" + img[3] + "'>";


    }
    if ( len == 5) {

        document.getElementById("div1").innerHTML = "<img src='" + img[0] + "'>";
        document.getElementById("div2").innerHTML = "<img src='" + img[1] + "'>";
        document.getElementById("div3").innerHTML = "<img src='" + img[2] + "'>";
        document.getElementById("div4").innerHTML = "<img src='" + img[3] + "'>";
        document.getElementById("div5").innerHTML = "<img src='" + img[4] + "'>";
    }
}