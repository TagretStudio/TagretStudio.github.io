BasicGame.Level3 = function (game) {
	this.nextState = 'Boot';
	this.platforms = null;
	this.lums = null;
	this.doors = null;

	/*
	this.tilemapHeight = 6;
	this.tilemapWidth = 5;

	this.tilemapMap = [
		'not', 'not', 'not', 'not', 'not',
		'not', 'not', 'pla', 'pla', 'not',
		'pla', 'pla', 'pla', 'pl0', 'pla',
		'pl0', 'pl0', 'pl0', 'pl0', 'pl0',
		'pl0', 'pl0', 'not', 'pl0', 'not',
		'not', 'not', 'not', 'not', 'not'
	];
	*/
	this.tilemapHeight = 5;
	this.tilemapWidth = 7;
	this.tilemapMap = [
		'not', 'not', 'not', 'not', 'pl0', 'not', 'not',
		'pla', 'not', 'not', 'pla', 'pl0', 'not', 'not',
		'pl0', 'pla', 'pla', 'pla', 'pl0', 'not', 'pla',
		'pla', 'not', 'pl0', 'pla', 'pla', 'pla', 'pl0',
		'pl0', 'pla', 'pla', 'pla', 'pla', 'pla', 'pla'
	];
};

BasicGame.Level3.prototype = {

	preload: function () {
		this.load.image('sky', 'src/media/img/sky.png');
		this.load.image('platform', 'src/media/img/platform.png');
		this.load.spritesheet('door', 'src/media/img/door_red.png', 32, 32);
		// this.load.spritesheet('lumming', 'src/media/img/lumming_magenta.png', 32, 32);
		this.load.spritesheet('lumming', 'src/media/img/gamma.png', 32, 32);
		this.load.spritesheet('tiles', 'src/media/img/tiles3.png', 32, 32);

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
		var i=0;
		for (var y=0; y<this.tilemapHeight; y++) {
			for (var x=0; x<this.tilemapWidth; x++) {
				var tmo = this.tilemapMap[i];
				if (tmo != 'not') {
					if (tmo == 'pla' || tmo == 'pl0') {
						var tmd, tml, tmr, tmu;
						var sprite = platforms.create(x*64, y*64, 'tiles');
						var l;
						if (tmo == 'pla') {
							l=0;
						} else {
							sprite.body.checkCollision.up = false;
							l=8;
						}
						tmd = this.tilemapMap[i+(Math.min(y+1,this.tilemapHeight-1)-y)*this.tilemapWidth];
						if (tmd == 'pla' || tmd == 'pl0') {
							l+=1;
						}
						tmr = this.tilemapMap[i+(Math.min(x+1,this.tilemapWidth-1)-x)];
						if (tmr == 'pla' || tmr == 'pl0') {
							l+=4;
							sprite.body.checkCollision.right = false;
						}
						tml = this.tilemapMap[i+(Math.max(x-1,0)-x)];
						if (tml == 'pla' || tml == 'pl0') {
							l+=2;
							sprite.body.checkCollision.left = false;
						}
						sprite.frame = l;

						if (tmd == 'pla' && y<this.tilemapHeight-1) {
							sprite.body.checkCollision.left = false;
							sprite.body.checkCollision.right = false;
						}

						sprite.scale.set(2,2);
					}
				}
				i++;
			}
		}
		platforms.forEach(function(p){p.body.immovable=true});

		doors = this.add.group();
		doors.enableBody = true;
		var door;
		{
			door = doors.create(600-200, 220, 'door');
		}
		doors.forEach(function(door) {
			door.animations.add('anim', [], 10, true);
			door.animations.play('anim');
		});

		lums = this.add.group();
		var lum;
		{
			lum = lums.create(0, 0, 'lumming');
			this.physics.arcade.enable(lum); //WARNING noter que cette ligne là doit se trouver avant les accès à "body.velocity"
			lum.body.velocity.x = 100;
		}
		lums.forEach(function(lum) {
			lum.animations.add('left', [4, 5, 6, 7], 10, true);
			lum.animations.add('right',  [8, 9, 10, 11], 10, true);
			lum.body.gravity.y = 1200;
			lum.body.bounce.x = 1;
		});

		this.startText = this.add.text(0, 0, 'cliquez pour commencer', { fontSize: '32px', fill: '#000' });
		this.game.input.onDown.add(function () {if(this.game.paused) {this.game.paused = false;this.startText.text = '';}},this);
		this.game.paused = true;
	},

	update: function () {
		this.physics.arcade.collide(lums, doors, mayExit, null, this);
		this.physics.arcade.collide(lums, platforms);

		lums.forEach(
			function(lum) {
				if (lum.body.velocity.x > 0) {
					lum.animations.play('right');
				} else if (lum.body.velocity.x < 0) {
					lum.animations.play('left');
				} else {
					lum.animations.stop();
				}
			}
		);

	}

};
