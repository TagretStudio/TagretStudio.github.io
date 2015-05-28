BasicGame.MainMenu = function (game){
this.background2 = null;
this.logo = null;

this.buttons = null;
this.buttonPlay = null;
this.buttonCredits = null;
this.buttonQuit = null;
};

BasicGame.MainMenu.prototype = {

	preload: function (){
		pointLogo = new Phaser.Point(234, 234);
		pointButtons = new Phaser.Point(380, 200);

	},

	create: function (){

	//background
	this.background2 = this.add.sprite(0, 0, 'preloaderBackground');
	//this.background2.scale.set(1024/800, 768/600);

	//logo
	this.logo = this.add.sprite(pointLogo.x, pointLogo.y, 'logo');
	this.logo.scale.set(800/1024, 600/768);

	// buttons up to down : play, credits, quit
	this.buttons = this.add.group();
	this.buttons.scale.set(800/1024, 600/768);
	this.buttons.add(this.buttonPlay = this.make.button(Math.round(Math.random()*10)*-5, 400, 'button', actionPlay, this, 0, 1, 2));
	this.buttons.add(this.buttonCredits = this.make.button(Math.round(Math.random()*10)*-5, 460, 'button', actionCredits, this, 3, 4, 5));
	this.buttons.add(this.buttonQuit = this.make.button(Math.round(Math.random()*10)*-5, 520, 'button', actionQuit, this, 6, 7, 8));

	},

	update: function () {
		this.buttons.forEach(
				function(butt) {
					butt.x += Math.min(30,(pointButtons.x - butt.x)/4);
				}
			    );
	}
};


function actionPlay() {
    this.buttonPlay.kill();
    this.background2 = this.add.sprite(0, 0, 'preloaderBackground');
    this.logo = this.add.sprite(184, 265, 'logo');
    if (music != null && music.isPlaying == true) {
	music.fadeOut(700);
	music.onFadeComplete.dispatch();
	music.onFadeComplete.addOnce(function() {
	    this.state.start('Level1');
	}, this);
    }
}

function actionCredits() {
    this.buttonPlay.kill();
    this.background2 = this.add.sprite(0, 0, 'preloaderBackground');
    this.logo = this.add.sprite(184, 265, 'logo');
    if (music != null && music.isPlaying == true) {
	music.fadeOut(700);
	music.onFadeComplete.dispatch();
	music.onFadeComplete.addOnce(function() {
	    this.state.start('Level2');
	}, this);
    }
}

function actionQuit() {
	this.buttonQuit.kill();
	this.state.start('Level3');
}
