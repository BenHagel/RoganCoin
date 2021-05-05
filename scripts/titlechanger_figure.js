//optimize titlecard
var opttRandom = new CustomRandom("s1desedsd", "ss", 352);
var opttWidth = 430;
var opttHeight = 430;

var widthofcube = 17;
var worldSideLength = 16;
var opttPusher = 9.119;
var opttPusherd = 0.0;
var optGem = {x: 0, y: 0, z:-200}
var configurationVersion = 1;
var opttCubeReciprocity = -0.95;
var opttCubeMediumViscocity = 0.945;
var opttCubeSpeed = 0.0022;
var opttTempAngleTicker = 0.0;
//var optCollisionDelta = {x: 0, y: 0, z:0};

var opttPillars = new Array(484);
//Create the pillars
for(let i = 0;i < opttPillars.length;i++){
	let diamOfBox = widthofcube;
	opttPillars[i] = {
		x: (299*opttRandom.random()-150),
		y: (299*opttRandom.random()-150),
		z: (299*opttRandom.random()-150),

		xv: (2*opttRandom.random()-1)*0.1,
		yv: (2*opttRandom.random()-1)*0.1,
		zv: (2*opttRandom.random()-1)*0.1,

		xt: (Math.floor(worldSideLength*opttRandom.random())*widthofcube) - worldSideLength*widthofcube/2,
		yt: (Math.floor(worldSideLength*opttRandom.random())*widthofcube) - worldSideLength*widthofcube/2,
		zt: (Math.floor(worldSideLength*1)*widthofcube) - worldSideLength*widthofcube/2,

		a: opttRandom.random(),
		d: Math.floor(widthofcube*0.4),		//hiot box
		dd: widthofcube,					//actual displayed size
		cd: 58+opttRandom.random()*40,
		show: true,

		r: opttRandom.random()*256, 
		g: opttRandom.random()*256, 
		b: opttRandom.random()*256,
		rt: opttRandom.random_pre()*256, 
		gt: opttRandom.random_pre()*256, 
		bt: opttRandom.random_pre()*256
	};
	opttTempAngleTicker+=0.02;
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
		sk.defineNewConfiguration();
	};
	sk.draw = function() {
		//for canvas 1
		sk.background(0, 0);
	
		//sk.rotateY(opttPusher-Math.PI/2);
		sk.translate(25, 20, 20);
		sk.rotateY(-0.2);
		sk.rotateX(0.1);
		//sk.rotateZ(-0.2);
		//sk.rotateZ(Math.PI/2);
		//Ambient lighting
		//sk.fill(200, 240, 200);
		//sk.pointLight(255, 255, 255, sk.mouseX - sk.width/2, sk.mouseY-sk.height/2, opttPusher);
		
		sk.lights();
		//Collide logN time
		for(let i = 0;i < opttPillars.length;i++){
			
			//Update vel base don current trajectory
			opttPillars[i].xv += (opttPillars[i].xt - opttPillars[i].x) * opttCubeSpeed;
			opttPillars[i].yv += (opttPillars[i].yt - opttPillars[i].y) * opttCubeSpeed;
			opttPillars[i].zv += (opttPillars[i].zt - opttPillars[i].z) * opttCubeSpeed;
			//add vel and check
			opttPillars[i].x += opttPillars[i].xv;
			opttPillars[i].y += opttPillars[i].yv;
			opttPillars[i].z += opttPillars[i].zv;
			//Viscoss medium
			opttPillars[i].xv *= opttCubeMediumViscocity;
			opttPillars[i].yv *= opttCubeMediumViscocity;
			opttPillars[i].zv *= opttCubeMediumViscocity;

			//Cplour adjust
			opttPillars[i].r += (opttPillars[i].rt - opttPillars[i].r) / opttPillars[i].cd;
			opttPillars[i].g += (opttPillars[i].gt - opttPillars[i].g) / opttPillars[i].cd;
			opttPillars[i].b += (opttPillars[i].bt - opttPillars[i].b) / opttPillars[i].cd;
			



			/*
			for(let j = i+1;j < opttPillars.length;j++){
				sk.testForCollision(opttPillars[i].x, opttPillars[i].y, opttPillars[i].z, opttPillars[i].d, 
					opttPillars[j].x, opttPillars[j].y, opttPillars[j].z, opttPillars[j].d, 
					opttPillars[i], opttPillars[j]);
			}
			*/
		}

		//Draw the pillars
		for(let i = 0;i < opttPillars.length;i++){
			sk.push();
			sk.translate(opttPillars[i].x, opttPillars[i].y, opttPillars[i].z);
			sk.rotateX(Math.cos(sk.frameCount/21*opttPillars[i].a) * Math.sin(opttPillars[i].a*1.0)*0.12);
			sk.rotateY(Math.sin(sk.frameCount/21*opttPillars[i].a) * Math.cos(opttPillars[i].a*2.3)*0.07);
			sk.rotateZ(Math.cos(sk.frameCount/21*opttPillars[i].a) * Math.sin(opttPillars[i].a*4.4)*0.08);
			sk.noStroke();
			sk.fill(255, 255, 255);
			sk.noLights();
			sk.pointLight(opttPillars[i].r, opttPillars[i].g, opttPillars[i].b, 
				-456.359375, -414, 119.119);//
				//sk.mouseX - sk.width/2, sk.mouseY-sk.height/2, opttPusher);
			if(opttPillars[i].show) sk.box(opttPillars[i].dd);
			sk.pop();
		}
		
		

		//Draw the gem
		sk.noStroke();
		sk.fill(23);
		sk.ambientLight(230, 23, 233);
		sk.pointLight(23, 23, 23, 230, -130, 220);
		sk.specularMaterial(23);
		sk.shininess(1);

		//sk.rotateY(sk.frameCount/430);
		//sk.rotateX(sk.frameCount/-430);
		//sk.rotateZ(sk.frameCount/-40);
		//optGemDetail = Math.floor(sk.frameCount/10) * 9 + 8;
		//sk.sphere(44, optGemDetail, optGemDetail);
		//sk.box(34);
		
		/*sk.stroke(255, 0, 0);
		sk.line(0, 0, 0, 300, 0 ,0);
		sk.stroke(0, 255 ,0);
		sk.line(0, 0, 0, 0, 0 ,300);
		sk.stroke(0, 0 ,255);
		sk.line(0, 0, 0, 0, 300 ,0);*/
	};

	//ASSUMING d1 and d2 are the sdame
	sk.testForCollision = function(x1, y1, z1, d1, x2, y2, z2, d2, node1, node2){
		if(x1 + d1/2 > x2 - d2/2 && x1 - d1/2 < x2 + d2/2 &&
			y1 + d1/2 > y2 - d2/2 && y1 - d1/2 < y2 + d2/2 &&
			z1 + d1/2 > z2 - d2/2 && z1 - d1/2 < z2 + d2/2){

			//Determine biggest pushback and bump back accordingly
			let xDelta = x1 > x2 ? x1-x2 : x2-x1;
			let yDelta = y1 > y2 ? y1-y2 : y2-y1;
			let zDelta = z1 > z2 ? z1-z2 : z2-z1;
			//Trifecta case
			//XDELTA
			if(xDelta > yDelta && xDelta > zDelta){
					if(x2 > x1){
					node2.x += ((d1/2+d2/2) - xDelta) * (d2 / (d1+d2));
					node1.x -= ((d1/2+d2/2) - xDelta) * (d1 / (d1+d2));
					}
					else{
					node2.x -= ((d1/2+d2/2) - xDelta) * (d2 / (d1+d2));
					node1.x += ((d1/2+d2/2) - xDelta) * (d1 / (d1+d2));
					}
					//let swap = node1.xv;
					//node1.xv = node2.xv;
					//node2.xv = swap;
					node1.xv *= opttCubeReciprocity;
					node2.xv *= opttCubeReciprocity;
			}
			//YDELTA
			else if(yDelta > xDelta && yDelta > zDelta){
				if(y2 > y1){
					node2.y += ((d1/2+d2/2) - yDelta) * (d2 / (d1+d2));
					node1.y -= ((d1/2+d2/2) - yDelta) * (d1 / (d1+d2));
				}
				else{
					node2.y -= ((d1/2+d2/2) - yDelta) * (d2 / (d1+d2));
					node1.y += ((d1/2+d2/2) - yDelta) * (d1 / (d1+d2));
				}
				//let swap = node1.yv;
				//node1.yv = node2.yv;
				//node2.yv = swap;
				node1.yv *= opttCubeReciprocity;
				node2.yv *= opttCubeReciprocity;
			}
			//ZDELTA
			else if(zDelta > xDelta && zDelta > yDelta){
				if(z2 > z1){
					node2.z += ((d1/2+d2/2) - zDelta) * (d2 / (d1+d2));
					node1.z -= ((d1/2+d2/2) - zDelta) * (d1 / (d1+d2));
				}
				else{
					node2.z -= ((d1/2+d2/2) - zDelta) * (d2 / (d1+d2));
					node1.z += ((d1/2+d2/2) - zDelta) * (d1 / (d1+d2));
				}
				//let swap = node1.zv;
				//node1.zv = node2.zv;
				//node2.zv = swap;
				node1.zv *= opttCubeReciprocity;
				node2.zv *= opttCubeReciprocity;
			}
			return true;
		}
	};

	//Define new targets
	sk.defineNewConfiguration = function(){
		for(let i = 0;i < opttPillars.length;i++){
			opttPillars[i].xv = opttRandom.random_pre()*10 - 5;
			opttPillars[i].yv = opttRandom.random_pre()*10 - 5;
			opttPillars[i].zv = opttRandom.random_pre()*10 - 5;
		}

		let counter = 0;
		if(configurationVersion === 0){
			for(let i = 0;i < opttPillars.length;i++){
				opttPillars[i].xt = (Math.floor(worldSideLength*opttRandom.random_pre())*widthofcube) - worldSideLength*widthofcube/2;
				opttPillars[i].yt = (Math.floor(worldSideLength*opttRandom.random_pre())*widthofcube) - worldSideLength*widthofcube/2;
				opttPillars[i].zt = (Math.floor(worldSideLength*opttRandom.random_pre())*widthofcube) - worldSideLength*widthofcube/2;
				opttPillars[i].rt = Math.floor(256*opttRandom.random_pre());
				opttPillars[i].gt = Math.floor(256*opttRandom.random_pre());
				opttPillars[i].bt = Math.floor(256*opttRandom.random_pre());
			}
		}

		else if(configurationVersion === 1){
			let newMap = [
				0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,
				0,0,0,0,1,1,1,1,1,1,1,1,0,0,0,0,
				0,0,2,1,1,1,1,1,1,1,1,1,1,3,0,0,
				0,0,1,1,1,1,1,1,1,1,1,1,1,1,0,0,
				0,4,1,1,1,1,1,1,1,1,5,1,1,1,1,0,
				0,4,5,1,1,1,1,1,1,4,4,1,1,1,1,0,
				1,4,4,1,1,1,1,1,1,5,4,1,1,1,1,1,
				1,4,4,1,1,1,1,1,1,1,1,1,1,1,1,1,
				1,1,4,1,1,1,1,1,1,1,1,1,1,1,1,1,
				1,1,4,4,1,1,1,1,1,4,4,1,1,1,1,1,
				3,1,6,4,1,1,1,1,4,4,4,4,1,1,1,0,
				0,1,1,4,4,1,1,4,4,1,1,4,4,1,1,0,
				0,2,1,1,4,4,4,4,1,1,1,1,4,4,0,0,
				0,0,1,1,1,1,1,1,1,1,1,1,4,4,0,0,
				0,0,0,2,1,1,1,1,1,1,1,1,3,0,0,0,
				0,0,0,0,0,2,1,1,1,1,7,0,0,0,0,0
			];
			let newColours = [
				{r:27.0, g:38.0, b:59.0},
				{r:142.0, g:148.0, b:158.0},
				{r:217.0, g:219.0, b:222.0},
				{r:11.0, g:179.0, b:191.0},
				{r:19.0, g:106.0, b:123.0},
				{r:14.0, g:146.0, b:160.0},
				{r:171.0, g:176.0, b:183.0}
			];
			for(let i = 0;i < newMap.length && counter < opttPillars.length;i++){
				if(newMap[i] > 0){
					opttPillars[counter].xt = (Math.floor(i%worldSideLength)*widthofcube) - worldSideLength*widthofcube/2;
					opttPillars[counter].yt = (Math.floor(i/worldSideLength)*widthofcube) - worldSideLength*widthofcube/2;
					opttPillars[counter].zt = (Math.floor(0)*widthofcube);// - worldSideLength*widthofcube/2;
					opttPillars[counter].rt = newColours[newMap[i]-1].r;
					opttPillars[counter].gt = newColours[newMap[i]-1].g;
					opttPillars[counter].bt = newColours[newMap[i]-1].b;
					opttPillars[counter].show = true;
					counter++;
				}
			}
		}
		else if(configurationVersion === 2){
			let newMap = [
				0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
				0,0,0,0,0,1,2,3,3,2,1,0,0,0,0,0,
				0,0,0,1,3,4,4,4,4,4,4,5,1,0,0,0,
				0,0,6,5,5,5,5,5,5,5,5,5,5,6,0,0,
				0,0,2,3,3,5,5,5,5,5,5,3,3,3,0,0,
				0,6,7,7,7,7,8,3,3,8,7,7,7,7,6,0,
				0,6,7,9,9,9,9,7,7,9,9,9,7,7,6,0,
				0,6,7,7,7,7,7,10,10,7,7,7,7,7,6,0,
				0,6,1,7,7,7,7,2,2,7,7,7,7,11,11,0,
				0,11,1,2,1,2,2,2,2,2,2,1,1,1,11,0,
				0,12,11,1,13,13,13,13,13,13,13,13,13,11,12,0,
				0,14,12,1,13,15,10,16,16,10,15,13,1,11,17,0,
				0,0,12,11,11,1,13,13,13,13,1,6,11,12,0,0,
				0,0,0,12,12,11,11,6,6,11,11,12,12,0,0,0,
				0,0,0,0,17,12,12,12,12,12,12,12,0,0,0,0,
				0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
			];
			let newColours = [
				{r:252.0, g:162.0, b:17.0},
				{r:253.0, g:210.0, b:21.0},
				{r:255.0, g:242.0, b:82.0},
				{r:255.0, g:253.0, b:185.0},
				{r:254.0, g:241.0, b:137.0},
				{r:250.0, g:121.0, b:10.0},
				{r:25.0, g:25.0, b:25.0},
				{r:197.0, g:194.0, b:65.0},
				{r:67.0, g:68.0, b:67.0},
				{r:80.0, g:66.0, b:15.0},
				{r:212.0, g:135.0, b:15.0},
				{r:200.0, g:101.0, b:9.0},
				{r:226.0, g:177.0, b:44.0},
				{r:215.0, g:190.0, b:163.0},
				{r:170.0, g:128.0, b:32.0},
				{r:76.0, g:31.0, b:3.0},
				{r:197.0, g:138.0, b:85.0}
			];
			for(let i = 0;i < newMap.length && counter < opttPillars.length;i++){
				if(newMap[i] > 0){
					opttPillars[counter].xt = (Math.floor(i%worldSideLength)*widthofcube) - worldSideLength*widthofcube/2;
					opttPillars[counter].yt = (Math.floor(i/worldSideLength)*widthofcube) - worldSideLength*widthofcube/2;
					opttPillars[counter].zt = (Math.floor(0)*widthofcube);// - worldSideLength*widthofcube/2;
					opttPillars[counter].rt = newColours[newMap[i]-1].r;
					opttPillars[counter].gt = newColours[newMap[i]-1].g;
					opttPillars[counter].bt = newColours[newMap[i]-1].b;
					opttPillars[counter].show = true;
					counter++;
				}
			}
		}

		//Send rest to the back
		for(let i = counter;i < opttPillars.length;i++){
			opttPillars[i].xt = 0;
			opttPillars[i].yt = 0;
			opttPillars[i].zt = -330;
			opttPillars[i].rt = Math.floor(256*opttRandom.random_pre());
			opttPillars[i].gt = Math.floor(256*opttRandom.random_pre());
			opttPillars[i].bt = Math.floor(256*opttRandom.random_pre());
			opttPillars[i].show = false;
		}
		configurationVersion++;
		if(configurationVersion > 2) configurationVersion = 1;
	};

	sk.keyPressed = function(){
		sk.defineNewConfiguration();
	};
	sk.mousePressed = function(){

	};
};

// create a new instance of p5 and pass in the function for sketch 1
new p5(s1);
