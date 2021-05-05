var opttTokInt_img = null;


var s82 = function(sk){

    sk.preload = function(){
        opttTokInt_img = sk.loadImage("images/miner.jpg")
    };

	sk.setup = function() {
		let canvas1 = sk.createCanvas(400, 400);
		canvas1.parent("opttNewTechnologyTokenomics");
		sk.ellipseMode(sk.CENTER);
		sk.rectMode(sk.CORNER);
		sk.textAlign(sk.LEFT, sk.BOTTOM);
		sk.smooth();
		sk.frameRate(30);
		sk.textSize(20);

		current_opz_problem = opz_opz_newOpzProblem(sk.width*0.75, -2*sk.height*0.5);
	};
	sk.draw = function() {
		//for canvas 1
		sk.background(220);
        sk.image(opttTokInt_img, sk.width/2, sk.height/2, 100, 100)
		
	};

};

// create a new instance of p5 and pass in the function for sketch 1
new p5(s82);
