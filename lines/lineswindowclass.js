
function LinesWindow(nlines) {
	var self = this;
	var items = ["5", "10", "15", "20"];
	DefaultWindow.call(self, null, 25, 25, 300, 300);
	self.nlines = nlines;
	self.clientmenu = new Menu(items, function (i) {
		if (i >= 0) {
			self.nlines = (i+1)*5;
			self.paint();
		}
	});
}

LinesWindow.prototype = Object.create(DefaultWindow.prototype);
LinesWindow.prototype.constructor = LinesWindow;
LinesWindow.prototype.super = DefaultWindow.prototype;

LinesWindow.prototype.paintclient = function () {
	//this.super.paint.call(this);
	//var context = this.canvas.getContext("2d");
	var context = this.canvas.getContext("2d");
	var rect = new Object();
	this.getClientRect(rect);
	context.fillStyle = "white";
	context.fillRect(0, 0, rect.right, rect.bottom);
	context.save();
	context.scale(rect.right, rect.bottom);
	context.beginPath();
	for (var i = 0; i <= 1; i += 1/this.nlines) {
		context.moveTo(0, 0);
		context.lineTo(1, i);
		context.moveTo(0, 0);
		context.lineTo(i, 1);
	}
	context.moveTo(0, 0);
	context.lineTo(1, 1);
	context.restore();
	context.stroke();
}

linesWindow = new LinesWindow(10);
linesWindow.show();

