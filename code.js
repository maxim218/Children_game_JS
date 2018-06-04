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


    // hero position
    let xx = 350;
    let yy = 500;

    // draw hero function
    function drawHero() {
        holst.strokeStyle = "#3c16ff";
        holst.lineWidth = 2;
        holst.strokeRect(xx, yy, 100, 50);
    }

    drawHero();

    // move hero function
    function moveHero() {
        if(a === true) {
            if(xx !== 0) {
                xx -= 10;
            }
        }
        if(d === true) {
            if(xx !== 700) {
                xx += 10;
            }
        }
    }

    // repeating function
    let timeWorker = setInterval(function() {
        moveHero();
        drawFon();
        drawHero();
    }, 50);
};
