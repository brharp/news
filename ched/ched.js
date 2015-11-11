
function ChedWindow(width, height) {
    var self = this;
	DefaultWindow.call(self, null, 0, 0, width, height);
	var self = this;
	var items = ["10px", "12px", "14px", "16px"];
	self.clientmenu = new Menu(items, function(i) {
		ws.send(i);
	});
}

ChedWindow.prototype = Object.create(DefaultWindow.prototype);
ChedWindow.prototype.constructor = ChedWindow;
ChedWindow.prototype.super = DefaultWindow.prototype;

displaylist = function() {};
	/* Define an empty display list. */

ChedWindow.prototype.paintclient = function() {
	/* A function to paint the ched. */
	var context = this.canvas.getContext("2d");
	var rect = new Object();
	this.getClientRect(rect);
    context.fillStyle = "white";
    context.fillRect(0, 0, rect.right, rect.bottom);

	context.save();
	displaylist(context);
		/* Invoke the display list function. */
	context.restore();
}

var ws = new WebSocket('ws://localhost:8080/');
ws.onmessage = function(event) {
	var geval = eval;
	console.log(event.data);
	geval(event.data);
};

