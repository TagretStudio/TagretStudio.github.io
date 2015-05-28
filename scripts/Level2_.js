BasicGame.Level2 = function (game){
this.lum1 = null;
this.lums = null;
this.platforms = null;
this.arrive = null;
};

BasicGame.Level2.prototype = {


	preload: function () {
		this.stage.backgroundColor = '85b5e5';
		this.load.image('platform', 'media/img/platform.png');
		this.load.spritesheet('lumming', 'media/img/lumming_magenta.png', 32, 32);
	  this.load.image('arrive', 'media/img/lummings-logo.png');
		  if (music != null && music.isPlaying == true) {
		music.fadeOut(700);
	    }
	    music = this.add.audio('game_over_music');
	    music.loop = true;
	    music.play();

	},

	create: function () {
		this.physics.startSystem(Phaser.Physics.ARCADE);
		platforms=this.add.group();
		platforms.enableBody = true;
		platforms.create(0, this.world.height - 200, 'platform');
		platforms.create(200, this.world.height - 200, 'platform');
		platforms.setAll('body.immovable', true);
		this.physics.arcade.enable(platforms);

		lums = this.add.group();
	//	this.physics.arcade.enable(lums);
		lum1 = lums.create(0, this.world.height -300, 'lumming');
		this.physics.arcade.enable(lum1);
		lum1.body.collideWorldBounds = true;
		lum1.body.gravity.y = 450;

		arrive = this.add.sprite(300, this.world.height - 300 , 'arrive');
		this.physics.arcade.enable(arrive);
		arrive.body.immovable = true;
	//	this.physics.arcade.enable(lum1);
		lum1.animations.add('left', [4, 5, 6, 7], 10, true);
		lum1.animations.add('right', [8, 9, 10, 11], 10, true);



	},



	update: function () {
		this.physics.arcade.collide(lum1, platforms);
		lum1.animations.play('right');
		lum1.body.velocity.x = 50;
	//	this.physics.arcade.collide(lum1, arrive);
		this.physics.arcade.collide(lum1, arrive, functionarrive, null, this);

	}
};


	function functionarrive(){
		lum1.animations.play('left');
		this.time.events.add(1000, ftransition, this);

	}

	function ftransition(){
		this.state.start('Preloader');

	}
