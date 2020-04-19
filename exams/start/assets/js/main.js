
var video = document.querySelector("#videoElement");

if (navigator.mediaDevices.getUserMedia) {
  navigator.mediaDevices.getUserMedia({ video: true })
    .then(function (stream) {
      video.srcObject = stream;
    })
    .catch(function (err0r) {
      console.log("Something went wrong!");
    });
}



var min = 15;
var sec = 00;
var f = new Date();
function f2() {
    if (parseInt(sec) > 0) {
        sec = parseInt(sec) - 1;
        document.getElementById("min-field").innerHTML = min;
        document.getElementById("sec-field").innerHTML = sec;
        setTimeout("f2()", 1000);
    }
    else {
        if (parseInt(sec) == 0) {
            min = parseInt(min) - 1;
            if (parseInt(min) == 0) {
                clearTimeout(tim);
                location.href = "default5.aspx";
            }
            else {
                sec = 60;
                document.getElementById("min-field").innerHTML = min;
                document.getElementById("sec-field").innerHTML = sec;
                setTimeout("f2()", 1000);
            }
        }

    }
}
