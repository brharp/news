
function DefaultWindow(x, y, width, height) {
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
}

DefaultWindow.prototype = Object.create(null);
DefaultWindow.prototype.constructor = DefaultWindow;

DefaultWindow.prototype.getClientRect = function(rect) {
	rect.left   = 0;
	rect.top    = 0;
	rect.right  = this.width - 32;
	rect.bottom = this.height - 32;
	return rect;
}

DefaultWindow.prototype.paint = function () {
	var context = canvas.getContext("2d");
	var rect = {};
	context.fillStyle = "gray";
	context.fillRect(this.x, this.y, this.width, this.height);
	context.save();
	this.getClientRect(rect);
	context.translate(this.x + 16, this.y + 16);
	context.beginPath();
	context.rect(0, 0, this.width - 32, this.height - 32);
	context.clip();
	this.paintclient();
	context.restore();
};

DefaultWindow.prototype.show = function () {
	var self = this;
	canvas.addEventListener('mouseup', this);
	this.paint();
};

DefaultWindow.prototype.handleEvent = function (event) {
	switch (event.type) {
	case 'mouseup':
		var x = event.clientX - this.x;
		var y = event.clientY - this.y;
		if (x >= 0 && x <= this.width && y >= 0 && y <= this.height) {
			this.contextmenu(event);
		}
		break;
	}
};

DefaultWindow.prototype.destroy = function () {
	canvas.removeEventListener('mouseup', this);
};

DefaultWindow.prototype.move = function (x, y) {
	this.x = x;
	this.y = y;
};

DefaultWindow.prototype.contextmenu = function (event) {
	this.clientmenu.move(event.clientX, event.clientY);
	this.clientmenu.show();
};

