/**
 * New node file
 */
var xd = 1, yd = 0, Points = 0, xdst = [], ydst = [], ymax = 16, xmax = 24; 

$(document).ready(function() {
	$(this).keydown(function(event) {
		
		if (event.keyCode === 40 && Math.abs(ydst[ydst.length - 1]) !== 1) {
			xdst.push(0), ydst.push(1);
		}
		if (event.keyCode === 39 && Math.abs(xdst[xdst.length - 1]) !== 1) {
			xdst.push(1), ydst.push(0);
		}
		if (event.keyCode === 38 && Math.abs(ydst[ydst.length - 1]) !== 1) {
			xdst.push(0), ydst.push(-1);
		}
		if (event.keyCode === 37 && Math.abs(xdst[xdst.length - 1]) !== 1) {
			xdst.push(-1), ydst.push(0);
		}
	});
	$("#apple").css("left", 40 * parseInt($("#apple").attr("data-x")));
	$("#apple").css("top", 40 * parseInt($("#apple").attr("data-y")));
	setInterval(setPos, 500);
});
function setPos() {
	console.log(xdst, ydst);
	if(xdst.length !== 0 && ydst.length !== 0) {
		if ((xdst[0] !== (-1 * xd)) && (ydst[0] !== (-1 * yd))) {
			xd = xdst.shift(), yd = ydst.shift();
		} else {
			xdst.shift(), ydst.shift();
		}
		
	}
	$("#1").attr("data-x", parseInt($("#1").attr("data-x")) + xd);
	$("#1").attr("data-y", parseInt($("#1").attr("data-y")) + yd);
	if (parseInt($("#1").attr("data-y")) > ymax) {
		$("#1").attr("data-y", 0);
	}
	if (parseInt($("#1").attr("data-x")) > xmax) {
		$("#1").attr("data-x", 0);
	}
	if (parseInt($("#1").attr("data-y")) < 0) {
		$("#1").attr("data-y", ymax);
	}
	if (parseInt($("#1").attr("data-x")) < 0) {
		$("#1").attr("data-x", xmax);
	}
	$(".snakebody").each(function() {
		$(this).css("left", 40 * parseInt($(this).attr("data-x")));
		$(this).css("top", 40 * parseInt($(this).attr("data-y")));
		$(this).attr("data-x", $(this).next().attr("data-x"));
		$(this).attr("data-y", $(this).next().attr("data-y"));
	});
	changeApplePos();
}
function changeApplePos() {
	if ($("#1").attr("data-x") === $("#apple").attr("data-x") &&
			$("#1").attr("data-y") === $("#apple").attr("data-y")) {
		$("#apple").attr("data-x", Math.floor(Math.random()*xmax));
		$("#apple").attr("data-y", Math.floor(Math.random()*ymax));
		$("#apple").css("left", 40 * parseInt($("#apple").attr("data-x")));
		$("#apple").css("top", 40 * parseInt($("#apple").attr("data-y")));
		Points++;
		$("#points").text(Points);
		var newBody = document.createElement("div");
		$(newBody).attr("class", "snakebody");
		$(newBody).attr("id", $(".snakebody").length + 1);
		$(newBody).attr("style", "display: none");
		$(newBody).attr("data-x", $(".snakebody").first().attr("data-x"));
		$(newBody).attr("data-y", $(".snakebody").first().attr("data-y"));
		$("#apple").after(newBody);
		$(".snakebody").first().show();
	}
}