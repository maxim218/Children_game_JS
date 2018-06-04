"use strict";

window.onload = function () {
    // get elements from html page
    let startBtn = document.getElementById("startBtn");
    let pauseBtn = document.getElementById("pauseBtn");
    let can = document.getElementById("can");

    // init drawing holst
    let holst = can.getContext("2d");

    // draw background in holst
    function drawFon() {
        holst.clearRect(0, 0, 800, 600);
        holst.fillStyle = '#269dff';
        holst.fillRect(0, 0, 800, 600);
    }

    // draw background in holst
    drawFon();

    // left and right
    let a = false;
    let d = false;

    // event of key down
    window.onkeydown = function (event) {
        let keyNumber = event.keyCode;
        if(keyNumber === 65) {
            a = true;
        }
        if(keyNumber === 68) {
            d = true;
        }
    };

    // event of key up
    window.onkeyup = function (event) {
        let keyNumber = event.keyCode;
        if(keyNumber === 65) {
            a = false;
        }
        if(keyNumber === 68) {
            d = false;
        }
    };

    // repeating function
    let timeWorker = setInterval(function() {

    }, 50);
};
