"use strict";

window.onload = function() {
	let button = document.getElementById("bbb");
	
	button.onclick = function() {
		let field_1 = document.getElementById("xxx");
		let field_2 = document.getElementById("yyy");
		let xx = field_1.value;
		let yy = field_2.value;
		let xx_integer = parseInt(xx);
		let yy_integer = parseInt(yy);
		let summa = xx_integer + yy_integer;
		alert(summa);
		let label = document.getElementById("ppp");
		label.innerHTML = label.innerHTML + "<br>" + summa;
	};
	
	let seconds = 0;
	
	let resetBtn = document.getElementById("qqq");
	resetBtn.onclick = function() {
		seconds = 0;
		let timerLabel = document.getElementById("hhh");
		timerLabel.innerHTML = seconds;
	};
	
	
	let myInter = setInterval(function() {
		seconds += 1;
		let timerLabel = document.getElementById("hhh");
		timerLabel.innerHTML = seconds;
	}, 1000);
};
