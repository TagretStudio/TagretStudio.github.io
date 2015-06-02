
var space;

BasicGame.Preloader = function (game) {
	this.background = null;
	this.preloadBar = null;
	this.tagretLogo = null;
	this.tagret = null;
	this.presents = null;
	this.ready = false;
};
BasicGame.Preloader.prototype = {
	preload: function () {
		// These are the assets we loaded in Boot.js
		this.background = this.add.sprite(0, 0, 'preloaderBackground');
		this.background.scale.set(1024/800, 768/600);
	},


	create: function () {
		// Once the load has finished we disable the crop because we're going to sit in the update loop for a short while as the music decodes
		space = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		if (music != null && music.isPlaying == true) {
			music.fadeOut(700);
		}
		music = this.add.audio('menu_music');
		music.loop = true;
		music.play();

	},
	update: function () {
		this.time.events.add(50, logo1, this);
		this.time.events.add(800, logo2, this);
		this.time.events.add(1500, logo3, this);
		this.time.events.add(10800, transition, this);
		if (space.isDown) {
			this.state.start('MainMenu');
		}
	}
};

function transition() {
	this.state.start('MainMenu');
}

function logo1() {
	this.tagretLogo = this.add.sprite(336, 236, 'cible');
}

function logo2() {
	this.tagret = this.add.sprite(336, 364, 'tagret');
}

function logo3() {
	this.presents = this.add.sprite(350, 416, 'presents');
}

