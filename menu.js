
function Menu(items, callback) {
	DefaultWindow.call(this, 0, 0, 100+32, items.length*16+32);
	this.items = items;
	this.selection = -1;
	this.callback = callback;
}

Menu.prototype = Object.create(DefaultWindow.prototype);
Menu.prototype.constructor = Menu;
Menu.prototype.super = DefaultWindow.prototype;

Menu.prototype.show = function() {
	var menu = this;
	this.super.show.call(this);
	var onmousemove = function (event) {
		var x = event.clientX - menu.x - 16;
		var y = event.clientY - menu.y - 16;
		var i;
		if (x >= 0 && x < 100 && y >= 0 && y < 16 * menu.items.length) {
			i = Math.floor(y / 16);
		} else {
			i = -1;
		}
		menu.setselection(i);
	};
	var onmouseup = function (event) {
		event.stopPropagation();
		document.body.removeEventListener('mousemove', onmousemove, true);
		document.body.removeEventListener('mouseup', onmouseup, true);
		menu.destroy();
		menu.callback(menu.selection);
	};
	document.body.addEventListener('mousemove', onmousemove, true);
	document.body.addEventListener('mouseup', onmouseup, true);
};

Menu.prototype.paintclient = function() {
	//var context = this.canvas.getContext("2d");
	var context = canvas.getContext("2d");
	context.save();
	context.font = '13px sans-serif';
	context.clearRect(0, 0, this.width, this.height);
	context.strokeRect(0, 0, this.width, this.height);
	for (var i = 0; i < this.items.length; i++) {
		if (this.selection == i) {
			context.fillStyle = "black";
			context.strokeStyle = "white";
		} else {
			context.fillStyle = "white";
			context.strokeStyle = "black";
		}
		context.fillRect(0, 16*i, 100, 16);
		context.strokeText(this.items[i], 0, 16 * (i+1));
	}
	context.restore();
};

Menu.prototype.setselection = function (i) {
	this.selection = i;
	this.paint();
};

