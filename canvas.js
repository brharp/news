
function newcanvas(parent) {
	function canvas(parent) {
		this.parent = parent;
		this.x = 0;
		this.y = 0;
	}
	canvas.prototype = Object.create(null);
	canvas.prototype.constructor = canvas;
	canvas.prototype.translate = function(dx,dy) {
		this.parent.translate(dx, dy);
	};
	canvas.prototype.strokeRect = function(x, y, w, h) {
		this.parent.strokeRect(x, y, w, h);
	};
	canvas.prototype.resetTransform = function() {
		this.parent.resetTransform();
		this.translate(this.x, this.y);
	};
	return new canvas(parent);
}

function setcanvas(cv) {
	currentcanvas = cv;
	cv.resetTransform();
}

function translate(x, y) {
	currentcanvas.translate(x, y);
	currentcanvas.x = x;
	currentcanvas.y = y;
}

function strokerect(x, y, w, h) {
	currentcanvas.strokeRect(x, y, w, h);
}

function createdevice(name) {
	return newcanvas(document.getElementById(name).getContext('2d'));
}

framebuffer = createdevice('fb');
cv = newcanvas(framebuffer);
cv2 = newcanvas(cv);
setcanvas(cv);
translate(25, 25);
setcanvas(cv2);
translate(25, 25);
setcanvas(cv);
strokerect(1,1,100,100);
setcanvas(cv2);
strokerect(1,1,100,100);

