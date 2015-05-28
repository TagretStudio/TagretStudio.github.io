BasicGame.Level2 = function (game){
	this.nextState = 'Boot';
	this.platforms = null;
	this.white_lums = null;
	this.blue_lums = null;
	this.blue_doors = null;
	this.blue_filters = null;
	this.startText = null;
};

BasicGame.Level2.prototype = {

	preload: function () {
		this.load.image('sky', 'media/img/sky.png');
		this.load.image('platform', 'media/img/platform.png');
		this.load.spritesheet('blue_door', 'media/img/door_blue.png', 32, 32);
		this.load.spritesheet('white_lumming', 'media/img/lumming_white.png', 32, 32);
		this.load.spritesheet('blue_lumming', 'media/img/lumming_blue.png', 32, 32);
		this.load.spritesheet('blue_filter', 'media/img/filter_blue.png', 32, 32);
		this.load.image('cliquez', 'media/img/cliquerPourCommencer.png');
	},

	create: function () {
		this.physics.startSystem(Phaser.Physics.ARCADE);

		var sky = this.add.sprite(0, 0, 'sky');
		sky.scale.set(1024/800, 768/600);

		platforms = this.add.group();
		platforms.enableBody = true;
		{
			platforms.create(  0-200, 100, 'platform');
			platforms.create(300-200, 200, 'platform');
			platforms.create(600-200, 300, 'platform');
			platforms.create(900-200, 280, 'platform');
			platforms.create(200-200, 280, 'platform');
		}
		platforms.forEach(function(p){p.body.immovable=true});

		blue_doors = this.add.group();
		blue_doors.enableBody = true;
		var door;
		{
			door = blue_doors.create(700-200, 270, 'blue_door');
		}
		blue_doors.forEach(function(door) {
			door.animations.add('anim', [], 10, true);
			door.animations.play('anim');
		});

		var lum;

		white_lums = this.add.group();
		{
			lum = white_lums.create(0, 0, 'white_lumming');
			this.physics.arcade.enable(lum); //WARNING noter que cette ligne là doit se trouver avant les accès à "body.velocity"
			lum.body.velocity.x = 100;
		}
		white_lums.forEach(function(lum) {
			lum.animations.add('left', [4, 5, 6, 7], 10, true);
			lum.animations.add('right',  [8, 9, 10, 11], 10, true);
			lum.body.gravity.y = 1200;
			lum.body.bounce.x = 1;
		});

		blue_lums = this.add.group();
		//vide pour l'instant mais un lumming blanc peut devenir bleu
		
		blue_filters = this.add.group();
		blue_filters.enableBody = true;

		var filter;
		{
			filter = blue_filters.create(600-200, 270, 'blue_filter');
		}
		blue_filters.forEach(function(filter) {
			filter.animations.add('anim', [], 10, true);
			filter.animations.play('anim');
		});

		// this.startText = this.add.text(0, 0, 'cliquez pour commencer', { fontSize: '32px', fill: '#000' });
		// this.game.input.onDown.add(function () {if(this.game.paused) {this.game.paused = false;this.startText.text = '';music.play();}},this);
		// this.game.paused = true;
	 //    music = this.add.audio('level2');
		// music.loop = true;

		var cliquez = this.add.sprite(60, 500, 'cliquez');
		this.game.input.onDown.add(function () {if(this.game.paused) {this.game.paused = false;music.play();cliquez.destroy();}},this);
		this.game.paused = true;
		music = this.add.audio('level2');
		music.loop = true;
	},
	
	update: function () {
		this.physics.arcade.collide(blue_lums, blue_doors, mayExit, null, this);
		this.physics.arcade.overlap(white_lums, blue_filters, toBlue, null, this);
		this.physics.arcade.collide(white_lums, platforms);
		this.physics.arcade.collide(blue_lums, platforms);

		white_lums.forEach(lumAnim);
		blue_lums.forEach(lumAnim);
	}
};

function lumAnim(lum) {
	if (lum.body.velocity.x > 0) {
		lum.animations.play('right');
	} else if (lum.body.velocity.x < 0) {
		lum.animations.play('left');
	} else {
		lum.animations.stop();
	}
}

function toBlue(lum, filter) {
	var newlum = blue_lums.create(lum.body.position.x, lum.body.position.y, 'blue_lumming');
	this.physics.arcade.enable(newlum); //WARNING noter que cette ligne là doit se trouver avant les accès à "body.velocity"
	newlum.body.velocity.x = lum.body.velocity.x;
	newlum.body.velocity.y = lum.body.velocity.y;
	newlum.animations.add('left', [4, 5, 6, 7], 10, true);
	newlum.animations.add('right',  [8, 9, 10, 11], 10, true);
	newlum.body.bounce.x = 1;
	lum.kill();
}
