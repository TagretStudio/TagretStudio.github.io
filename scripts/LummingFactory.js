define(['VisionEnum'], function(VisionEnum) {

	var Lumming = function(game, spriteName, x, y, vitesseX, vision) {

		this.defaultVision = vision;
		Phaser.Sprite.call(this, game, x, y, spriteName, [1]);
		this.spriteName = spriteName;
		game.physics.arcade.enable(this);
		this.body.setSize(32, 32);

		this.body.collideWorldBounds = true;
		this.body.gravity.y = 300;

		this.body.velocity.x = vitesseX;
		if (vision == VisionEnum.getVisionEnum().INFRA) {
			this.animSpeed = 6;
		} else if (vision == VisionEnum.getVisionEnum().VISIBLE) {
			this.animSpeed = 10;
		} else {
			this.animSpeed = 14;
		}
		this.animations.add('left', [4, 5, 6, 7], this.animSpeed, true);
		this.animations.add('right',  [8, 9, 10, 11], this.animSpeed, true);
		this.animations.add('left_invisible', [20, 21, 22, 23], this.animSpeed, true);
		this.animations.add('right_invisible', [24, 25, 26, 27], this.animSpeed, true);
		this.body.bounce.x = 1;
		this.frame = 0;
	}

	Lumming.prototype = Object.create(Phaser.Sprite.prototype);
	Lumming.prototype.constructor = Lumming;

	Lumming.prototype.getDefautVision = function(){
		return this.defaultVision;
	}


	Lumming.prototype.update = function() {
		if (this.color == null) { //vaut null si on est en train de sortir d'une porte ou si on est en train de mourir
			this.alpha -= 0.01;
			if (this.alpha <= 0) {
				this.kill();
			}
		} else {
			if (VisionEnum.getVisionCurrent() == this.defaultVision) {
				if (this.body.velocity.x > 0) {
					this.animations.play('right');
				} else if (this.body.velocity.x < 0) {
					this.animations.play('left');
				}
			} else {
				if (this.body.velocity.x > 0) {
					this.animations.play('right_invisible');
				} else if (this.body.velocity.x < 0) {
					this.animations.play('left_invisible');
				}
			}
			if (this.position.y > _game.world.height - 96) {
				this.body.velocity.x = 0;
				this.body.velocity.y = -100;
				this.body.gravity.y = -100;
				this.animations.play('kill');
				this.color = null;
				//this.kill();
			}
		}
	}

	Lumming.prototype.collideWithDoor = function(door){

			return 0;
	}

    Lumming.prototype.collideWithFilter = function(filter) {
    }

	Lumming.prototype.updateColor = function(spriteName) {
		this.loadTexture(spriteName);
	}

	Lumming.prototype.collide = function(game, objet) {
		game.physics.arcade.collide(this, objet);
	}

	Lumming.prototype.collideWithMiroir = function(game, objet) {
		if (this.key != 'lumming_gamma'){
			this.body.bounce.y = 1.5;
			game.physics.arcade.collide(this, objet);
			this.body.bounce.y = 0;
		}

	}


	return{
		init : function(game) {
			_game = game;
		}
		,
		create : function(spriteName, x, y, vitesseX, vision) {
			return (new Lumming(_game, spriteName, x, y, vitesseX, vision));
		},

		Lumming : Lumming

	}
})
