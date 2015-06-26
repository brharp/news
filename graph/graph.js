
displaylist = function() {};
	/* Define an empty display list. */

function paintchart() {
	/* A function to paint the chart. */
	var cv = document.getElementsByTagName("canvas")[0];
	var context = cv.getContext("2d");
	context.save();
	context.scale(cv.width/13, cv.height/3);
		/* New coordinate system is 13x3. */
	context.clearRect(0, 0, 13, 3);
		/* Clear the chart. */
	context.translate(0, 1.5);
		/* Put (0,0) in the middle at the left. */
	context.beginPath();
	context.moveTo(0, 0);
	context.lineTo(13, 0);
		/* X axis. */
	context.moveTo(0, 0);
	displaylist(context);
		/* Invoke the display list function. */
	context.restore();
	context.stroke();
		/* Draw it. */
}

function paintmenu(context, selection, items) {
	context.save();
	context.font = '13px sans-serif';
	context.clearRect(0, 0, 100, 16 * items.length);
	context.strokeRect(0, 0, 100, 16 * items.length);
	for (var i = 0; i < items.length; i++) {
		if (selection == i) {
			context.fillStyle = 'black';
			context.strokeStyle = "white";
		} else {
			context.fillStyle = "white";
			context.strokeStyle = "black";
		}
		context.fillRect(0, 16*i, 100, 16);
		context.strokeText(items[i], 0, 16 * (i+1));
	}
	context.restore();
}

function contextmenu(event) {
	var body = document.body;
	var cv = event.target;
	var menux = event.clientX;
	var menuy = event.clientY;
	var items = ["sin", "cos", "damped", "sum"];
	var selection = -1;

	var popup = document.createElement("canvas");
	popup.width = 100;
	popup.height = 16 * items.length;
	popup.style.position = "absolute";
	popup.style.left = menux + "px";
	popup.style.top  = menuy + "px";
	body.appendChild(popup);

	var context = popup.getContext("2d");
	paintmenu(context, selection, items);

	var onmousemove = function (event) {
		var x = event.clientX - menux;
		var y = event.clientY - menuy;
		var i;
		if (x >= 0 && x < 100 && y >= 0 && y < 16 * items.length) {
			i = Math.floor(y / 16);
		} else {
			i = -1;
		}
		if (selection != i) {
			selection = i;
			paintmenu(context, selection, items);
		}
	};

	var onmouseup = function (event) {
		/*
		 * If we don't stop event propagation here, the event
		 * will bubble up to the owner and trigger the menu again.
		 */
		event.stopPropagation();
		/*
		 * End mouse capture.
		 */
		body.removeEventListener('mousemove', onmousemove, true);
		body.removeEventListener('mouseup', onmouseup, true);
		/*
		 *  Close the popup menu.
		 */
		body.removeChild(popup);
		if (selection > -1) {
			ws.send(selection);
		} else {
			paintchart();
		}
	};

	body.addEventListener('mousemove', onmousemove, true);
	body.addEventListener('mouseup', onmouseup, true);
}

var cv = document.getElementsByTagName("canvas")[0];
cv.width = window.innerWidth;
cv.height = window.innerHeight;
cv.addEventListener('mouseup', contextmenu);

var ws = new WebSocket('ws://localhost:8080/');
ws.onmessage = function(event) {
	var geval = eval;
	geval(event.data);
};

