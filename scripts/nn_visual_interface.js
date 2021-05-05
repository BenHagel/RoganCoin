//optimize titlecard
var noptRandom = new CustomRandom("s1deedsd", "ss", 120);
var noptWidth = 293;
var noptHeight = 340;
var noptRowSize = 50;
var noptNodeSize = 35;

var noptInputs = 2;
var noptHiddens = [
	{
		"activation": "sig",
		"size": 2,
		"connectivity": "full"
	}, 
	{
		"activation": "sig",
		"size": 2,
		"connectivity": "full"
	}
];
var noptOutputs = 1;

var s3 = function(sk){
	sk.setup = function() {
		let canvas1 = sk.createCanvas(noptWidth, noptHeight);
		canvas1.parent("opttDemoNNIntCanvasHlder");
		sk.ellipseMode(sk.CENTER);
		sk.rectMode(sk.CORNER);
		sk.textAlign(sk.LEFT, sk.BOTTOM);
		sk.smooth();
		sk.frameRate(28);
		sk.textSize(20);
	};
	sk.draw = function() {
		//for canvas 1
		sk.background(27, 39, 58);
		
		//Draw grid,
		//input is good enough
		sk.noStroke();
		sk.fill(50, 50, 200);
		if(noptInputs < 6){
			for(let i = 0;i < noptInputs;i++){
				sk.ellipse(i*noptRowSize - noptInputs/2 + sk.width/2 - noptRowSize/2, 35, noptNodeSize, noptNodeSize);
			}
		}
		else{

		}

		//Hiddens
		sk.noStroke();
		sk.fill(50, 220, 50);
		let botOfHiddens = noptRowSize + 35;
		if(noptHiddens.length < 3){
			for(let i = 0;i < noptHiddens.length;i++){
				for(let j = 0;j < noptHiddens[i].size;j++){
					sk.ellipse(j*noptRowSize - noptHiddens[i].size/2 + sk.width/2 - noptRowSize/2, botOfHiddens + i*noptRowSize, noptNodeSize, noptNodeSize);
				}
			}
			botOfHiddens += noptHiddens.length*noptRowSize;
		}
		else{

		}
		
		//Outputs
		sk.noStroke();
		sk.fill(220, 50, 50);
		botOfHiddens += noptRowSize;
		if(noptOutputs < 6){
			for(let i = 0;i < noptOutputs;i++){
				sk.ellipse(i*noptRowSize - noptOutputs/2 + sk.width/2, botOfHiddens, noptNodeSize, noptNodeSize);
			}
		}
		else{

		}
		
		//Draw connecetions
		for(let i = 0;i < noptInputs;i++){
			for(let j = 0;j < noptHiddens[0].size;j++){
				
			}
		}
		
		
	};

	sk.burst = function(){

	};

	sk.drawACon = function(x1, y1, x2, y2){
		//Draw the arrows
		sk.stroke(ins[h].r, ins[h].g, ins[h].b);
		sk.fill(ins[h].r, ins[h].g, ins[h].b);
		sk.line(x1, y1, x2, y2);
		sk.drawArrow(
			x1, y1,
			sk.createVector(
				x1 - x2,
				y1 - y2,
			) 
		);
	};

	sk.drawArrow = function(xStart, yStart, vec) {
		sk.push();
			sk.translate(xStart, yStart);
			sk.line(0, 0, vec.x, vec.y);
			sk.rotate(vec.heading());
			let arrowSize = 7;
			sk.translate(vec.mag() - arrowSize, 0);
			sk.triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
		pop();
	};
	
};

// create a new instance of p5 and pass in the function for sketch 1
new p5(s3);
