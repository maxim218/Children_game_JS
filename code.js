"use strict";

window.onload = function () {
    // get elements from html page
    let pauseBtn = document.getElementById("pauseBtn");
    let can = document.getElementById("can");
    let scoreLabel = document.getElementById("scoreLabel");

    // init drawing holst
    let holst = can.getContext("2d");

    // draw background in holst
    function drawFon() {
        holst.clearRect(0, 0, 800, 600);
        holst.fillStyle = '#269dff';
        holst.fillRect(0, 0, 800, 600);
    }

    drawFon();

    // draw one line
    function drawLine(x1, y1, x2, y2) {
        holst.lineWidth = 2;
        holst.strokeStyle = "#FF0000";
        holst.beginPath();
        holst.moveTo(x1, y1);
        holst.lineTo(x2, y2);
        holst.closePath();
        holst.stroke();
    }

    drawLine(0, 550, 800, 550);

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

    // get random number
    function getRandomNumber(k) {
        let r = Math.random();
        let m = r * 10000;
        let n = parseInt(m);
        let result = n % k;
        return result;
    }

    // create empty array
    let arr = [];

    // array size
    let size = 50;

    // y position of enemy for creating
    let positionY = -50;

    // function drawEnemy
    function drawEnemy(x_enemy, y_enemy) {
        holst.strokeStyle = "#40ff63";
        holst.lineWidth = 2;
        holst.strokeRect(x_enemy, y_enemy, 100, 50);
    }

    // push elements to array
    for(let i = 0; i < size; i++) {
        let randomValue = getRandomNumber(8);
        let positionX = randomValue * 100;
        let enemy = {
            xx: positionX,
            yy: positionY,
            dead: false,
        };
        arr.push(enemy);
        positionY -= 70;
    }

    // move to down size all enemies and draw them
    function moveAndDrawAllEnemies() {
        for(let i = 0; i < size; i++) {
            if(arr[i].yy < 560) {
                arr[i].yy += 5;
            }
            if(arr[i].dead === false) {
                drawEnemy(arr[i].xx, arr[i].yy);
            }
        }
    }

    // score of hero
    let score = 0;

    // print score
    scoreLabel.innerHTML = "Очки: " + score;

    // control hitTest enemies with hero
    function controlHitTest() {
        let hero_xc = xx + 50;
        let hero_yc = yy + 25;
        for(let i = 0; i < size; i++) {
            let enemy_xc = arr[i].xx + 50;
            let enemy_yc = arr[i].yy + 25;
            if(arr[i].dead === false) {
                if (Math.abs(hero_xc - enemy_xc) < 100) {
                    if (Math.abs(hero_yc - enemy_yc) < 50) {
                        arr[i].dead = true;
                        score++;
                        scoreLabel.innerHTML = "Очки: " + score;
                    }
                }
            }
        }
    }

    // pause variable
    let pause = false;

    // pause btn click
    pauseBtn.onclick = function() {
        pause = !pause;
        if(pause === true) {
            can.style.opacity = 0.5;
        }
        if(pause === false) {
            can.style.opacity = 1.0;
        }
    };

    // control is game finished
    function isGameFinished() {
        let count = 0;
        for(let i = 0; i < size; i++) {
            if(arr[i].yy >= 555) {
                count++;
            }
        }
        if(count === 50) {
            return true;
        }
        return false;
    }

    // repeating function
    let timeWorker = setInterval(function() {
        let gameFinished = isGameFinished();
        if(gameFinished === false) {
            if (pause === false) {
                moveHero();
                drawFon();
                drawLine(0, 550, 800, 550);
                drawHero();
                moveAndDrawAllEnemies();
                controlHitTest();
            }
        } else {
            clearInterval(timeWorker);
            alert("Результат игры: " + score + " / 50");
        }
    }, 50);
};
