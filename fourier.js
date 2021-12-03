/** Discrete Fourier Transform alogrithm
 * transform a sequence of N complex numbers x_n 
 * into a sequence of complex numbers X_k 
**/
function FourierTransform() {
    this.transformed = [];
}

FourierTransform.prototype.transform = function (X) { 
    const N = X.length;
    for (let k = 0; k < N; k++) {
        let sum = new Complex(0, 0);
        for (let n = 0; n < N; n++) {
            const theta = (TWO_PI * k * n) / N;
            const angleSum = new Complex(cos(theta), -sin(theta));
            sum = sum.add(X[n].multiply(angleSum));
        }
        sum = sum.divide(new Complex(N, 0));
        this.transformed[k] = { 
            re: sum.re, // an enhance object literal
            im: sum.im, 
            freq: k, 
            amp: sqrt(sum.re * sum.re + sum.im * sum.im), 
            phase: atan2(sum.im, sum.re)
        };
    }
    // sort so that the epic cycles render in order
	// of the amplitude of the cycles
    this.transformed.sort((a, b) => b.amp - a.amp);
}

FourierTransform.prototype.epicycles = function (x, y, rotation) {
	for (let i = 0; i < this.transformed.length; i++) {
		const prevx = x;
		const prevy = y;

		const freq = this.transformed[i].freq;
		const radius = this.transformed[i].amp;
		const phase = this.transformed[i].phase;
		x += radius * cos(freq * time + phase + rotation);
		y += radius * sin(freq * time + phase + rotation);

		stroke(255, 100);
        strokeWeight(1.5);
		noFill();
		ellipse(prevx, prevy, 2*radius);
		line(prevx, prevy, x, y);
	}
	return createVector(x, y);
}

FourierTransform.prototype.reset = function() {
    this.transformed = [];
}