
function px(px) {
	return px+"px";
}

function DefaultWindow(owner, x, y, width, height) {
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;

	function canvas(owner) {
		this.div = document.createElement('div');
		this.div.className = "window";
		this.div.style.position = "absolute";
		this.div.style.left = px(x);
		this.div.style.top = px(y);
		this.div.style.width = px(width);
		this.div.style.height = px(height);
		this.canvas = document.createElement("canvas");
		this.canvas.width = width;
		this.canvas.height = height;
		this.div.appendChild(this.canvas);
		this.parent = owner?owner.div:document.body;
		this.parent.appendChild(this.div);
	}

	/* Create frame. */
	this.FrameCanvas = new canvas();

	this.ClientCanvas = new canvas(this.FrameCanvas);
	this.ClientCanvas.translate(x, y);
	this.ClientCanvas.rect(0, 0, width, height);
	this.ClientCanvas.clip();
	
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
/*
	var context = this.canvas.getContext("2d");
	var rect = {};
	context.fillStyle = "gray";
	context.fillRect(0, 0, this.width, this.height);
	context.save();
	this.getClientRect(rect);
	context.translate(16, 16);
	context.beginPath();
	context.rect(0, 0, this.width - 32, this.height - 32);
	context.clip();
*/
	this.paintclient();
	//context.restore();
};

DefaultWindow.prototype.show = function () {
	//this.parent.appendChild(this.div);
	//this.canvas.addEventListener('mouseup', this);
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

DefaultWindow.prototype.hide = function () {
	this.parent.removeChild(this.div);
};

DefaultWindow.prototype.move = function (x, y) {
	this.x = x;
	this.y = y;
	//this.div.style.left = px(x);
	//this.div.style.top = px(y);
};

DefaultWindow.prototype.contextmenu = function (event) {
	this.clientmenu.move(event.clientX, event.clientY);
	this.clientmenu.show();
};

