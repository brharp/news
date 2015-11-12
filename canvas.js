
function createdevice(name) {
	var cv = Object.create(null);
	cv.parent = null;
	cv.peer = document.createElement('canvas');
	cv.peer.setAttribute('id', name);
	document.body.appendChild(cv.peer);
}

function setcanvas(cv) {
	if (cv.parent) {
		setcanvas(cv.parent);
		cv.context.transform.apply(cv.context, cv.transform);
	} else {
		gcontext = cv.peer.getContext("2d");
	}
	currentcanvas = cv;
}

function stroketext(s) {
	currentcanvas.context.strokeText(s, 0, 0);
}

