
function DefaultWindow(x, y, width, height) {
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
}

DefaultWindow.prototype = Object.create(null);
DefaultWindow.prototype.constructor = DefaultWindow;

DefaultWindow.prototype.paint = function () {
	var canvas = this.canvas;
	var width = canvas.width;
	var height = canvas.height;
	var context = canvas.getContext("2d");
	context.clearRect(0, 0, width, height);
};

DefaultWindow.prototype.show = function () {
	var self = this;
	this.canvas = document.createElement("canvas");
	this.canvas.width = this.width;
	this.canvas.height = this.height;
	this.canvas.style.position = "absolute";
	this.canvas.style.left = this.x + "px";
	this.canvas.style.top = this.y + "px";
	this.canvas.addEventListener('mouseup', function(event) {
		self.contextmenu(event);
	});
	document.body.appendChild(this.canvas);
	this.paint();
};

DefaultWindow.prototype.destroy = function () {
	document.body.removeChild(this.canvas);
};

DefaultWindow.prototype.move = function (x, y) {
	this.x = x;
	this.y = y;
};

DefaultWindow.prototype.contextmenu = function (event) {
	this.clientmenu.move(event.clientX, event.clientY);
	this.clientmenu.show();
};

