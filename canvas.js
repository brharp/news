
function newcanvas(parent) {
	function canvas(parent) {
		this.parent = parent;
		this.x = this.y = 0;
	}
	canvas.prototype = Object.create(null);
	canvas.prototype.constructor = canvas;
	canvas.prototype.translate = function(dx,dy) {
		this.x += dx;
		this.y += dy;
	};
	canvas.prototype.strokeRect = function(x, y, w, h) {
		this.parent.strokeRect(this.x + x, this.y + y, w, h);
	};
	return new canvas(parent);
}

function setcanvas(cv) {
	currentcanvas = cv;
}

function createdevice(name) {
	return newcanvas(document.getElementById(name).getContext('2d'));
}

framebuffer = createdevice('fb');
cv = newcanvas(framebuffer);
cv2 = newcanvas(cv);
cv.translate(25, 25);
cv2.translate(25, 25);
cv.strokeRect(1,1,100,100);
cv2.strokeRect(1,1,100,100);

