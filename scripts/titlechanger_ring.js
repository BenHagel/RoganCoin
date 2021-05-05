//optimize titlecard
var opttRandom = new CustomRandom("s1deedsd", "ss", 120);
var opttWidth = 400;
var opttHeight = 400;

var opttNodes = [];
var opttCreateNodes = function(){
	return {
		x: 0,
		y: opttHeight/2,
		z: 0,
		d: 3,	//detail on sphere
		life: 1.0	//diameter of sphere
	};
};
var optGemDetail = 5;

var opttPillars = new Array(4);
var opttPillarsDescentVals = [0.995, 0.995, 0.995, 0.995];//for(let g = 0;g < opttPillarsDescentVals.length;g++)opttPillarsDescentVals[g]  = 1;
var opttPillarSlowing = 0;
var opttPillarRingCount = 0;
var opttPillarRadius = 70;
//Create the pillars
for(let i = 0;i < opttPillars.length;i++){
	let radiusOfThisCircle = 70 + i * 30;
	let ringOfPillars = [];
	for(let j = 350.0*opttRandom.random();j < Math.PI*2.0*radiusOfThisCircle*6.28;j += 350.0){
		ringOfPillars.push({
			a: j / (2*Math.PI*radiusOfThisCircle),
			ax: Math.PI*2.0 * opttRandom.random(),
			ay: Math.PI*2.0 * opttRandom.random(),
			az: Math.PI*2.0 * opttRandom.random(),
			axv: (2*opttRandom.random()-1)*0.1,
			ayv: (2*opttRandom.random()-1)*0.1,
			azv: (2*opttRandom.random()-1)*0.1,
			r: radiusOfThisCircle,
			x: 0,
			y: 0,
			dis: Math.hypot(Math.sin(j / (2*Math.PI*radiusOfThisCircle)) * radiusOfThisCircle, 
				Math.cos(j / (2*Math.PI*radiusOfThisCircle)) * radiusOfThisCircle)
		});
	}
	opttPillars[i] = ringOfPillars;
}
//Create the nodes
for(let i = 0;i < 0;i++){

}

var s1 = function(sk){
	sk.setup = function() {
		let canvas1 = sk.createCanvas(opttWidth, opttHeight, sk.WEBGL);
		canvas1.parent("optTitleCanvasHldr");
		sk.ellipseMode(sk.CENTER);
		sk.rectMode(sk.CORNER);
		sk.textAlign(sk.LEFT, sk.BOTTOM);
		sk.smooth();
		sk.frameRate(48);
		sk.textSize(20);
	};
	sk.draw = function() {
		//for canvas 1
		sk.background(0, 0);

		//Check if the right amount of nodes
		if(sk.frameCount % 343 === 322){
			sk.burst();
		}
		
		//sk.rotateY(0.9+Math.PI)
		//sk.translate(-sk.width/2, -sk.height/2);

		//Update the pillars
		opttPillarRingCount++;
		for(let i = 0;i < opttPillars.length;i++){
			for(let g = 0;g < opttPillars[i].length;g++){
				opttPillars[i][g].a += 0.005;
				opttPillars[i][g].x = Math.sin(opttPillars[i][g].a) * opttPillars[i][g].r;
				opttPillars[i][g].y = Math.cos(opttPillars[i][g].a) * opttPillars[i][g].r;
				
				//Tend the pillars rotational velocity to an ordered state
				opttPillars[i][g].axv *= opttPillarsDescentVals[i];//0.8;//0.999;
				opttPillars[i][g].ayv *= opttPillarsDescentVals[i];//0.8;//0.999;
				opttPillars[i][g].azv *= opttPillarsDescentVals[i];//0.8;//0.999;
	
				//Add velocities to the angle
				opttPillars[i][g].ax += opttPillars[i][g].axv;
				opttPillars[i][g].ay += opttPillars[i][g].ayv;
				opttPillars[i][g].az += opttPillars[i][g].azv;
				let divv = 164;
				//Tend the pillars to an ordered state
				opttPillars[i][g].ax *= opttPillarsDescentVals[i];//0.8;
				opttPillars[i][g].ay *= opttPillarsDescentVals[i];//0.8;
				opttPillars[i][g].az *= opttPillarsDescentVals[i];//0.8;
				
			}
		}
		if(opttPillarRingCount > 50){opttPillarSlowing++;opttPillarRingCount = 0;}
		if(opttPillarSlowing >= opttPillars.length) opttPillarSlowing = 0;
		
		//Draw the pillars
		sk.noStroke();
		sk.lights();
		for(let i = 0;i < opttPillars.length;i++){
			for(let g = 0;g < opttPillars[i].length;g++){
				sk.push();
				sk.translate(opttPillars[i][g].x, opttPillars[i][g].y, 0);
				sk.rotateX(opttPillars[i][g].ax);
				sk.rotateY(opttPillars[i][g].ay);
				sk.rotateZ(opttPillars[i][g].az);
				sk.box(14);
				sk.pop();
			}
		}

		//Draw the gem
		sk.noStroke();
		sk.fill(23);
		sk.ambientLight(230, 23, 233);
		sk.pointLight(23, 23, 23, 230, -130, 220);
		sk.specularMaterial(23);
		sk.shininess(1);
		sk.rotateY(sk.frameCount/430);
		sk.rotateX(sk.frameCount/-430);

		sk.rotateZ(sk.frameCount/-40);
		//optGemDetail = Math.floor(sk.frameCount/10) * 9 + 8;
		//sk.sphere(44, optGemDetail, optGemDetail);
		sk.box(44);
		
	};

	sk.burst = function(){
		for(let i = 0;i < opttPillars.length;i++){
			for(let g = 0;g < opttPillars[i].length;g++){
				opttPillars[i][g].axv += 0.018 * (opttPillars.length-i+1);
				opttPillars[i][g].ayv += 0.018 * (opttPillars.length-i+1);
				opttPillars[i][g].azv += 0.0189 * (opttPillars.length-i+1);
			}
		}
	};
};

// create a new instance of p5 and pass in the function for sketch 1
new p5(s1);
