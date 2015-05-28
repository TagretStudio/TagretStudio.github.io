BasicGame.Level1 = function (game){
	this.platforms = null;
	this.lums = null;
	this.lum = null;
};

BasicGame.Level1.prototype = {

	preload: function () {
		this.load.image('sky', 'media/img/sky.png');
		this.load.image('platform', 'media/img/platform.png');
		this.load.spritesheet('lumming', 'media/img/lumming_magenta.png', 32, 32);
	    if (music != null && music.isPlaying == true) {
		music.fadeOut(700);
	    }
	    music = this.add.audio('game_over_music');
	    music.loop = true;
	    music.play();
	},

	create: function () {
		this.physics.startSystem(Phaser.Physics.ARCADE);

		var sky = this.add.sprite(0, 0, 'sky');
		sky.scale.set(1024/800, 768/600);

		platforms = this.add.group();
		platforms.enableBody = true;
		var platform;
		platform = platforms.create(0, this.world.height - 64, 'platform');
		platform.body.immovable = true;

		//lums = this.add.group();
		//var lum;
		//lum = lums.create(0, 0, 'lumming');
		//this.physics.arcade.enable(lum);
		//lum.animations.add('left', [0, 1, 2, 3], 10, true);
		//lum.animations.add('right', [5, 6, 7, 8], 10, true);
		lum = this.add.sprite(0, 0, 'lumming');
		this.physics.arcade.enable(lum);
		lum.animations.add('left', [4, 5, 6, 7], 10, true);
		lum.animations.add('right', [8, 9, 10, 11], 10, true);
	},
	
	update: function () {
		//lums.forEach(
		//	function(lum) {
		//		lum.animations.play('right');
		//	}
		//);
		lum.animations.play('right');

	}
};
