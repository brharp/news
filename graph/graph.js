
function ChartWindow() {
	DefaultWindow.call(this, 0, 0, 500, 500);
	var self = this;
	var items = ["sin", "cos", "damped", "sum"];
	self.clientmenu = new Menu(items, function(i) {
		ws.send(i);
	});
}

ChartWindow.prototype = Object.create(DefaultWindow.prototype);
ChartWindow.prototype.constructor = ChartWindow;
ChartWindow.prototype.super = DefaultWindow.prototype;

displaylist = function() {};
	/* Define an empty display list. */

ChartWindow.prototype.paint = function() {
	/* A function to paint the chart. */
	var context = this.canvas.getContext("2d");
	context.save();
	context.scale(this.canvas.width/13, this.canvas.height/3);
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

chartWindow = new ChartWindow();
chartWindow.show();

var ws = new WebSocket('ws://localhost:8080/');
ws.onmessage = function(event) {
	var geval = eval;
	geval(event.data);
};

