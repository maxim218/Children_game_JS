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
        holst.fillStyle = '#2F4F4F';
        holst.fillRect(0, 0, 800, 600);
    }

    drawFon();
	
	//draw cyrcle (x1, y1 - centre)
	function drawCyrcle(x1, y1, R, color="#00FF00") {
		holst.lineWidth = 2;
        holst.strokeStyle = color;
		holst.beginPath();
		holst.arc(x1,y1,R,0,Math.PI*2,true); // Внешняя окружность
		holst.stroke();
	}

	// left and right, up and down
    let a = false;
    let d = false;
	let w = false;
	let s = false;
	
    // event of key down
    window.onkeydown = function (event) {
        let keyNumber = event.keyCode;
        if(keyNumber === 65) {
            a = true;
        }
        if(keyNumber === 68) {
            d = true;
        }
		if(keyNumber === 87) {
            w = true;
        }
        if(keyNumber === 83) {
            s = true;
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
		if(keyNumber === 87) {
            w = false;
        }
        if(keyNumber === 83) {
            s = false;
        }
    };
	
	// get random number
    function getRandomNumber(k) {
        let r = Math.random();
        let m = r * 10000;
        let n = parseInt(m);
        let result = n % k;
        return result;
    }

	////////////////////////////////////////////////

    // create empty array
    let arr = [];

    // array size
    let size = 50;
	
	// enemy radius
	let enemyRadius = 35;

	// function drawEnemy
    function drawEnemy(x_enemy, y_enemy, R) {
        drawCyrcle(x_enemy, y_enemy, R);
    }

    // push elements to array
    for(let i = 0; i < size; i++) {
        let randomValue = getRandomNumber(16);
        let positionX = 30 + randomValue * 50;
		randomValue = getRandomNumber(12);
		let positionY = randomValue * 50;
        let enemy = {
            xx: positionX,
            yy: positionY,
			R: enemyRadius,
            dead: false,
        };
        arr.push(enemy);
    }

    // move to down size all enemies and draw them
    function moveAndDrawAllEnemies() {
        for(let i = 0; i < size; i++) {
            if(arr[i].dead === false) {
                drawEnemy(arr[i].xx, arr[i].yy, arr[i].R);
				arr[i].R -= 0.5;
				if (arr[i].R < 0) {
					arr[i].dead = true;
				}
            }
        }
    }
	////////////////////////////////////////////////
	
	// hero position
    let xx = 400;
    let yy = 300;
	
	let heroRadius = 15;
	
	let heroSpeed = 5;

    // draw hero function
    function drawHero() {
        let color = "#FF6347";
        drawCyrcle(xx,yy,heroRadius,color);
    }

    drawHero();
	
	// move hero function
    function moveHero() {
        if(a === true) {
            if(xx >= heroRadius + heroSpeed) {
                xx -= heroSpeed;
            }
        }
        if(d === true) {
            if(xx <= 800 - (heroRadius + heroSpeed)) {
                xx += heroSpeed;
            }
        }
		if(w === true) {
            if(yy >= heroRadius + heroSpeed) {
                yy -= heroSpeed;
            }
        }
        if(s === true) {
            if(yy <= 600 - (heroRadius + heroSpeed)) {
                yy += heroSpeed;
            }
        }
    }

    // score of hero
    let score = 0;

    // print score
    scoreLabel.innerHTML = "Очки: " + score;

    // control hitTest enemies with hero
    function controlHitTest() {
        for(let i = 0; i < size; i++) {
            let distance_x = Math.abs(arr[i].xx - xx);
            let distance_y = Math.abs(arr[i].yy - yy);
            let distance_hit_ok = arr[i].R + heroRadius;
            if(arr[i].dead === false) {
                if (distance_x <= distance_hit_ok) {
                    if (distance_y <= distance_hit_ok) {
                        let bonus_radius = Math.abs(enemyRadius - arr[i].R);
                        arr[i].dead = true;
                        score++;
                        scoreLabel.innerHTML = "Очки: " + score;
                        for(let i = 0; i < size; i++) {
                            arr[i].R += bonus_radius;
                        }
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
	
	function isGameFinished() {
	    let count = 0;
		for (let i = 0; i < size; i++) {
		    if (arr[i].dead) {
		        count++;
            }
        }
        if (count === 50) {
		    return true;
        }
        return false;
	}
	
	// repeating function
    let timeWorker = setInterval(function() {
        let gameFinished = isGameFinished();
        if(gameFinished === false) {
            if (pause === false) {
                drawFon();
				moveHero();
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
