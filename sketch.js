let W = window.innerWidth;
let H = window.innerHeight;

const USER = 0;
const FOURIER = 1;
let state = -1;

let drawing = [];
let fourierX = new FourierTransform();

let time = 0;
let path = [];
let firstAnimation = true;

function mousePressed() {
	state = USER;
	drawing = [];
	time = 0;
	fourierX.reset();
	firstAnimation = true;
}
function mouseReleased() {
	state = FOURIER;
	fourierX.transform(drawing);
}
function get_drawing() {
	// get the data of the drawing
	let point = createVector(mouseX - W / 2, mouseY - H / 2, 0);
	drawing.push(new Complex(point.x, point.y));
	// animate what user drew
	stroke(255);
	strokeWeight(2);
	noFill();
	beginShape();
	for (let pxl of drawing) {
		vertex(pxl.re + W / 2, pxl.im + H / 2);
	}
	endShape();
}
function fourierEpicycles() {
	// create the epicycles
	let vect = fourierX.epicycles(W / 2, H / 2, 0);
	path.unshift(vect);
	strokeWeight(1);
	stroke(255);
	text('Total Circle: ' + fourierX.transformed.length, 10, 30); 
	if (firstAnimation) {
		noStroke();
	} else {
		stroke(255);
	}
	// animate the epicycles
	strokeWeight(2);
	beginShape();
	noFill();
	for (let i = 0; i < path.length; i++) {
		vertex(path[i].x, path[i].y);
	}
	endShape();
	// the amount of time we move each frame of animation
	const dt = TWO_PI / fourierX.transformed.length;
	time += dt;
	// loop the animation
	if (time > TWO_PI) {
		time = 0;
		path = [];
		background(0);
		firstAnimation = false;
	}	
}
function setup() {
	createCanvas(W, H);
	background(0);
}
function draw() {
	// put drawing code here

	// background(0);
	if (state == USER) {
		background(0);
		get_drawing();

	} else if (state == FOURIER) {
		background(0);
		fourierEpicycles();	
	}
}
function windowResized() {
	W = window.innerWidth;
	H = window.innerHeight;
	resizeCanvas(W, H);
	background(0);
}