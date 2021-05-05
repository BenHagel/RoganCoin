//optimize titlecard
var opttRandom = new CustomRandom("sdeedsd", "ss", 120);
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

var opttPillars = [];
var opttPillarRadius = 70;
//Create the pillars
for(let i = 0;i < 19;i++){
	opttPillars.push({
		x: i*30,
		y: 0,
		z: 0,
		a: opttRandom.random()*55,
		r: opttRandom.random()*55,
		c_r: Math.floor(opttRandom.random()*256),
		c_g: Math.floor(opttRandom.random()*256),
		c_b: Math.floor(opttRandom.random()*256)
	});
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
		if(sk.frameCount % 120 === 0 && opttNodes.length < 10){
			opttNodes.push(opttCreateNodes());
		}
		
		sk.rotateY(0.9+Math.PI)
		sk.translate(-sk.width/2, -sk.height/2);

		//Update the pillars
		for(let g = 0;g < opttPillars.length;g++){
			opttPillars[g].a += 0.005;
			opttPillars[g].r += 0.006;
			//opttPillars[g].x = Math.sin(opttPillars[g].a) * 40;
			opttPillars[g].y = Math.sin(opttPillars[g].a) * (opttPillarRadius+Math.cos(opttPillars[g].r)*20) + sk.height/2;
			opttPillars[g].z = Math.cos(opttPillars[g].a) * (opttPillarRadius+Math.sin(opttPillars[g].r)*20); 
		}
		//Draw the pillars
		sk.noStroke();
		sk.lights();
		for(let g = 0;g < opttPillars.length;g++){
			sk.push();
			sk.translate(opttPillars[g].x, opttPillars[g].y, opttPillars[g].z);
			sk.rotateX(opttPillars[g].a*1.2);
			sk.rotateY(opttPillars[g].a*0.9);
			sk.rotateZ(opttPillars[g].a*0.87);
			sk.fill(opttPillars[g].c_r, opttPillars[g].c_g, opttPillars[g].c_b);
			sk.box(14);
			sk.pop();
		}

		//Draw the nodes
		sk.noStroke();
		for(let g = opttNodes.length-1;g > -1;g--){
			if(opttNodes[g].life < 45) opttNodes[g].life += 0.03;
			opttNodes[g].x += 0.9;
			sk.push();
			sk.translate(opttNodes[g].x, opttNodes[g].y, opttNodes[g].z);
			sk.sphere(opttNodes[g].life, opttPillars[g].d, opttPillars[g].d);
			sk.pop();
			if(opttNodes[g].x > sk.width){
				opttNodes[g].x = 0;
				opttNodes[g].d = 3;
				opttNodes[g].life = 1.0;
			}
		}
		
	};
};

// create a new instance of p5 and pass in the function for sketch 1
new p5(s1);
